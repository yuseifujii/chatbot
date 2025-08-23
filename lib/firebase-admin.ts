// Firebase Admin SDK設定
import admin from 'firebase-admin'

// Firebase Admin初期化（重複を防ぐ）
if (!admin.apps.length) {
  try {
    // 本番環境では環境変数からサービスアカウントキーを取得
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      })
      console.log('Firebase Admin initialized with service account')
    } else {
      // フォールバック: 環境変数から直接設定
      if (process.env.FIREBASE_ADMIN_PROJECT_ID && 
          process.env.FIREBASE_ADMIN_PRIVATE_KEY && 
          process.env.FIREBASE_ADMIN_CLIENT_EMAIL) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
            privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          }),
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        })
        console.log('Firebase Admin initialized with individual credentials')
      } else {
        throw new Error('Firebase Admin credentials not found in environment variables')
      }
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error)
    console.error('Available env vars:', {
      hasServiceAccountKey: !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
      hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      hasAdminProjectId: !!process.env.FIREBASE_ADMIN_PROJECT_ID,
    })
  }
}

export const adminDb = admin.firestore()

// 型定義
export interface ChatMessage {
  id: string
  storeId: string
  userMessage: string
  botResponse: string
  timestamp: Date
  sessionId: string
  userAgent?: string
  ipAddress?: string
}

export interface ChatSession {
  id: string
  storeId: string
  startTime: Date
  lastActivity: Date
  messageCount: number
  userAgent?: string
  ipAddress?: string
}
