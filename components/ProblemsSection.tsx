"use client"

import { motion } from 'framer-motion'
import { Clock, UserX, ClipboardList, AlertCircle } from 'lucide-react'

const problems = [
  {
    icon: Clock,
    title: "営業時間外の問い合わせ",
    description: "夜間や休日の問い合わせに対応できず、機会損失が発生していませんか？",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: UserX,
    title: "スタッフ不足でFAQ対応が大変",
    description: "同じような質問に何度も答えるのに時間を取られていませんか？",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: ClipboardList,
    title: "メニュー案内の手間",
    description: "商品やサービスの説明を手作業で繰り返し対応するのは非効率的です",
    color: "from-green-500 to-teal-500"
  }
]

export default function ProblemsSection() {
  return (
    <section id="problems" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-4">
            <AlertCircle size={20} />
            <span className="font-medium">こんなお悩みありませんか？</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            お客様対応の
            <span className="text-red-500">課題</span>
            を解決
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            多くの企業が抱える顧客対応の問題を、AIチャットボットが解決します
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${problem.color} flex items-center justify-center mb-6`}>
                <problem.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {problem.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
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
          className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            これらの課題を全て解決！
          </h3>
          <p className="text-lg mb-6">
            AIチャットボットなら24時間365日、即座に正確な対応が可能です
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            解決策を見る →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
