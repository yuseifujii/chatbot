import { NextRequest, NextResponse } from 'next/server'
import { validateDashboardAccess } from '@/lib/auth'

// ダッシュボード認証
export async function POST(request: NextRequest) {
  try {
    const { storeId, storeName } = await request.json()

    if (!storeId || !storeName) {
      return NextResponse.json(
        { error: '店舗IDと店舗名が必要です' },
        { status: 400 }
      )
    }

    const isValid = validateDashboardAccess(storeId, storeName)

    if (isValid) {
      return NextResponse.json({
        success: true,
        storeId,
        message: 'ログインが成功しました',
      })
    } else {
      return NextResponse.json(
        { error: '店舗IDまたは店舗名が正しくありません' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('ダッシュボード認証エラー:', error)
    return NextResponse.json(
      { error: '認証中にエラーが発生しました' },
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
