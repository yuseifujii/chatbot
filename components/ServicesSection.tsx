"use client"

import { motion } from 'framer-motion'
import { Bot, Code, Palette, Brain, Shield, Zap } from 'lucide-react'

const services = [
  {
    icon: Bot,
    title: "カスタムチャットボット開発",
    description: "貴社の業務内容に完全対応したAIチャットボットを独自に開発いたします"
  },
  {
    icon: Code,
    title: "簡単スクリプト導入",
    description: "たった1行のコードをコピー&ペーストするだけで導入が完了します"
  },
  {
    icon: Brain,
    title: "チャット履歴の共有",
    description: "お客様とAIチャットボットのやり取りをすべて共有いたします"
  },
  {
    icon: Palette,
    title: "デザインカスタマイズ",
    description: "Webサイトのデザインに合わせてチャットボットの見た目を調整いたします"
  },
  {
    icon: Shield,
    title: "安全な運用",
    description: "SSL暗号化通信と安全なデータ管理で安心してご利用いただけます"
  },
  {
    icon: Zap,
    title: "最短2日で実装",
    description: "お申し込みを頂いてから2日~5日でカスタムAIチャットボットを開発いたします"
  }
]

const learningContents = [
  "営業時間・定休日情報",
  "商品・サービスカタログ",
  "よくある質問と回答",
  "予約・注文方法",
  "アクセス・駐車場情報",
  "キャンペーン・イベント情報",
  "会社概要・企業理念",
  "その他カスタム情報"
]

const designCatalog = [
  { name: "コーポレートブルー", color: "#2563eb", description: "信頼感のある企業向けカラー" },
  { name: "エレガントブラック", color: "#1f2937", description: "高級感のあるダークカラー" },
  { name: "フレンドリーオレンジ", color: "#f97316", description: "親しみやすい暖色系" },
  { name: "ナチュラルグリーン", color: "#059669", description: "自然・健康系ブランド向け" },
  { name: "ロイヤルパープル", color: "#7c3aed", description: "上品で洗練されたカラー" },
  { name: "エナジーレッド", color: "#dc2626", description: "情熱的で力強いカラー" }
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-3 md:px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full mb-3 md:mb-4">
            <Bot size={20} />
            <span className="font-medium">サービス内容</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            完全カスタマイズ可能な
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              AIチャットボット
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            貴社のニーズに完全対応したチャットボットを提供します
          </p>
        </motion.div>

        {/* メインサービス（行リスト型） */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-2 md:gap-y-3 mb-10 md:mb-16">
          {services.map((service, index) => (
            <div key={index} className="flex items-start gap-3 md:gap-4 py-2.5 md:py-3 border-b border-gray-200/70">
              <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-blue-600 text-white grid place-items-center">
                <service.icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-sm md:text-base font-semibold text-gray-900">{service.title}</p>
                <p className="text-[12px] md:text-sm text-gray-600 leading-snug md:leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 学習可能な内容 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-6 md:p-12 text-white mb-12 md:mb-16"
        >
          <h3 className="text-xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
            以下の内容を学習させた専用チャットボットを提供します
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {learningContents.map((content, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2.5 md:px-4 md:py-3 text-center"
              >
                <p className="font-medium">{content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* デザインカタログ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
            サイトデザインに合わせて選択可能
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {designCatalog.map((design, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer"
              >
                <div 
                  className="h-28 md:h-32 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                  style={{ backgroundColor: design.color }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 text-center">
                      <p className="text-[11px] md:text-xs font-bold text-gray-800 mb-1">{design.name}</p>
                      <p className="text-[9px] md:text-[10px] text-gray-600 leading-tight">{design.description}</p>
                      <p className="text-[8px] md:text-[9px] text-gray-500 font-mono mt-1">{design.color}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
