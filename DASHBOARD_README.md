# チャットボット ダッシュボード機能

## 概要

顧客がWebサイトに導入したチャットボットの会話履歴を確認できるダッシュボード機能を実装しました。

## 実装した機能

### 1. 会話履歴の保存
- **Firestore**を使用して全ての会話データを保存
- ユーザーのメッセージとボットの返答を自動保存
- セッション管理により連続した会話をグループ化
- IPアドレス、ユーザーエージェント、タイムスタンプも記録

### 2. 顧客ダッシュボード
- 会話セッション一覧の表示
- 個別セッションの詳細な会話履歴閲覧
- 統計情報（総セッション数、総メッセージ数、平均メッセージ数）
- レスポンシブデザイン対応

### 3. セキュリティ
- 店舗ID + パスワード方式での認証
- 環境変数による店舗別パスワード管理
- 開発環境では簡易認証（demo123）

## ファイル構成

### 新規作成ファイル

#### バックエンド
- `lib/firebase.ts` - Firebase クライアント設定
- `lib/firebase-admin.ts` - Firebase Admin SDK設定
- `lib/auth.ts` - 認証ロジック
- `app/api/conversations/route.ts` - 会話履歴API
- `app/api/sessions/route.ts` - セッション情報API
- `app/api/auth/dashboard/route.ts` - ダッシュボード認証API

#### フロントエンド
- `app/dashboard/page.tsx` - ダッシュボードページ

### 更新ファイル
- `app/api/chat/route.ts` - 会話履歴保存機能を追加
- `public/chatbot.js` - セッション管理を追加
- `components/Header.tsx` - ダッシュボードリンクを追加
- `package.json` - Firebase関連パッケージを追加

## セットアップ手順

### 1. 必要なパッケージインストール
```bash
npm install firebase firebase-admin uuid @types/uuid
```

### 2. Firebase プロジェクト設定

1. [Firebase Console](https://console.firebase.google.com/)でプロジェクト作成
2. Firestoreデータベースを有効化
3. プロジェクト設定からConfiguration情報を取得

### 3. 環境変数設定

`.env.local`ファイルを作成し、以下の環境変数を設定：

```env
# Firebase Configuration
＊＊＊＊＊

# 本番環境用
＊
```

### 4. Firestore セキュリティルール

Firebase ConsoleでFirestoreのセキュリティルールを設定：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 会話履歴（読み取り専用、サーバーサイドからの書き込みのみ）
    match /conversations/{document} {
      allow read: if true; // 認証はアプリケーション層で制御
      allow write: if false; // サーバーサイドからのみ
    }
    
    // セッション情報
    match /sessions/{document} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

## 使用方法

### 1. ダッシュボードアクセス

1. サイトのヘッダーから「ダッシュボード」をクリック
2. 店舗ID（例：demo）とパスワード（例：demo123）を入力
3. ログイン後、会話履歴を確認

### 2. APIエンドポイント

#### 会話履歴取得
```
GET /api/conversations?storeId=demo&limit=50&sessionId=xxx
```

#### セッション一覧取得
```
GET /api/sessions?storeId=demo&limit=50
```

#### 認証
```
POST /api/auth/dashboard
{
  "storeId": "demo",
  "password": "demo123"
}
```

## データ構造

### 会話履歴 (conversations)
```json
{
  "id": "message_id",
  "storeId": "demo",
  "userMessage": "ユーザーの質問",
  "botResponse": "ボットの返答",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "sessionId": "session_abc123_1704067200000",
  "userAgent": "Mozilla/5.0...",
  "ipAddress": "192.168.1.1"
}
```

### セッション情報 (sessions)
```json
{
  "id": "session_abc123_1704067200000",
  "storeId": "demo",
  "startTime": "2024-01-01T00:00:00.000Z",
  "lastActivity": "2024-01-01T00:05:00.000Z",
  "messageCount": 5,
  "userAgent": "Mozilla/5.0...",
  "ipAddress": "192.168.1.1"
}
```

## セキュリティ考慮事項

1. **パスワード管理**: 本番環境では強固なパスワードを環境変数で管理
2. **APIアクセス制御**: 必要に応じてより高度な認証システムの導入を検討
3. **データ保護**: 機密情報が会話に含まれる場合は適切な暗号化を検討
4. **アクセスログ**: 必要に応じてダッシュボードアクセスログの実装

## 今後の拡張可能性

1. **高度な分析機能**: よく聞かれる質問の分析、応答時間の測定
2. **エクスポート機能**: CSV、JSON形式での会話履歴エクスポート
3. **リアルタイム通知**: 新しい会話の通知機能
4. **フィルタリング**: 日時、キーワードによる高度な絞り込み
5. **権限管理**: 複数ユーザーでの役割ベースアクセス制御
