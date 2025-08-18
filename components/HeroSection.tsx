"use client"

import { motion } from 'framer-motion'
import { MessageSquare, Clock, Users } from 'lucide-react'
import Link from 'next/link'
import { useChatbot } from '@/contexts/ChatbotContext'

export default function HeroSection() {
  const { openChatbot } = useChatbot();

  return (
    <section id="hero" className="pt-24 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AIが自動で
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                お客様対応！
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              貴社に特化したAIチャットボットを
              <br />
              Webサイトに簡単設置
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/form" passHref>
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  今すぐ導入
                </button>
              </Link>
              <button
                onClick={openChatbot}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all duration-300"
              >
                デモを体験
              </button>
            </div>

            {/* 特徴アイコン */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="text-blue-600" size={24} />
                </div>
                <p className="text-sm font-medium text-gray-700">24時間対応</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MessageSquare className="text-blue-600" size={24} />
                </div>
                <p className="text-sm font-medium text-gray-700">即座に返答</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="text-blue-600" size={24} />
                </div>
                <p className="text-sm font-medium text-gray-700">顧客満足度UP</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <img 
                src="/api/placeholder/600/400" 
                alt="チャットボットデモ" 
                className="rounded-2xl shadow-2xl w-full"
              />
              {/* アニメーションバブル */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4"
              >
                <p className="text-sm font-semibold text-gray-800">導入企業</p>
                <p className="text-2xl font-bold text-blue-600">急増中！</p>
              </motion.div>
            </div>
            {/* 背景装飾 */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl transform rotate-3 opacity-20 blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
