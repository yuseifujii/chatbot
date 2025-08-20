import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import storeConfig from '@/stores/store-config.json'

// 顧客データの型定義
interface StoreData {
  id: string
  name: string
  description: string
  businessInfo: {
    businessHours: string
    address: string
    phone: string
    email: string
  }
  services: string[]
  faq: Array<{ question: string; answer: string }>
  customSettings: {
    primaryColor: string
    chatbotName: string
    welcomeMessage: string
    placeholderText: string
    position: string
  }
}

// OpenAI APIキーの確認（環境変数から取得）
const openaiApiKey = process.env.OPENAI_API_KEY

export async function POST(request: NextRequest) {
  try {
    const { message, storeId } = await request.json()
    console.log('Received request:', { message, storeId })

    // store-config.jsonからストアデータを取得
    const storeData = storeConfig.stores[storeId as keyof typeof storeConfig.stores] || storeConfig.stores['demo']
    console.log('Store data found:', !!storeData)

    // OpenAI APIが設定されている場合
    if (openaiApiKey) {
      console.log('Using OpenAI API')
      const openai = new OpenAI({
        apiKey: openaiApiKey,
      })

      // システムプロンプトの作成（全ての店舗情報を反映）
      const systemPrompt = `
あなたは${storeData.customSettings.chatbotName}です。${storeData.description}の専属アシスタントとして対応してください。

【基本情報】
- 店舗名: ${storeData.name}
- 営業時間: ${storeData.businessInfo.businessHours}
- 住所: ${storeData.businessInfo.address}
- 電話番号: ${storeData.businessInfo.phone}
- メール: ${storeData.businessInfo.email}

【提供サービス】
${storeData.services.map((service, index) => `${index + 1}. ${service}`).join('\n')}

【よくある質問と回答】
${storeData.faq.map((item, index) => `
質問${index + 1}: ${item.question}
回答: ${item.answer}
`).join('\n')}

【対応ガイドライン】
1. 上記の情報を基に、顧客のお問い合わせに対して約200文字以内で正確に回答してください
2. 親切で温かみのある対応を心がけてください
3. 不明な点は、電話またはメールのうち非公開でない方で問い合わせをするように案内してください。例:「詳細は電話(03-1234-5678)でお問い合わせください」
4. ${storeData.customSettings.welcomeMessage}のトーンを維持してください
`

      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        model: 'gpt-5-nano-2025-08-07',
        temperature: 1.0,
        max_completion_tokens: 2000,
      })

      // OpenAIからの応答全体を詳細にログ出力
      const firstChoice = completion.choices[0];
      console.log('OpenAI completion choice:', JSON.stringify(firstChoice, null, 2));

      const responseContent = firstChoice?.message?.content;

      return NextResponse.json({
        response: responseContent || '', // nullの場合も空文字を返す
        storeId: storeId
      })
    } else {
      console.log('Using fallback response (no OpenAI API key)')
      // OpenAI APIキーがない場合のフォールバック応答
      let response = `${storeData.customSettings.chatbotName}です。お問い合わせありがとうございます。`

      // キーワードベースの簡単な応答
      const lowerMessage = message.toLowerCase()
      
      if (lowerMessage.includes('営業時間') || lowerMessage.includes('何時')) {
        response = `${storeData.name}の営業時間は「${storeData.businessInfo.businessHours}」です。`
      } else if (lowerMessage.includes('住所') || lowerMessage.includes('場所')) {
        response = `${storeData.name}の住所は「${storeData.businessInfo.address}」です。`
      } else if (lowerMessage.includes('電話') || lowerMessage.includes('連絡')) {
        response = `お電話でのお問い合わせは「${storeData.businessInfo.phone}」まで。メールは「${storeData.businessInfo.email}」です。`
      } else if (lowerMessage.includes('サービス') || lowerMessage.includes('メニュー')) {
        response = `${storeData.name}では以下のサービスを提供しております:\n${storeData.services.map(s => `・${s}`).join('\n')}`
      } else if (lowerMessage.includes('予約')) {
        const faqItem = storeData.faq.find(item => item.question.includes('予約'))
        response = faqItem ? faqItem.answer : `お電話（${storeData.businessInfo.phone}）またはWebサイトからご予約を承っております。`
      } else {
        // FAQから関連する回答を探す
        const relevantFaq = storeData.faq.find(item => {
          const keywords = item.question.toLowerCase().split(/[、。？]/);
          return keywords.some(keyword => keyword.length > 2 && lowerMessage.includes(keyword));
        })
        
        if (relevantFaq) {
          response = relevantFaq.answer
        } else {
          response = `${storeData.name}へのお問い合わせありがとうございます。\n\n【基本情報】\n・営業時間: ${storeData.businessInfo.businessHours}\n・住所: ${storeData.businessInfo.address}\n・電話: ${storeData.businessInfo.phone}\n\n詳しくはお気軽にお問い合わせください。`
        }
      }

      return NextResponse.json({
        response: response,
        storeId: storeId
      })
    }
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'メッセージの処理中にエラーが発生しました。' },
      { status: 500 }
    )
  }
}

// CORS対応のためのOPTIONSメソッド
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
