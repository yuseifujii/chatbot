// Firebase Admin SDK設定
import admin from 'firebase-admin'

let isInitialized = false;

// Firebase Admin初期化関数
function initializeFirebaseAdmin() {
  if (isInitialized || admin.apps.length > 0) {
    return;
  }

  try {
    // 本番環境では環境変数からサービスアカウントキーを取得
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      })
      console.log('Firebase Admin initialized with service account')
      isInitialized = true;
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
        isInitialized = true;
      } else {
        console.warn('Firebase Admin credentials not found - Firebase features will be disabled in development')
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

// Firestore取得関数（初期化をチェック）
function getAdminDb() {
  if (!isInitialized && admin.apps.length === 0) {
    initializeFirebaseAdmin();
  }
  
  if (admin.apps.length === 0) {
    throw new Error('Firebase Admin is not initialized');
  }
  
  return admin.firestore();
}

export const adminDb = getAdminDb;

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
