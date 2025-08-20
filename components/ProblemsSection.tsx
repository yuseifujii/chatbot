"use client"

import { motion } from 'framer-motion'
import { Clock, UserX, ClipboardList, AlertCircle } from 'lucide-react'

const problems = [
  {
    icon: Clock,
    title: "営業時間外の問い合わせ",
    description: "夜間や休日の問い合わせに対応できず、機会損失が発生していませんか？",
    color: "from-red-500 to-red-600"
  },
  {
    icon: UserX,
    title: "スタッフ不足でFAQ対応が大変",
    description: "同じような質問に何度も答えるのに時間を取られていませんか？",
    color: "from-red-400 to-red-500"
  },
  {
    icon: ClipboardList,
    title: "メニュー案内の手間",
    description: "商品やサービスの説明を手作業で繰り返し対応するのは非効率的です",
    color: "from-red-600 to-red-700"
  }
]

export default function ProblemsSection() {
  return (
    <section id="problems" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-3 md:px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1.5 rounded-full mb-3 md:mb-4">
            <AlertCircle size={20} />
            <span className="font-medium">こんなお悩みありませんか？</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            お客様対応の
            <span className="text-red-500">課題</span>
            を解決
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            多くの企業が抱える顧客対応の問題を、AIチャットボットが解決します
          </p>
        </motion.div>

        {/* 改良されたレイアウト：アイコン+見出し横並び、説明文は下 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="py-4 md:py-5"
            >
              {/* アイコンと見出しを横並び */}
              <div className="flex items-center gap-3 md:gap-4 mb-3">
                <div className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-r ${problem.color} text-white grid place-items-center`}>
                  <problem.icon size={22} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  {problem.title}
                </h3>
              </div>
              {/* 説明文は全体の下に配置 */}
              <p className="text-sm md:text-base text-gray-600 leading-relaxed pl-0">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 md:mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 md:p-8 text-white text-center"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
            これらの課題を全て解決！
          </h3>
          <p className="text-base md:text-lg mb-5 md:mb-6">
            AIチャットボットなら24時間365日、即座に正確な対応が可能です
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
            className="bg-white text-blue-600 px-6 py-2.5 md:px-8 md:py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            解決策を見る →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
