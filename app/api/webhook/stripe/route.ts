import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // 請求書の支払い完了イベント
    if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object as Stripe.Invoice;
      
      // 初回支払いの場合（setup_and_first_year）
      if (invoice.metadata?.service_type === 'setup_and_first_year') {
        const subscriptionId = invoice.metadata.subscription_id;
        
        if (subscriptionId) {
          // サブスクリプションを再開（来年から自動請求開始）
          await stripe.subscriptions.update(subscriptionId, {
            pause_collection: null, // 一時停止を解除
          });
          
          console.log(`Subscription ${subscriptionId} resumed after initial payment`);
        }
      }
    }

    // 支払い方法設定完了イベント
    if (event.type === 'setup_intent.succeeded') {
      const setupIntent = event.data.object as Stripe.SetupIntent;
      const subscriptionId = setupIntent.metadata?.subscription_id;
      
      if (subscriptionId && setupIntent.payment_method) {
        // サブスクリプションにデフォルト支払い方法を設定
        await stripe.subscriptions.update(subscriptionId, {
          default_payment_method: setupIntent.payment_method as string,
        });
        
        // 顧客にもデフォルト支払い方法を設定
        await stripe.customers.update(setupIntent.customer as string, {
          invoice_settings: {
            default_payment_method: setupIntent.payment_method as string,
          },
        });
        
        console.log(`Payment method set for subscription ${subscriptionId}`);
      }
    }

    // サブスクリプションの支払い失敗イベント
    if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`Payment failed for invoice ${invoice.id}`);
      
      // 必要に応じて顧客に通知メールを送信
      // await sendPaymentFailedNotification(invoice.customer);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
