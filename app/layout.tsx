import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI ChatBot Pro - ローカルビジネス向けAIチャットボット導入サービス",
  description: "貴社専用のAIチャットボットをWebサイトに簡単導入。24時間365日自動でお客様対応。初期費用29,000円、月額3,900円から。",
  keywords: "AIチャットボット,カスタマーサポート,自動応答,ローカルビジネス,Web導入",
  openGraph: {
    title: "AI ChatBot Pro - AIが自動でお客様対応",
    description: "貴社に特化したAIチャットボットをWebサイトに簡単設置",
    type: "website",
    locale: "ja_JP",
    url: "https://chatbot.toremock.com",
    siteName: "AI ChatBot Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI ChatBot Pro - AIが自動でお客様対応",
    description: "貴社に特化したAIチャットボットをWebサイトに簡単設置",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}