"use client"

import { motion } from 'framer-motion'
import { Bot, Code, Palette, Brain, Shield, Zap } from 'lucide-react'

const services = [
  {
    icon: Bot,
    title: "カスタムチャットボット開発",
    description: "貴社の業務内容に完全対応したAIチャットボットを開発します"
  },
  {
    icon: Code,
    title: "簡単スクリプト導入",
    description: "たった1行のコードをコピー&ペーストするだけで導入完了"
  },
  {
    icon: Brain,
    title: "専門知識の学習",
    description: "商品情報、FAQ、営業時間など貴社独自の情報を学習させます"
  },
  {
    icon: Palette,
    title: "デザインカスタマイズ",
    description: "Webサイトのデザインに合わせてチャットボットの見た目を調整"
  },
  {
    icon: Shield,
    title: "セキュアな運用",
    description: "SSL暗号化通信と安全なデータ管理で安心してご利用いただけます"
  },
  {
    icon: Zap,
    title: "高速レスポンス",
    description: "最新のAI技術により、瞬時に適切な回答を生成します"
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
  { name: "モダンスタイル", color: "from-blue-500 to-purple-500" },
  { name: "ミニマルスタイル", color: "from-gray-400 to-gray-600" },
  { name: "ポップスタイル", color: "from-pink-400 to-orange-400" },
  { name: "エレガントスタイル", color: "from-purple-400 to-pink-400" },
  { name: "ビジネススタイル", color: "from-blue-600 to-blue-800" },
  { name: "ナチュラルスタイル", color: "from-green-400 to-teal-400" }
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

        {/* メインサービス */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-5 md:p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3 md:mb-4">
                <service.icon className="text-white" size={20} />
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1.5 md:mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-[13px] md:text-sm">
                {service.description}
              </p>
            </motion.div>
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
            以下の内容を学習させた専用チャットボットを提供
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
                <div className={`h-28 md:h-32 bg-gradient-to-br ${design.color} rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                      <p className="text-[11px] md:text-xs font-medium text-gray-800">{design.name}</p>
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
