import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'ToreMock ChatBot - AIチャットボット開発サービス'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #4f46e5, #7c3aed)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
            height: '80%',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
              backgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            ToreMock ChatBot
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#374151',
              textAlign: 'center',
              marginBottom: '40px',
              maxWidth: '800px',
            }}
          >
            貴社専用のAIチャットボットを
            最短2営業日で開発・導入
          </p>
          <div
            style={{
              display: 'flex',
              gap: '40px',
              fontSize: '24px',
              color: '#6b7280',
            }}
          >
            <span>✓ 24時間自動対応</span>
            <span>✓ 初期費用47,000円〜</span>
            <span>✓ 簡単導入</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
