# ダッシュボード認証システム

## 🔐 新しい認証システム

店舗IDと店舗名を使用した認証システムに変更しました。これにより新しい顧客ごとに環境変数を設定する必要がなくなりました。

## 📝 認証方法

### ダッシュボードログイン
1. ダッシュボードページ (`/dashboard`) にアクセス
2. **店舗ID**: `store-config.json`の`id`フィールド
3. **店舗名**: `store-config.json`の`name`フィールド

### 現在の認証情報例

#### デモ店舗
- **店舗ID**: `demo`
- **店舗名**: `トレモックのチャットボット`

#### 藤井佑成様
- **店舗ID**: `ysfj501`
- **店舗名**: `藤井佑成`

## 🆕 新しい顧客の追加手順

### 1. store-config.jsonに追加
```json
{
  "stores": {
    "existing_stores": "...",
    "new_customer_id": {
      "id": "new_customer_id",
      "name": "株式会社新規顧客",
      "description": "新規顧客のチャットボット",
      "businessInfo": {
        "businessHours": "平日 9:00-18:00",
        "address": "東京都新宿区...",
        "phone": "03-1234-5678",
        "email": "info@newcustomer.com"
      },
      "services": [
        "商品A",
        "商品B",
        "サポート"
      ],
      "faq": [
        {
          "question": "営業時間は？",
          "answer": "平日9時から18時まで営業しております。"
        }
      ],
      "customSettings": {
        "primaryColor": "#2563eb",
        "chatbotName": "新規顧客サポート",
        "welcomeMessage": "こんにちは！何かご質問はありますか？",
        "placeholderText": "メッセージを入力...",
        "position": "bottom-right",
        "bubbleSize": "60"
      }
    }
  }
}
```

### 2. 顧客への導入コード提供
```html
<script src="https://yoursite.vercel.app/chatbot.js" data-store-id="new_customer_id"></script>
```

### 3. ダッシュボード認証情報の提供
顧客に以下の情報を伝えます：
- **ダッシュボードURL**: `https://yoursite.vercel.app/dashboard`
- **店舗ID**: `new_customer_id`
- **店舗名**: `株式会社新規顧客`

## ✅ 利点

1. **環境変数不要**: 新しい顧客ごとにVercelで環境変数を設定する必要なし
2. **即座に利用可能**: `store-config.json`を更新すればすぐに認証可能
3. **管理が簡単**: 全ての顧客情報が1つのファイルで管理
4. **セキュア**: 店舗IDと正確な店舗名の両方が必要

## 🔄 既存顧客への影響

- **変更なし**: 既存の顧客のチャットボット機能は継続動作
- **ダッシュボードアクセス**: 新しい認証方式でアクセス必要
- **認証情報**: 各顧客に新しいログイン方法を案内

## 🔒 セキュリティ考慮事項

1. **正確性が重要**: 店舗名は完全一致が必要（大文字小文字含む）
2. **情報管理**: 顧客には正確な店舗IDと店舗名を伝達
3. **アクセス制御**: 各店舗は自分のデータのみ閲覧可能
