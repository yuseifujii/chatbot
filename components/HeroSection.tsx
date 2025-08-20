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
              <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent font-black drop-shadow-lg">AIチャット</span>
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

            {/* 特徴（チェックリスト） - より大きく目立つデザイン */}
            <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-300" size={24} />
                <span className="text-white text-base md:text-lg font-semibold">貴社の業務内容に完全対応</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-300" size={24} />
                <span className="text-white text-base md:text-lg font-semibold">どなたでも簡単に導入可能</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-300" size={24} />
                <span className="text-white text-base md:text-lg font-semibold">デザインカスタマイズ可能</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-300" size={24} />
                <span className="text-white text-base md:text-lg font-semibold">安全なデータ取り扱い</span>
              </div>
            </div>

            {/* 実績（KPIカード） - シンプルで落ち着いたデザイン */}
            <div className="mt-8 md:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="card p-4 md:p-6 text-center bg-white/85 backdrop-blur-custom text-slate-800 shadow-lg"
              >
                <p className="text-xl md:text-2xl font-bold leading-tight">24時間365日<br/>即時応答</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="card p-4 md:p-6 text-center bg-white/85 backdrop-blur-custom text-slate-800 shadow-lg"
              >
                <p className="text-xl md:text-2xl font-bold leading-tight">無料の<br/>導入サポート</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="card p-4 md:p-6 text-center col-span-1 sm:col-span-1 bg-white/85 backdrop-blur-custom text-slate-800 shadow-lg"
              >
                <p className="text-xl md:text-2xl font-bold leading-tight">最短2日で実装</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
