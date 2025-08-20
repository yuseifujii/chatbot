"use client"

import { useState } from 'react'
import Script from 'next/script'

export default function StripeBuyButtonSection() {
  const [isConfirmed, setIsConfirmed] = useState(false)

  return (
    <div className="mt-16 max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">フォーム送信後のお支払い</h2>
      <p className="text-gray-600 mb-6">
        まず上のフォームを送信してください。送信完了後、下のチェックを入れてお支払いに進みます。
      </p>

      <div className="flex items-center justify-center gap-3 mb-6">
        <input
          id="confirm-submitted"
          type="checkbox"
          className="h-5 w-5"
          checked={isConfirmed}
          onChange={(e) => setIsConfirmed(e.target.checked)}
        />
        <label htmlFor="confirm-submitted" className="text-gray-700">
          フォームの送信が完了しました
        </label>
      </div>

      {isConfirmed ? (
        <>
          <Script src="https://js.stripe.com/v3/buy-button.js" strategy="afterInteractive" async />
          <div className="flex justify-center">
            <stripe-buy-button
              buy-button-id="buy_btn_1Ry59RRocVI9NL8DGprwBRVd"
              publishable-key="pk_live_51R0zVYRocVI9NL8Dbta57vcirBPCRQgmFQoEYcUzB5FmpvbGpGZAsjRfK9gJQer9huuimOyzouuOIoSRv6HI67bS00G0ZMs2QK"
            ></stripe-buy-button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            お支払い完了後は購入完了ページに遷移します。
          </p>
        </>
      ) : (
        <p className="text-gray-500">チェックを入れると購入ボタンが表示されます。</p>
      )}
    </div>
  )
}


