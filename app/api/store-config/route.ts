import { NextRequest, NextResponse } from 'next/server'
import storeConfig from '@/stores/store-config.json'

// 店舗設定を取得するAPIエンドポイント
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const storeId = searchParams.get('storeId') || 'demo'
    
    // 店舗データの取得
    const store = storeConfig.stores[storeId as keyof typeof storeConfig.stores]
    
    if (!store) {
      return NextResponse.json(
        { error: 'Store not found', storeId },
        { status: 404 }
      )
    }
    
    // デザイン設定とその他の情報を返す
    return NextResponse.json({
      id: store.id,
      name: store.name,
      customSettings: store.customSettings,
      businessInfo: store.businessInfo
    })
  } catch (error) {
    console.error('Store Config API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch store configuration' },
      { status: 500 }
    )
  }
}

// CORS対応
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
