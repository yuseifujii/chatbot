"use client"

import { motion } from 'framer-motion'
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
    description: "カスタムChatBOT開発費用",
    features: [
      "貴社専用AIチャットボット開発",
      "初期データ学習・設定",
      "デザインカスタマイズ",
      "動作テスト・調整",
      "導入後1ヶ月サポート"
    ],
    isOneTime: true,
    color: "from-purple-600 to-purple-700"
  },
  {
    title: "サービス維持費",
    price: "3,900",
    unit: "円/月",
    description: "月額利用料",
    features: [
      "24時間365日稼働",
      "月間10,000メッセージまで",
      "定期的なAI性能アップデート",
      "データバックアップ",
      "技術サポート"
    ],
    isPopular: true,
    color: "from-blue-600 to-blue-700"
  },
  {
    title: "導入サポート",
    price: "2,900",
    unit: "円",
    description: "オプションサービス",
    features: [
      "設置作業代行",
      "スタッフ向け使い方講習",
      "カスタマイズ相談",
      "FAQ作成支援",
      "初期設定最適化"
    ],
    isOptional: true,
    color: "from-green-600 to-green-700"
  }
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full mb-4">
            <TrendingUp size={20} />
            <span className="font-medium">料金プラン</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            シンプルで
            <span className="text-green-600">明確な料金体系</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            初期費用と月額費用のみ。隠れた費用は一切ありません
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                plan.isPopular ? 'ring-2 ring-blue-600 transform scale-105' : ''
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-lg text-sm font-semibold">
                  <Star size={14} className="inline mr-1" />
                  人気プラン
                </div>
              )}
              
              <div className={`bg-gradient-to-r ${plan.color} p-6 text-white`}>
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <p className="text-sm opacity-90 mb-4">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">¥{plan.price}</span>
                  <span className="ml-2 text-lg opacity-90">{plan.unit}</span>
                </div>
                {plan.isOneTime && (
                  <p className="text-sm mt-2 opacity-90">※ 一度だけのお支払い</p>
                )}
                {plan.isOptional && (
                  <p className="text-sm mt-2 opacity-90">※ 必要に応じて選択</p>
                )}
              </div>

              <div className="p-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={20} />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 合計料金の説明 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                初月のお支払い例
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>導入初期費用</span>
                  <span>¥29,000</span>
                </div>
                <div className="flex justify-between">
                  <span>サービス維持費（初月）</span>
                  <span>¥3,900</span>
                </div>
                <div className="flex justify-between">
                  <span>導入サポート（オプション）</span>
                  <span>¥2,900</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>合計</span>
                    <span>¥35,800</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">
                2ヶ月目以降
              </h3>
              <p className="text-3xl font-bold mb-2">
                月額 ¥3,900 のみ
              </p>
              <p className="text-sm opacity-90">
                ※ 追加費用は一切かかりません
              </p>
              <Link href="/form" passHref>
                <button className="mt-4 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  お見積もりを依頼
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
