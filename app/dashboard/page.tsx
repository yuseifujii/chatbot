'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

interface ChatMessage {
  id: string
  storeId: string
  userMessage: string
  botResponse: string
  timestamp: string
  sessionId: string
  userAgent?: string
  ipAddress?: string
}

interface ChatSession {
  id: string
  storeId: string
  startTime: string
  lastActivity: string
  messageCount: number
  actualMessageCount: number
  userAgent?: string
  ipAddress?: string
}

function DashboardContent() {
  const [authenticated, setAuthenticated] = useState(false)
  const [storeId, setStoreId] = useState('')
  const [storeName, setStoreName] = useState('')
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [conversations, setConversations] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMessages: 0,
    avgMessagesPerSession: 0,
  })

  const searchParams = useSearchParams()

  useEffect(() => {
    const urlStoreId = searchParams.get('storeId')
    if (urlStoreId) {
      setStoreId(urlStoreId)
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storeId, storeName }),
      })

      if (response.ok) {
        setAuthenticated(true)
        await loadDashboardData()
      } else {
        const data = await response.json()
        setError(data.error || 'ログインに失敗しました')
      }
    } catch (err) {
      setError('接続エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      // セッション一覧を取得
      const sessionsResponse = await fetch(`/api/sessions?storeId=${storeId}`)
      if (sessionsResponse.ok) {
        const sessionsData = await sessionsResponse.json()
        setSessions(sessionsData.sessions)
        
        // 統計情報を計算
        const totalSessions = sessionsData.sessions.length
        const totalMessages = sessionsData.sessions.reduce((sum: number, session: ChatSession) => 
          sum + session.actualMessageCount, 0
        )
        const avgMessagesPerSession = totalSessions > 0 ? totalMessages / totalSessions : 0

        setStats({
          totalSessions,
          totalMessages,
          avgMessagesPerSession: Math.round(avgMessagesPerSession * 10) / 10,
        })
      }
    } catch (err) {
      setError('データの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const loadConversations = async (sessionId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/conversations?storeId=${storeId}&sessionId=${sessionId}`)
      if (response.ok) {
        const data = await response.json()
        setConversations(data.conversations)
        setSelectedSession(sessionId)
      }
    } catch (err) {
      setError('会話履歴の取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              チャットボット ダッシュボード
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              店舗IDと店舗名を入力して会話履歴を確認してください
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="storeId" className="block text-sm font-medium text-gray-700">
                  店舗ID
                </label>
                <input
                  id="storeId"
                  name="storeId"
                  type="text"
                  required
                  value={storeId}
                  onChange={(e) => setStoreId(e.target.value)}
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="例: demo"
                />
              </div>
              <div>
                <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
                  店舗名・会社名
                </label>
                <input
                  id="storeName"
                  name="storeName"
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="例: トレモックのチャットボット"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'ログイン中...' : 'ログイン'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                チャットボット ダッシュボード
              </h1>
              <p className="text-sm text-gray-500">店舗ID: {storeId}</p>
            </div>
            <button
              onClick={() => setAuthenticated(false)}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700"
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 統計情報 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">S</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      総セッション数
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalSessions}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">M</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      総メッセージ数
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalMessages}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">A</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      平均メッセージ数
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.avgMessagesPerSession}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* セッション一覧 */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                会話セッション一覧
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                最新のセッションから表示されています
              </p>
            </div>
            <ul className="divide-y divide-gray-200">
              {sessions.map((session) => (
                <li key={session.id}>
                  <button
                    onClick={() => loadConversations(session.id)}
                    className={`block hover:bg-gray-50 px-4 py-4 w-full text-left ${
                      selectedSession === session.id ? 'bg-indigo-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {session.actualMessageCount}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            セッション開始: {formatDate(session.startTime)}
                          </div>
                          <div className="text-sm text-gray-500">
                            最終活動: {formatDate(session.lastActivity)}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {session.actualMessageCount} メッセージ
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 会話履歴 */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                会話履歴
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {selectedSession ? 'セッションの詳細な会話内容' : 'セッションを選択してください'}
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              {loading && (
                <div className="text-center py-4">
                  <div className="text-sm text-gray-500">読み込み中...</div>
                </div>
              )}
              
              {!selectedSession && !loading && (
                <div className="text-center py-8">
                  <div className="text-sm text-gray-500">
                    左側のセッション一覧からセッションを選択してください
                  </div>
                </div>
              )}

              {selectedSession && conversations.length === 0 && !loading && (
                <div className="text-center py-8">
                  <div className="text-sm text-gray-500">
                    このセッションには会話履歴がありません
                  </div>
                </div>
              )}

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {conversations.map((conversation) => (
                  <div key={conversation.id} className="space-y-2">
                    <div className="text-xs text-gray-500">
                      {formatDate(conversation.timestamp)}
                    </div>
                    
                    {/* ユーザーメッセージ */}
                    <div className="flex justify-end">
                      <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-indigo-500 text-white">
                        <div className="text-sm">{conversation.userMessage}</div>
                      </div>
                    </div>
                    
                    {/* ボットの返答 */}
                    <div className="flex justify-start">
                      <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-200 text-gray-900">
                        <div className="text-sm whitespace-pre-wrap">{conversation.botResponse}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
