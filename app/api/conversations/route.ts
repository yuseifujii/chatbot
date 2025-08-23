import { NextRequest, NextResponse } from 'next/server'
import { adminDb, ChatMessage, ChatSession } from '@/lib/firebase-admin'
import { v4 as uuidv4 } from 'uuid'

// 会話履歴を保存
export async function POST(request: NextRequest) {
  try {
    const { storeId, userMessage, botResponse, sessionId } = await request.json()
    
    if (!storeId || !userMessage || !botResponse) {
      return NextResponse.json(
        { error: '必要なパラメータが不足しています' },
        { status: 400 }
      )
    }

    const now = new Date()
    const messageId = uuidv4()
    const currentSessionId = sessionId || uuidv4()

    // IPアドレスとユーザーエージェントを取得
    const userAgent = request.headers.get('user-agent') || undefined
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ipAddress = forwardedFor?.split(',')[0] || realIp || undefined

    // メッセージデータ
    const messageData: Omit<ChatMessage, 'id'> = {
      storeId,
      userMessage,
      botResponse,
      timestamp: now,
      sessionId: currentSessionId,
      userAgent,
      ipAddress,
    }

    // Firestoreに会話履歴を保存
    await adminDb().collection('conversations').doc(messageId).set({
      ...messageData,
      timestamp: now.toISOString(),
    })

    // セッション情報の更新または作成
    const sessionRef = adminDb().collection('sessions').doc(currentSessionId)
    const sessionDoc = await sessionRef.get()

    if (sessionDoc.exists) {
      // 既存セッションの更新
      await sessionRef.update({
        lastActivity: now.toISOString(),
        messageCount: (sessionDoc.data()?.messageCount || 0) + 1,
      })
    } else {
      // 新しいセッションの作成
      const sessionData: Omit<ChatSession, 'id'> = {
        storeId,
        startTime: now,
        lastActivity: now,
        messageCount: 1,
        userAgent,
        ipAddress,
      }
      
      await sessionRef.set({
        ...sessionData,
        startTime: now.toISOString(),
        lastActivity: now.toISOString(),
      })
    }

    return NextResponse.json({
      success: true,
      messageId,
      sessionId: currentSessionId,
    })

  } catch (error) {
    console.error('会話履歴保存エラー:', error)
    return NextResponse.json(
      { error: '会話履歴の保存中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

// 会話履歴を取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const storeId = searchParams.get('storeId')
    const limit = parseInt(searchParams.get('limit') || '50')
    const sessionId = searchParams.get('sessionId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    if (!storeId) {
      return NextResponse.json(
        { error: 'storeIdは必須パラメータです' },
        { status: 400 }
      )
    }

    let query = adminDb().collection('conversations').where('storeId', '==', storeId)

    // セッション指定フィルター
    if (sessionId) {
      query = query.where('sessionId', '==', sessionId)
    }

    // 日付範囲フィルター
    if (startDate) {
      query = query.where('timestamp', '>=', startDate)
    }
    if (endDate) {
      query = query.where('timestamp', '<=', endDate)
    }

    // 並び順と制限
    query = query.orderBy('timestamp', 'desc').limit(limit)

    const snapshot = await query.get()
    const conversations = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({
      conversations,
      total: conversations.length,
    })

  } catch (error) {
    console.error('会話履歴取得エラー:', error)
    return NextResponse.json(
      { error: '会話履歴の取得中にエラーが発生しました' },
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
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
