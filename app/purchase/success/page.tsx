import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function PurchaseSuccessPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">ご購入ありがとうございました</h1>
        <p className="text-gray-700 mb-8">
          お支払いが正常に完了しました。確認用のメールが届きますのでご確認ください。
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors">
            ホームへ戻る
          </Link>
          <Link href="/form" className="border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-50 transition-colors">
            申し込みフォームへ
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}


