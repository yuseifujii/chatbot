"use client"

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { calculateFirstYearTotal, getAnnualFee } from '@/lib/pricing-config';

export default function FormPage() {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const firstYearTotal = calculateFirstYearTotal();
  const annualFee = getAnnualFee();

  // URLパラメータをチェックして決済完了状態を判定
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
      setPaymentCompleted(true);
    }
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-8">お申し込み手続き</h1>
        
        {/* ステップインジケーター */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${paymentCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-blue-600 border-blue-600 text-white'}`}>
              {paymentCompleted ? '✓' : '1'}
            </div>
            <span className={`font-semibold ${paymentCompleted ? 'text-green-600' : 'text-blue-600'}`}>
              お支払い {paymentCompleted && '✅'}
            </span>
            <div className={`w-16 h-0.5 ${paymentCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${paymentCompleted ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-300 border-gray-300 text-gray-500'}`}>
              2
            </div>
            <span className={`font-semibold ${paymentCompleted ? 'text-blue-600' : 'text-gray-500'}`}>
              情報入力
            </span>
          </div>
        </div>

        {!paymentCompleted ? (
          /* お支払いセクション */
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">お支払い</h2>
            <p className="text-gray-600 mb-8">
              まず最初にお支払い手続きを完了してください。<br />
              お支払い完了後、情報入力フォームが表示されます。
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold mb-2">料金プラン</h3>
              <p className="text-2xl font-bold text-blue-600 mb-2">初年度 ¥{firstYearTotal.total.toLocaleString()}</p>
              <p className="text-sm text-gray-600">※ 2年目以降は年額 ¥{annualFee.toLocaleString()}</p>
            </div>

            <Script src="https://js.stripe.com/v3/buy-button.js" strategy="afterInteractive" async />
            <div className="flex justify-center mb-4">
              <stripe-buy-button
                  buy-button-id="buy_btn_1RyBSrRocVI9NL8DlTBOzOSY"
                  publishable-key="pk_live_51R0zVYRocVI9NL8Dbta57vcirBPCRQgmFQoEYcUzB5FmpvbGpGZAsjRfK9gJQer9huuimOyzouuOIoSRv6HI67bS00G0ZMs2QK"
                ></stripe-buy-button>
            </div>
            <p className="text-sm text-gray-500">
              お支払い完了後、自動的に次のステップに進みます。
            </p>
          </div>
        ) : (
          /* 情報入力セクション */
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">情報入力</h2>
              <div className="bg-green-50 p-4 rounded-lg inline-block mb-4">
                <p className="text-green-700 font-semibold">
                  ✅ お支払いが完了しました！
                </p>
                <p className="text-sm text-green-600">
                  続いて、サービス利用に必要な情報をご入力ください。
                </p>
              </div>
            </div>
            
            <div>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSeK6IjTYXoYdUfRbpAmDxg-rgJxCEbpLySTAnsTqXXH_At5TA/viewform?usp=sharing&ouid=106111889620545617242"
                width="100%"
                height="1200"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
              >
                読み込んでいます…
              </iframe>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
