# 環境変数設定ガイド

## 必須の環境変数

### `OPENAI_API_KEY`
- **説明**: OpenAI APIと通信するためのAPIキー
- **取得方法**: 
  1. [OpenAI Platform](https://platform.openai.com/api-keys)にアクセス
  2. アカウントを作成またはログイン
  3. API Keysセクションで新しいキーを生成
- **形式**: `sk-` で始まる文字列
- **例**: `sk-proj-abcdefghijklmnopqrstuvwxyz123456`
- **注意事項**: 
  - このキーは秘密情報です。GitHubにコミットしないでください
  - 使用量に応じて課金されます
  - 使用量制限を設定することを推奨します

## オプションの環境変数

### `NEXT_PUBLIC_SITE_URL`
- **説明**: サイトの公開URL
- **デフォルト値**: `https://chatbot.toremock.com`
- **開発環境**: `http://localhost:3000`

### `NEXT_PUBLIC_API_URL`
- **説明**: APIエンドポイントのベースURL
- **デフォルト値**: `https://chatbot.toremock.com/api`
- **開発環境**: `http://localhost:3000/api`

### `NODE_ENV`
- **説明**: 実行環境の指定
- **値**: 
  - `development`: 開発環境
  - `production`: 本番環境
  - `test`: テスト環境

## 環境変数の設定方法

### ローカル開発環境

1. `.env.local`ファイルを作成:
```bash
cp .env.local.example .env.local
```

2. ファイルを編集して実際の値を設定:
```env
OPENAI_API_KEY=your_actual_api_key_here
```

3. 開発サーバーを再起動:
```bash
npm run dev
```

### Vercelでの本番環境設定

1. Vercelダッシュボードにログイン
2. プロジェクトを選択
3. Settings → Environment Variables に移動
4. 以下の変数を追加:
   - Key: `OPENAI_API_KEY`
   - Value: あなたのAPIキー
   - Environment: Production
5. "Save"をクリック

### 環境変数の確認

環境変数が正しく設定されているか確認:

```javascript
// app/api/test/route.ts で確認
console.log('API Key exists:', !!process.env.OPENAI_API_KEY)
```

## セキュリティのベストプラクティス

1. **絶対にGitにコミットしない**
   - `.env.local`は`.gitignore`に含まれています
   - APIキーを直接コードに書かない

2. **最小権限の原則**
   - 必要最小限の権限を持つAPIキーを使用
   - 使用量制限を設定

3. **定期的なローテーション**
   - APIキーを定期的に更新
   - 古いキーは無効化

4. **環境ごとの分離**
   - 開発用と本番用で異なるキーを使用
   - テスト環境では別のキーを使用

## トラブルシューティング

### APIキーが認識されない場合

1. スペルミスがないか確認
2. `.env.local`ファイルが正しい場所にあるか確認
3. サーバーを再起動
4. キャッシュをクリア: `rm -rf .next`

### OpenAI APIエラーが発生する場合

1. APIキーが有効か確認
2. 請求情報が設定されているか確認
3. 使用量制限に達していないか確認
4. [OpenAI Status](https://status.openai.com/)でサービス状態を確認

## 環境変数のテンプレート

```env
# 必須
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# オプション（デフォルト値あり）
NEXT_PUBLIC_SITE_URL=https://chatbot.toremock.com
NEXT_PUBLIC_API_URL=https://chatbot.toremock.com/api
NODE_ENV=production
```

## 関連ドキュメント

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
