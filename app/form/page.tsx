"use client"

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FormPage() {
  const [step, setStep] = useState(1); // 1: 顧客情報, 2: 請求書生成, 3: 支払い待ち, 4: 完了・サービス情報入力
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [formData, setFormData] = useState({
    customerEmail: '',
    customerName: '',
    companyName: '',
    address: '',
    phone: '',
    taxId: '',
  });

  // URLパラメータをチェックして決済完了状態を判定
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const invoiceId = urlParams.get('invoice_id');
    if (invoiceId) {
      checkPaymentStatus(invoiceId);
    }
  }, []);

  const checkPaymentStatus = async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/check-payment?invoiceId=${invoiceId}`);
      const data = await response.json();
      
      if (data.success && data.paid) {
        setStep(4);
        setInvoiceData(data);
      } else {
        setStep(3);
        setInvoiceData(data);
      }
    } catch (error) {
      console.error('Payment status check failed:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setInvoiceData(data);
        setStep(3);
        // 請求書URLを新しいタブで開く
        window.open(data.invoiceUrl, '_blank');
      } else {
        alert('請求書の作成に失敗しました: ' + data.error);
      }
    } catch (error) {
      console.error('Invoice creation failed:', error);
      alert('請求書の作成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-8">お申し込み手続き</h1>
        
        {/* ステップインジケーター */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 text-sm md:text-base ${
              step >= 2 ? 'bg-green-500 border-green-500 text-white' : 
              step === 1 ? 'bg-blue-600 border-blue-600 text-white' : 
              'bg-gray-300 border-gray-300 text-gray-500'
            }`}>
              {step >= 2 ? '✓' : '1'}
            </div>
            <span className={`font-semibold text-sm md:text-base ${
              step >= 2 ? 'text-green-600' : 
              step === 1 ? 'text-blue-600' : 
              'text-gray-500'
            }`}>
              請求書発行
            </span>
            <div className={`w-8 md:w-16 h-0.5 ${step >= 3 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 text-sm md:text-base ${
              step >= 4 ? 'bg-green-500 border-green-500 text-white' : 
              step === 3 ? 'bg-blue-600 border-blue-600 text-white' : 
              'bg-gray-300 border-gray-300 text-gray-500'
            }`}>
              {step >= 4 ? '✓' : '2'}
            </div>
            <span className={`font-semibold text-sm md:text-base ${
              step >= 4 ? 'text-green-600' : 
              step === 3 ? 'text-blue-600' : 
              'text-gray-500'
            }`}>
              お支払い
            </span>
            <div className={`w-8 md:w-16 h-0.5 ${step >= 4 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 text-sm md:text-base ${
              step === 4 ? 'bg-blue-600 border-blue-600 text-white' : 
              'bg-gray-300 border-gray-300 text-gray-500'
            }`}>
              3
            </div>
            <span className={`font-semibold text-sm md:text-base ${
              step === 4 ? 'text-blue-600' : 'text-gray-500'
            }`}>
              サービス設定
            </span>
          </div>
        </div>

        {/* Step 1: 顧客情報入力 */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">①企業情報のご入力</h2>
            <p className="text-gray-600 text-center mb-8">
              請求書発行のために必要な企業情報をご入力ください。<br />
              入力後、正式な請求書をメールでお送りいたします。
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold mb-2">料金プラン</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>導入費用（初回のみ）</span>
                  <span className="font-bold">¥29,000</span>
                </div>
                <div className="flex justify-between">
                  <span>年間利用料（初年度）</span>
                  <span className="font-bold">¥19,000</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">初回お支払い合計（税込）</span>
                  <span className="text-2xl font-bold text-blue-600">¥48,000</span>
                </div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-md">
                <p className="text-sm text-yellow-800">
                  <strong>📅 サブスクリプション:</strong><br />
                  2年目以降は年額 ¥19,000 が毎年自動請求されます
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-6">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  会社名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                  担当者名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  required
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  required
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  電話番号 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  住所 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="例：東京都渋谷区..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-2">
                  法人番号（任意）
                </label>
                <input
                  type="text"
                  id="taxId"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  placeholder="13桁の法人番号"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? '請求書を作成中...' : '請求書を発行する'}
              </button>
            </form>
          </div>
        )}

        {/* Step 3: 支払い待ち */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">②お支払いをお待ちしております</h2>
            <div className="bg-yellow-50 p-6 rounded-lg mb-8">
              <div className="text-yellow-600 text-4xl mb-4">📧</div>
              <p className="text-yellow-800 font-semibold mb-2">
                請求書をメールでお送りしました
              </p>
              <p className="text-yellow-700 text-sm mb-4">
                請求書番号: {invoiceData?.invoiceNumber}<br />
                お支払い期限: 30日以内
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => window.open(invoiceData?.paymentUrl, '_blank')}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                請求書を確認・お支払い
              </button>
              
              <button
                onClick={() => checkPaymentStatus(invoiceData?.invoiceId)}
                className="w-full border border-blue-600 text-blue-600 py-3 px-6 rounded-md font-semibold hover:bg-blue-50 transition-colors"
              >
                支払い状況を確認
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-6">
              お支払い完了後、自動的に次のステップに進みます。
            </p>
          </div>
        )}

        {/* Step 4: 支払い完了・サービス設定 */}
        {step === 4 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">③サービス設定情報のご入力</h2>
              <div className="bg-green-50 p-6 rounded-lg inline-block mb-4">
                <div className="text-green-600 text-4xl mb-2">✅</div>
                <p className="text-green-700 font-semibold mb-1">
                  お支払いが完了しました！
                </p>
                <p className="text-sm text-green-600">
                  請求書番号: {invoiceData?.invoiceNumber}<br />
                  続いて、チャットボットの設定に必要な情報をご入力ください。
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

