import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ToreMock ChatBot - 貴社専用AIチャットボット開発サービス",
    template: "%s | ToreMock ChatBot"
  },
  description: "ToreMock ChatBotは、貴社専用のAIチャットボットを最短2営業日で開発・導入。24時間自動対応で顧客満足度向上とコスト削減を実現。初期費用0円、年間利用料11,000円から。",
  keywords: "ToreMock ChatBot,AIチャットボット,カスタマーサポート,自動応答,ローカルビジネス,Web導入,24時間対応,ChatGPT,カスタマイズ,業務効率化,顧客対応自動化",
  authors: [{ name: "合同会社ToreMock" }],
  creator: "合同会社ToreMock",
  publisher: "合同会社ToreMock",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://chatbot.toremock.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ToreMock ChatBot - 貴社専用AIチャットボット開発サービス",
    description: "貴社専用のAIチャットボットを最短2営業日で開発・導入。24時間自動対応で顧客満足度向上とコスト削減を実現。",
    type: "website",
    locale: "ja_JP",
    url: "https://chatbot.toremock.com",
    siteName: "ToreMock ChatBot",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ToreMock ChatBot - AIチャットボット開発サービス",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToreMock ChatBot - 貴社専用AIチャットボット開発サービス",
    description: "貴社専用のAIチャットボットを最短2営業日で開発・導入。24時間自動対応で顧客満足度向上。",
    images: ["/opengraph-image"],
    creator: "@toremock",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google0d9658c0c34129d5",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ToreMock ChatBot",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "貴社専用のAIチャットボットを最短2営業日で開発・導入。24時間自動対応で顧客満足度向上とコスト削減を実現。",
    "offers": {
      "@type": "Offer",
      "price": "11000",
      "priceCurrency": "JPY",
      "availability": "https://schema.org/InStock",
      "description": "初期費用0円、年間利用料11,000円から"
    },
    "provider": {
      "@type": "Organization",
      "name": "合同会社ToreMock",
      "url": "https://toremock.com",
      "email": "info@toremock.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "船橋市",
        "addressRegion": "千葉県",
        "addressCountry": "JP"
      }
    },
    "featureList": [
      "24時間自動対応",
      "カスタマイズ可能",
      "簡単導入（1行コード）",
      "会話履歴管理",
      "リアルタイムサポート"
    ]
  };

  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="google-site-verification" content="AS1WpZr-BEhMG5RS61UAHLnEluJdulVeFvR0AgNI0sQ" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}