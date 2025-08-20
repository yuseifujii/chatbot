"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function PurchaseSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // 3秒後に自動的にフォームページに遷移
    const timer = setTimeout(() => {
      router.push('/form?payment=success')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-50 p-8 rounded-lg mb-8">
            <div className="text-green-600 text-6xl mb-4">✅</div>
            <h1 className="text-4xl font-bold mb-4 text-green-800">ご購入ありがとうございました</h1>
            <p className="text-green-700 mb-6">
              お支払いが正常に完了しました。<br />
              確認用のメールが届きますのでご確認ください。
            </p>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-2 text-blue-800">次のステップ</h2>
            <p className="text-blue-700 mb-4">
              3秒後に自動的に情報入力フォームに移動します。
            </p>
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm">移動中...</span>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/" className="bg-gray-600 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition-colors">
              ホームへ戻る
            </Link>
            <Link href="/form?payment=success" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors">
              今すぐ情報入力へ
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}


