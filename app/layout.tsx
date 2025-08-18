import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToreMock ChatBot",
  description: "ToreMock ChatBotは、貴社専用のAIチャットボットです。Webサイトに簡単導入できます。",
  keywords: "ToreMock ChatBot,AIチャットボット,カスタマーサポート,自動応答,ローカルビジネス,Web導入",
  openGraph: {
    title: "ToreMock ChatBot",
    description: "ToreMock ChatBotは、貴社専用のAIチャットボットです。Webサイトに簡単導入できます。",
    type: "website",
    locale: "ja_JP",
    url: "https://chatbot.toremock.com",
    siteName: "ToreMock ChatBot",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToreMock ChatBot",
    description: "ToreMock ChatBotは、貴社専用のAIチャットボットです。Webサイトに簡単導入できます。",
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
      <body className={inter.className}>
        {children}
        <Script src="/chatbot.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}