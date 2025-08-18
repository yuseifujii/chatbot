import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ProblemsSection from '@/components/ProblemsSection'
import ServicesSection from '@/components/ServicesSection'
import PricingSection from '@/components/PricingSection'
import ChatBot from '@/components/ChatBot'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemsSection />
        <ServicesSection />
        <PricingSection />
      </main>
      <ChatBot />
      
      {/* フッター */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                ToreMock LLC
              </h3>
              <p className="text-gray-400 text-sm">
                最先端のAI技術で、<br />
                ビジネスの成長を支援します
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">会社情報</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">会社概要</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">利用規約</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">特定商取引法</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">お問い合わせ</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>合同会社ToreMock</li>
                  <li>✉️ info@toremock.com</li>
                  <li>🏢 千葉県船橋市薬園台六丁目八番二号</li>
                  <li>⏰ 平日 9:00-18:00</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 ToreMock LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}