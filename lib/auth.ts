import { NextRequest } from 'next/server'
import storeConfig from '@/stores/store-config.json'

// 簡単な認証システム（APIキー方式）
export function validateStoreAccess(storeId: string, apiKey?: string): boolean {
  // デモ用は誰でもアクセス可能
  if (storeId === 'demo') {
    return true
  }

  // 実際のstoreIdが存在するかチェック
  const storeExists = storeConfig.stores[storeId as keyof typeof storeConfig.stores]
  if (!storeExists) {
    return false
  }

  // 本番環境では環境変数にAPIキーを設定
  const validApiKey = process.env[`STORE_API_KEY_${storeId.toUpperCase()}`]
  
  if (validApiKey && apiKey === validApiKey) {
    return true
  }

  // 開発環境では簡単なパスワード（store_config.jsonにパスワードフィールドがある場合）
  if (process.env.NODE_ENV === 'development') {
    return true // 開発環境では認証をスキップ
  }

  return false
}

// リクエストからAPIキーを取得
export function getApiKeyFromRequest(request: NextRequest): string | undefined {
  // ヘッダーから取得
  const headerApiKey = request.headers.get('x-api-key')
  if (headerApiKey) return headerApiKey

  // クエリパラメータから取得
  const { searchParams } = new URL(request.url)
  const queryApiKey = searchParams.get('apiKey')
  if (queryApiKey) return queryApiKey

  return undefined
}

// 顧客向けダッシュボード用の認証（store-config.jsonベース）
export function validateDashboardAccess(storeId: string, storeName?: string): boolean {
  // store-config.jsonから店舗情報を取得
  const storeData = storeConfig.stores[storeId as keyof typeof storeConfig.stores]
  if (!storeData) {
    return false
  }

  // 店舗IDと店舗名（name）が一致するかチェック
  if (storeData.id === storeId && storeData.name === storeName) {
    return true
  }

  return false
}
