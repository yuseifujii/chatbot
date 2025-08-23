"use client"

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

const navItems = [
  { label: 'ホーム', href: '#hero' },
  { label: 'サービス', href: '#services' },
  { label: '料金', href: '#pricing' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    // ホーム以外のページではホームへ遷移してから該当セクションへ
    if (pathname !== '/') {
      router.push(`/${href}`)
      return
    }

    // ホームではスムーススクロール
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      // 念のためハッシュを書き換え（ブラウザデフォルトのスクロールにフォールバック）
      window.location.hash = href
    }
  }

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
    )}>
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* ロゴ */}
          <div className="flex items-center">
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              トレモックChatBot
            </span>
          </div>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTAボタン */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard" passHref>
              <button className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                ダッシュボード
              </button>
            </Link>
            <Link href="/form" passHref>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 font-medium">
                お申し込み
              </button>
            </Link>
          </div>

          {/* モバイルメニューボタン */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="flex flex-col py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
              <Link href="/dashboard" passHref>
                <div className="px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                  ダッシュボード
                </div>
              </Link>
              <Link href="/form" passHref>
                <button className="mx-3 mt-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-full hover:shadow-lg transition-all duration-300 font-medium">
                  お申し込み
                </button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
