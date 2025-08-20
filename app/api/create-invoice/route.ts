import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Stripe初期化
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    const {
      customerEmail,
      customerName,
      companyName,
      address,
      phone,
      taxId,
    } = await request.json();

    // 顧客を作成または検索
    let customer;
    try {
      const existingCustomers = await stripe.customers.list({
        email: customerEmail,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: customerEmail,
          name: `${companyName} (${customerName})`, // 会社名と担当者名
          address: {
            line1: address,
            country: 'JP',
          },
          phone: phone,
          shipping: {
            name: `${companyName} (${customerName})`,
            address: {
              line1: address,
              country: 'JP',
            },
          },
          metadata: {
            company_name: companyName,
            contact_person: customerName,
            tax_id: taxId || '',
          },
        });
      }
    } catch (error) {
      console.error('Customer creation error:', error);
      return NextResponse.json(
        { error: 'Failed to create customer' },
        { status: 500 }
      );
    }

    // 初回導入費用の請求書アイテムを作成
    const setupInvoiceItem = await stripe.invoiceItems.create({
      customer: customer.id,
      amount: 29000, // ¥29,000 (JPYは円単位)
      currency: 'jpy',
      description: 'チャットボット導入サービス（初回のみ）',
      metadata: {
        service_type: 'setup_fee',
        billing_period: 'one_time',
      },
    });

    // 年間サブスクリプション用の商品を作成
    const subscriptionProduct = await stripe.products.create({
      name: 'チャットボット年間利用料',
      description: '年間サブスクリプション',
    });

    // 年間サブスクリプション用の価格を作成
    const subscriptionPrice = await stripe.prices.create({
      unit_amount: 19000, // ¥19,000 (JPYは円単位)
      currency: 'jpy',
      product: subscriptionProduct.id,
      recurring: {
        interval: 'year',
      },
    });

    // 年間サブスクリプションを作成（自動引き落とし対応）
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: subscriptionPrice.id,
        },
      ],
      collection_method: 'charge_automatically', // 自動引き落とし
      payment_behavior: 'default_incomplete', // 初回は手動、2回目以降は自動
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        service_type: 'annual_subscription',
        company_name: companyName,
      },
    });

    // 初回費用の請求書を作成
    const setupInvoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: 'send_invoice',
      days_until_due: 30, // 30日後が支払期限
      auto_advance: false,
      custom_fields: [
        {
          name: '会社名',
          value: companyName,
        },
        {
          name: '担当者名',
          value: customerName,
        },
        {
          name: '電話番号',
          value: phone,
        },
      ],
      metadata: {
        service_type: 'setup_and_first_year',
        company_name: companyName,
        contact_person: customerName,
        subscription_id: subscription.id,
      },
      footer: `請求書に関するご質問は、お気軽にお問い合わせください。\n\n【サービス内容】\nチャットボット導入サービス\n初年度: ¥29,000 + ¥19,000 = ¥48,000\n2年目以降: ¥19,000/年（自動請求）`,
    });

    // サブスクリプションの初回請求書アイテムを追加
    await stripe.invoiceItems.create({
      customer: customer.id,
      invoice: setupInvoice.id,
      amount: 19000, // ¥19,000 (JPYは円単位)
      currency: 'jpy',
      description: 'チャットボット年間利用料（初年度）',
      metadata: {
        service_type: 'first_year_subscription',
        subscription_id: subscription.id,
      },
    });

    // 請求書を確定
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(setupInvoice.id!);

    // 請求書を送信
    await stripe.invoices.sendInvoice(finalizedInvoice.id!);

    // サブスクリプションを一時停止（初回支払い完了後に再開）
    await stripe.subscriptions.update(subscription.id, {
      pause_collection: {
        behavior: 'void',
      },
    });

    return NextResponse.json({
      success: true,
      invoiceId: finalizedInvoice.id,
      invoiceUrl: finalizedInvoice.hosted_invoice_url,
      customerId: customer.id,
      subscriptionId: subscription.id,
      invoiceNumber: finalizedInvoice.number,
      totalAmount: 48000, // ¥29,000 + ¥19,000 = ¥48,000
    });

  } catch (error) {
    console.error('Invoice creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create invoice', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
