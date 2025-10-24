import { Metadata } from "next"

export const metadata: Metadata = {
  title: "ダッシュボード",
  description: "ToreMock ChatBotの管理ダッシュボード。チャット履歴の確認と分析ができます。",
  robots: {
    index: false,
    follow: false,
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
