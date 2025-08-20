"use client"

import { motion } from 'framer-motion'
import { MessageSquare, Clock, Users, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* 背景装飾（ラジアルとグリッド） */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-blue-200/40 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 h-[360px] w-[360px] rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="container mx-auto px-4 py-24 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左カラム：コピー・CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-custom ring-1 ring-blue-100 px-3 py-1.5 mb-4 shadow-soft">
              <Sparkles className="text-blue-600" size={16} />
              <span className="text-sm font-medium text-blue-700">10分でかんたんに開始できます</span>
            </div>

            <h1 className="heading-xl text-gray-900 mb-4">
              貴社専用の
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">AIチャット</span>
              で
              <br className="hidden md:block" />
              あらゆる顧客対応を効率化
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              WebサイトやLPにすぐ設置できる、貴社専用のAIチャットボット。
              <br className="hidden sm:block" />
              24時間/365日・高精度応答で、問い合わせ対応とCVを同時に伸ばします。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <Link href="/form" passHref>
                <button aria-label="今すぐ導入" className="btn-primary px-8 py-4 text-lg rounded-full">
                  今すぐ導入
                </button>
              </Link>
              <button
                aria-label="デモを体験"
                onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
                className="btn-secondary px-8 py-4 text-lg rounded-full"
              >
                デモを体験
              </button>
            </div>
            <div className="mt-3 text-sm text-gray-600 flex items-center gap-2 justify-center lg:justify-start">
              <ShieldCheck className="text-blue-600" size={18} />
              <span>無料の導入サポート付き</span>
            </div>

            {/* 特徴（チェックリスト） */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-blue-600" size={20} />
                <span className="text-gray-700 text-sm">24時間365日 即時応答</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-blue-600" size={20} />
                <span className="text-gray-700 text-sm">だれでも簡単に導入可能</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-blue-600" size={20} />
                <span className="text-gray-700 text-sm">デザインカスタマイズ可能</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-blue-600" size={20} />
                <span className="text-gray-700 text-sm">セキュアなデータ取り扱い</span>
              </div>
            </div>

            {/* 実績（KPIカード） */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="card p-4 text-left"
              >
                <p className="text-xs text-gray-500">導入実績</p>
                <p className="text-2xl font-bold text-gray-900">多くの企業に選定</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="card p-4 text-left"
              >
                <p className="text-xs text-gray-500">顧客満足度</p>
                <p className="text-2xl font-bold text-gray-900">高評価</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="card p-4 text-left col-span-2 sm:col-span-1"
              >
                <p className="text-xs text-gray-500">セキュリティ</p>
                <p className="text-2xl font-bold text-gray-900">安心の体制</p>
              </motion.div>
            </div>
          </motion.div>

          {/* 右カラム：メディアモック／バブル */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl bg-white shadow-hard ring-1 ring-black/5 p-4 sm:p-6">
              <div className="image-zoom rounded-2xl overflow-hidden">
                <Image
                  src="/globe.svg"
                  alt="チャットボットのUIイメージ"
                  width={600}
                  height={400}
                  className="responsive-image"
                  priority
                />
              </div>
              {/* 浮遊するインフォバッジ */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 border border-blue-100"
              >
                <p className="text-[11px] font-semibold text-gray-800">自動要約・会話履歴</p>
                <p className="text-xl font-bold text-blue-600">すぐ共有</p>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 left-6 bg-white rounded-2xl shadow-lg p-3 border border-blue-100 flex items-center gap-2"
              >
                <MessageSquare className="text-blue-600" size={18} />
                <span className="text-xs text-gray-700">即時回答で離脱を防止</span>
              </motion.div>
            </div>

            {/* 背景の角度付きグラデーション */}
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl rotate-3 opacity-10 blur-2xl" />
          </motion.div>
        </div>

        {/* ロゴ（信頼の可視化） */}
        <div className="mt-14">
          <p className="text-xs text-gray-500 uppercase tracking-wider text-center lg:text-left mb-4">多くの企業にご利用いただいています</p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 opacity-70">
            <Image src="/vercel.svg" alt="Partner logo" width={88} height={24} />
            <Image src="/next.svg" alt="Partner logo" width={88} height={24} />
            <Image src="/globe.svg" alt="Partner logo" width={88} height={24} />
            <Image src="/window.svg" alt="Partner logo" width={88} height={24} />
            <Image src="/file.svg" alt="Partner logo" width={88} height={24} />
          </div>
        </div>
      </div>
    </section>
  )
}
