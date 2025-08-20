import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const invoiceId = searchParams.get('invoiceId');

    if (!invoiceId) {
      return NextResponse.json(
        { error: 'Invoice ID is required' },
        { status: 400 }
      );
    }

    // 請求書の情報を取得
    const invoice = await stripe.invoices.retrieve(invoiceId);

    return NextResponse.json({
      success: true,
      invoiceId: invoice.id,
      status: invoice.status,
      paid: invoice.paid,
      amount: invoice.amount_paid,
      currency: invoice.currency,
      invoiceNumber: invoice.number,
      paymentUrl: invoice.hosted_invoice_url,
    });

  } catch (error) {
    console.error('Payment check error:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
}
