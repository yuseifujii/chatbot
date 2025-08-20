import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { subscriptionId, invoiceId } = await request.json();

    // サブスクリプション情報を取得
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    // SetupIntentを作成（将来の支払いのためのカード情報保存）
    const setupIntent = await stripe.setupIntents.create({
      customer: subscription.customer as string,
      payment_method_types: ['card'],
      usage: 'off_session', // 顧客がいない時の自動支払い用
      metadata: {
        subscription_id: subscriptionId,
        invoice_id: invoiceId,
      },
    });

    return NextResponse.json({
      success: true,
      clientSecret: setupIntent.client_secret,
      setupIntentId: setupIntent.id,
    });

  } catch (error) {
    console.error('Setup payment method error:', error);
    return NextResponse.json(
      { error: 'Failed to setup payment method' },
      { status: 500 }
    );
  }
}
