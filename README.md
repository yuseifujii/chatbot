# AI ChatBot Pro - ローカルビジネス向けAIチャットボット導入サービス

## 🚀 概要

AI ChatBot Proは、ローカルビジネス向けに特化したAIチャットボット導入サービスです。
お客様のWebサイトに簡単に設置でき、24時間365日自動でお客様対応を行います。

## ✨ 主な機能

- 🤖 **カスタムAIチャットボット**: 各企業に特化した応答を学習
- 📱 **完全レスポンシブデザイン**: PC、タブレット、スマートフォン対応
- 🎨 **デザインカスタマイズ**: サイトに合わせた見た目の調整
- 📝 **簡単導入**: 1行のスクリプトコードを追加するだけ
- 🔒 **セキュア**: SSL暗号化通信で安全な運用
- ⚡ **高速レスポンス**: 最新のAI技術で即座に回答

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **スタイリング**: Tailwind CSS
- **アニメーション**: Framer Motion
- **AI**: OpenAI API
- **デプロイ**: Vercel
- **言語**: TypeScript

## 📦 セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/yourusername/chatbot.git
cd chatbot
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.example`を`.env.local`にコピーして、必要な環境変数を設定：

```bash
cp .env.example .env.local
```

`.env.local`を編集：

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリケーションが起動します。

## 🚀 Vercelへのデプロイ

### 1. Vercel CLIのインストール（オプション）

```bash
npm i -g vercel
```

### 2. デプロイ

```bash
vercel
```

または、GitHubリポジトリをVercelに接続して自動デプロイを設定できます。

### 3. 環境変数の設定

Vercelダッシュボードで以下の環境変数を設定：

- `OPENAI_API_KEY`: OpenAI APIキー

## 💻 顧客への導入方法

顧客のWebサイトに以下のスクリプトタグを追加するだけで導入完了：

```html
<script src="https://chatbot.toremock.com/chatbot.js" data-store-id="CUSTOMER_ID"></script>
```

### カスタマイズオプション

```html
<script 
  src="https://chatbot.toremock.com/chatbot.js" 
  data-store-id="CUSTOMER_ID"
  data-position="bottom-right"
  data-primary-color="#2563eb"
  data-bubble-size="60"
></script>
```

## 📁 プロジェクト構造

```
chatbot/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # チャットAPI
│   ├── layout.tsx               # レイアウト
│   └── page.tsx                 # メインページ
├── components/
│   ├── Header.tsx               # ヘッダーコンポーネント
│   ├── HeroSection.tsx          # ヒーローセクション
│   ├── ProblemsSection.tsx      # 課題提起セクション
│   ├── ServicesSection.tsx      # サービス紹介セクション
│   ├── PricingSection.tsx       # 料金プランセクション
│   ├── ContactSection.tsx       # お問い合わせセクション
│   └── ChatBot.tsx              # チャットボットコンポーネント
├── public/
│   └── chatbot.js               # 埋め込み用スクリプト
├── stores/
│   └── store-config.json        # 顧客別設定ファイル
├── lib/
│   └── utils.ts                 # ユーティリティ関数
├── .env.example                 # 環境変数テンプレート
├── vercel.json                  # Vercel設定
└── README.md                    # このファイル
```

## 🔧 顧客データの管理

`stores/store-config.json`ファイルで顧客別の設定を管理します：

```json
{
  "stores": {
    "customer-id": {
      "name": "店舗名",
      "businessHours": "営業時間",
      "services": ["サービス1", "サービス2"],
      "faq": [
        {
          "question": "質問",
          "answer": "回答"
        }
      ]
    }
  }
}
```

## 📝 料金体系

- **導入初期費用**: ¥29,000（カスタムChatBOT開発費用）
- **サービス維持費**: ¥3,900/月
- **導入サポート**: ¥2,900（オプション）

## 🤝 サポート

- **メール**: info@chatbot-pro.jp
- **電話**: 03-1234-5678
- **営業時間**: 平日 9:00-18:00

## 📄 ライセンス

© 2024 AI ChatBot Pro. All rights reserved.

## 🔄 更新履歴

- **v1.0.0** (2024-01-XX): 初回リリース
  - ランディングページ実装
  - チャットボット機能実装
  - 埋め込みスクリプト作成
  - Vercelデプロイ対応