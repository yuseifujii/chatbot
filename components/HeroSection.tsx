"use client"

import { motion } from 'framer-motion'
import { MessageSquare, Clock, Users, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* フルブリード背景画像 */}
      <div className="absolute inset-0 -z-10">
        <div className="relative w-full h-full">
          <Image
            src="/hero-bg.jpg"
            alt="ヒーロー背景"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
          {/* オーバーレイ（読みやすさ向上） */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-900/40 to-black/30" />
        </div>
      </div>

      <div className="container mx-auto px-3 md:px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 items-center">
          {/* 左カラム：コピー・CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-custom ring-1 ring-white/40 px-2.5 py-1.5 mb-3 shadow-soft">
              <Sparkles className="text-blue-700" size={16} />
              <span className="text-sm font-medium text-blue-800">10分でかんたんに開始できます</span>
            </div>

            <h1 className="text-[30px] sm:text-[32px] leading-tight tracking-[-0.01em] font-extrabold md:heading-5xl md:leading-[1.1] md:tracking-[-0.015em] text-white drop-shadow mb-3 md:mb-4">
              貴社専用の
              <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">AIチャット</span>
              で
              <br className="hidden md:block" />
              顧客対応を効率化
            </h1>
            <p className="text-base md:text-xl text-gray-100 leading-relaxed">
              WebサイトやLPにすぐ設置できる、貴社専用のAIチャットボット。
              <br className="hidden sm:block" />
              24時間/365日・高精度応答で、問い合わせ対応とCVを同時に伸ばします。
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8 justify-center lg:justify-start">
              <Link href="/form" passHref>
                <button aria-label="今すぐ導入" className="btn-primary px-6 py-3 text-base md:px-8 md:py-4 md:text-lg rounded-full">
                  今すぐ導入
                </button>
              </Link>
              <button
                aria-label="デモを体験"
                onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
                className="btn-secondary px-6 py-3 text-base md:px-8 md:py-4 md:text-lg rounded-full"
              >
                デモを体験
              </button>
            </div>
            <div className="mt-2.5 md:mt-3 text-xs md:text-sm text-gray-100 flex items-center gap-2 justify-center lg:justify-start">
              <ShieldCheck className="text-blue-300" size={18} />
              <span>無料の導入サポート付き</span>
            </div>

            {/* 特徴（チェックリスト） */}
            <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-blue-300" size={20} />
                <span className="text-gray-100 text-[13px] md:text-sm">24時間365日 即時応答</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-blue-300" size={20} />
                <span className="text-gray-100 text-[13px] md:text-sm">だれでも簡単に導入可能</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-blue-300" size={20} />
                <span className="text-gray-100 text-[13px] md:text-sm">デザインカスタマイズ可能</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-blue-300" size={20} />
                <span className="text-gray-100 text-[13px] md:text-sm">セキュアなデータ取り扱い</span>
              </div>
            </div>

            {/* 実績（KPIカード） */}
            <div className="mt-8 md:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="card p-3 md:p-4 text-left bg-white/90 backdrop-blur-custom"
              >
                <p className="text-[11px] md:text-xs text-gray-600">導入実績</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">多くの企業に選定</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="card p-3 md:p-4 text-left bg-white/90 backdrop-blur-custom"
              >
                <p className="text-[11px] md:text-xs text-gray-600">顧客満足度</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">高評価</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="card p-3 md:p-4 text-left col-span-2 sm:col-span-1 bg-white/90 backdrop-blur-custom"
              >
                <p className="text-[11px] md:text-xs text-gray-600">セキュリティ</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">安心の体制</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
