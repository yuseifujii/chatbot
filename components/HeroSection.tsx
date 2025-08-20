"use client"

import { motion } from 'framer-motion'
import { ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden min-h-[560px] md:min-h-[680px]">
      {/* フルブリード背景画像 */}
      <div className="absolute inset-0 -z-10">
        <div className="relative w-full h-full">
          {/* デスクトップ（人物が右にくるアートディレクション） */}
          <Image
            src="/hero-human-desktop.jpg"
            alt="ローカルビジネスの温かい雰囲気の背景（人物は右側）"
            fill
            priority
            className="object-cover hidden md:block object-[75%_50%]"
            sizes="(max-width: 768px) 0px, 100vw"
          />
          {/* モバイル用背景画像（hero-human-desktopの左側領域を切り取った画像） */}
          <Image
            src="/hero-mobile.jpg"
            alt="モバイル用背景画像"
            fill
            priority
            className="object-cover md:hidden object-center"
            sizes="(max-width: 768px) 100vw, 0px"
          />
          {/* デスクトップ向けクールトーンのオーバーレイ */}
          <div className="absolute inset-0 hidden md:block bg-gradient-to-br from-blue-900/35 via-slate-900/20 to-slate-900/10" />
          {/* モバイル向けオーバーレイ（背景画像の上に適用） */}
          <div className="absolute inset-0 md:hidden bg-gradient-to-br from-blue-900/40 via-slate-900/25 to-slate-900/15" />
          {/* デスクトップ：左側の可読性向上レイヤー（より自然なブラーグラデーション） */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden md:block w-[75%] lg:w-[60%] bg-gradient-to-r from-black/35 via-black/20 via-black/12 via-black/6 to-transparent backdrop-blur-[2px]" />
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

            <h1 className="text-[32px] sm:text-[36px] md:text-5xl lg:text-6xl xl:text-7xl leading-tight md:leading-[1.1] tracking-[-0.01em] md:tracking-[-0.02em] font-extrabold text-white drop-shadow mb-3 md:mb-4">
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
                <button aria-label="今すぐ導入" className="btn-primary-mobile md:btn-primary px-6 py-3 text-base md:px-8 md:py-4 md:text-lg rounded-full">
                  今すぐ導入
                </button>
              </Link>
              <button
                aria-label="デモを体験"
                onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
                className="btn-secondary-mobile md:btn-secondary px-6 py-3 text-base md:px-8 md:py-4 md:text-lg rounded-full"
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
