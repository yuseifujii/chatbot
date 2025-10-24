import { Metadata } from "next"

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description: "ToreMock ChatBotサービスの特定商取引法に基づく表記。販売業者情報、価格、返品・キャンセルポリシーなど。",
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
