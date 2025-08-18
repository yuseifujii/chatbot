import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ProblemsSection from '@/components/ProblemsSection'
import ServicesSection from '@/components/ServicesSection'
import PricingSection from '@/components/PricingSection'
import ChatBot from '@/components/ChatBot'
import Footer from '@/components/Footer'

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
      <Footer />
    </>
  )
}