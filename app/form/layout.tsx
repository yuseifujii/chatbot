import { Metadata } from "next"

export const metadata: Metadata = {
  title: "お申し込み",
  description: "ToreMock ChatBotのお申し込みページ。簡単3ステップで貴社専用のAIチャットボットを導入できます。",
  openGraph: {
    title: "お申し込み | ToreMock ChatBot",
    description: "簡単3ステップで貴社専用のAIチャットボットを導入。初期費用0円、年間利用料11,000円から始められます。",
  },
}

export default function FormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
