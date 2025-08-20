"use client"

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function SetupPaymentContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [setupComplete, setSetupComplete] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState('');
  const [invoiceId, setInvoiceId] = useState('');

  useEffect(() => {
    const subId = searchParams.get('subscription_id');
    const invId = searchParams.get('invoice_id');
    
    if (subId && invId) {
      setSubscriptionId(subId);
      setInvoiceId(invId);
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>支払い方法設定を準備中...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">自動引き落とし設定のご案内</h1>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">2年目以降の自動引き落としについて</h2>
          <p className="text-gray-700 mb-4">
            初回請求書（¥48,000）のお支払い完了後、<br />
            2年目以降の年間利用料（¥19,000）は以下の方法で自動請求されます：
          </p>
          
          <div className="bg-white p-4 rounded border-l-4 border-blue-500 text-left">
            <h3 className="font-bold mb-2">📋 自動請求の流れ</h3>
            <ol className="text-sm space-y-1">
              <li>1. 毎年、正式な請求書をメールで送信</li>
              <li>2. 請求書に記載の支払い方法で決済</li>
              <li>3. 支払い完了後、領収書を自動発行</li>
            </ol>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-bold text-green-800 mb-2">✅ 現在の状況</h3>
          <p className="text-green-700">
            サブスクリプションの設定が完了しました。<br />
            初回請求書のお支払い後、自動請求が開始されます。
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => window.location.href = '/form'}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            申し込み手続きに戻る
          </button>
          
          <p className="text-sm text-gray-500">
            ご不明な点がございましたら、お気軽にお問い合わせください。
          </p>
        </div>
      </div>
    </main>
  );
}

export default function SetupPaymentPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <main className="container mx-auto px-4 py-24 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>読み込み中...</p>
        </main>
      }>
        <SetupPaymentContent />
      </Suspense>
      <Footer />
    </>
  );
}
