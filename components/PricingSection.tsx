"use client"
import { Check, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'

declare global {
  interface Window {
    openChatbot: () => void;
  }
}

const pricingPlans = [
  {
    title: "導入初期費用",
    price: "29,000",
    unit: "円",
    campaignPrice: "0",
    description: "カスタムChatBOT開発費用",
    features: [
      "カスタムAIチャットボット開発",
      "貴社専用のデータ学習・設定",
      "デザインカスタマイズ",
      "最短2日で開発完了"
    ],
    isOneTime: true,
    isCampaign: true,
    color: "from-blue-600 to-blue-700"
  },
  {
    title: "サービス維持費",
    price: "19,000",
    unit: "円/年",
    description: "年額利用料",
    features: [
      "24時間365日稼働",
      "定期的なAI性能アップデート",
      "チャット履歴データの共有",
      "安全なデータ管理"
    ],
    isPopular: false,
    color: "from-blue-600 to-blue-700"
  },
  {
    title: "導入サポート/追加変更",
    price: "無料",
    unit: "",
    description: "オプションサービス",
    features: [
      "1行のコードで導入可能",
      "導入サポート(Zoom等にてサポート)",
      "チャットボットの知識内容の追加変更",
      "チャットボットのデザインの変更"
    ],
    isOptional: true,
    color: "from-green-600 to-green-700"
  }
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-3 md:px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-3 py-1.5 rounded-full mb-3 md:mb-4">
            <TrendingUp size={20} />
            <span className="font-medium">料金プラン</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            シンプルで
            <span className="text-green-600">明確な料金体系</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            初期費用と月額費用のみ。隠れた費用は一切ありません
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                plan.isPopular ? 'ring-2 ring-blue-600 md:transform md:scale-105' : ''
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-lg text-sm font-semibold">
                  <Star size={14} className="inline mr-1" />
                  人気プラン
                </div>
              )}
              
              <div className={`bg-gradient-to-r ${plan.color} p-5 md:p-6 text-white`}>
                <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">{plan.title}</h3>
                <p className="text-xs md:text-sm opacity-90 mb-3 md:mb-4">{plan.description}</p>
                <div className="flex items-baseline">
                  {plan.isCampaign ? (
                    <div className="flex flex-col">
                      <div className="flex items-baseline mb-1">
                        <span className="text-lg md:text-xl line-through opacity-60">{plan.price}</span>
                        <span className="ml-1 text-sm opacity-60 line-through">{plan.unit}</span>
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-4xl md:text-5xl font-bold text-yellow-300">{plan.campaignPrice}</span>
                        <span className="ml-2 text-xl md:text-2xl font-bold text-yellow-300">{plan.unit}</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="text-3xl md:text-4xl font-bold">{plan.price}</span>
                      <span className="ml-2 text-base md:text-lg opacity-90">{plan.unit}</span>
                    </>
                  )}
                </div>
                {plan.isOneTime && (
                  <p className="text-xs md:text-sm mt-2 opacity-90">※ 一度だけのお支払い</p>
                )}
                {plan.isCampaign && (
                  <div className="mt-3 bg-red-500 bg-opacity-20 rounded-lg p-2">
                    <p className="text-xs md:text-sm font-bold text-yellow-300">🎉 今だけキャンペーン中！</p>
                    <p className="text-xs opacity-90">開発費が無料になります</p>
                  </div>
                )}
                {plan.isOptional && (
                  <p className="text-xs md:text-sm mt-2 opacity-90">※ 必要に応じて選択</p>
                )}
              </div>

              <div className="p-5 md:p-6">
                <ul className="space-y-2.5 md:space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-700 text-[13px] md:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* 合計料金の説明 */}
        <div className="mt-10 md:mt-12 max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 md:p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                初年度のお支払い例
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>導入初期費用</span>
                  <div className="flex items-center">
                    <span className="line-through opacity-60 mr-2">¥29,000</span>
                    <span className="font-bold text-yellow-300 text-lg">¥0</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>サービス維持費</span>
                  <span>¥19,000</span>
                </div>
                <div className="flex justify-between">
                  <span>導入サポート/追加変更</span>
                  <span>無料</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-base md:text-lg">
                    <span>合計</span>
                    <div className="flex items-center">
                      <span className="line-through opacity-60 mr-2">¥48,000</span>
                      <span className="text-yellow-300 text-xl">¥19,000</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 bg-yellow-500 bg-opacity-20 rounded-lg p-3">
                  <p className="text-sm font-bold text-yellow-300">🎉 キャンペーン適用で¥29,000お得！</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                2年目以降
              </h3>
              <p className="text-2xl md:text-3xl font-bold mb-2">
                年額 ¥19,000 のみ
              </p>
              <p className="text-sm opacity-90">
                ※ 追加費用は一切かかりません
              </p>
              <Link href="/form" passHref>
                <button className="mt-4 bg-white text-blue-600 px-5 py-2.5 md:px-6 md:py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  お申し込みはこちら
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
