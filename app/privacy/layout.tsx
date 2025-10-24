import { Metadata } from "next"

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "ToreMock ChatBotのプライバシーポリシー。お客様の個人情報の取り扱いについて詳しく説明しています。",
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
