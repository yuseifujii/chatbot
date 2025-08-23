import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// セッション一覧を取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const storeId = searchParams.get('storeId')
    const limit = parseInt(searchParams.get('limit') || '50')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    if (!storeId) {
      return NextResponse.json(
        { error: 'storeIdは必須パラメータです' },
        { status: 400 }
      )
    }

    let query = adminDb.collection('sessions').where('storeId', '==', storeId)

    // 日付範囲フィルター
    if (startDate) {
      query = query.where('startTime', '>=', startDate)
    }
    if (endDate) {
      query = query.where('startTime', '<=', endDate)
    }

    // 並び順と制限
    query = query.orderBy('startTime', 'desc').limit(limit)

    const snapshot = await query.get()
    const sessions = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }))

    // 各セッションの統計情報を追加
    const sessionsWithStats = await Promise.all(
      sessions.map(async (session: any) => {
        // セッション内のメッセージ数を取得
        const messagesSnapshot = await adminDb
          .collection('conversations')
          .where('sessionId', '==', session.id)
          .get()

        return {
          ...session,
          actualMessageCount: messagesSnapshot.size,
        }
      })
    )

    return NextResponse.json({
      sessions: sessionsWithStats,
      total: sessionsWithStats.length,
    })

  } catch (error) {
    console.error('セッション取得エラー:', error)
    return NextResponse.json(
      { error: 'セッション情報の取得中にエラーが発生しました' },
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
