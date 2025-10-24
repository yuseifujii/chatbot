import { Metadata } from "next"

export const metadata: Metadata = {
  title: "利用規約",
  description: "ToreMock ChatBotサービスの利用規約。サービス内容、禁止事項、免責事項などを定めています。",
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
