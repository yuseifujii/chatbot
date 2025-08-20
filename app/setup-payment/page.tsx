"use client"

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

export default function SetupPaymentPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [stripe, setStripe] = useState<any>(null);
  const [elements, setElements] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState('');
  const [setupComplete, setSetupComplete] = useState(false);

  useEffect(() => {
    const subscriptionId = searchParams.get('subscription_id');
    const invoiceId = searchParams.get('invoice_id');
    
    if (subscriptionId && invoiceId) {
      fetchSetupIntent(subscriptionId, invoiceId);
    }
  }, [searchParams]);

  const fetchSetupIntent = async (subscriptionId: string, invoiceId: string) => {
    try {
      const response = await fetch('/api/setup-payment-method', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId, invoiceId }),
      });
      
      const data = await response.json();
      if (data.success) {
        setClientSecret(data.clientSecret);
      }
    } catch (error) {
      console.error('Setup intent fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStripeLoad = () => {
    if (window.Stripe) {
      const stripeInstance = window.Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      setStripe(stripeInstance);
      
      if (clientSecret) {
        const elementsInstance = stripeInstance.elements({
          clientSecret,
          appearance: { theme: 'stripe' }
        });
        setElements(elementsInstance);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/form?payment=success&setup=complete`,
      },
    });

    if (error) {
      console.error('Payment setup failed:', error);
    } else {
      setSetupComplete(true);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-24 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>支払い方法設定を準備中...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Script 
        src="https://js.stripe.com/v3/" 
        onLoad={handleStripeLoad}
      />
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">支払い方法の設定</h1>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-2">自動引き落とし設定</h2>
            <p className="text-gray-700 mb-4">
              初回請求書のお支払い完了後、2年目以降の年間利用料（¥19,000）が
              登録されたカードから自動的に引き落とされます。
            </p>
            <div className="bg-white p-4 rounded border-l-4 border-green-500">
              <p className="text-sm text-green-800">
                ✅ 毎年、正式な請求書と領収書を発行<br />
                ✅ 支払い忘れの心配なし<br />
                ✅ いつでもキャンセル可能
              </p>
            </div>
          </div>

          {!setupComplete ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">クレジットカード情報</h3>
                {elements && (
                  <div id="payment-element">
                    {/* Stripe Elements will be inserted here */}
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={!stripe || !elements}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                支払い方法を登録
              </button>
              
              <p className="text-sm text-gray-500 text-center">
                カード情報は暗号化されて安全に保存されます。<br />
                初回請求書のお支払いが完了するまで課金は発生しません。
              </p>
            </form>
          ) : (
            <div className="text-center">
              <div className="bg-green-50 p-8 rounded-lg">
                <div className="text-green-600 text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-green-800 mb-4">
                  支払い方法の設定が完了しました
                </h2>
                <p className="text-green-700">
                  初回請求書のお支払い完了後、自動引き落としが開始されます。
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
