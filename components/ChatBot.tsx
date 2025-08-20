"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface StoreConfig {
  customSettings: {
    primaryColor: string
    chatbotName: string
    welcomeMessage: string
    placeholderText: string
  }
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [storeConfig, setStoreConfig] = useState<StoreConfig>({
    customSettings: {
      primaryColor: '#2563eb',
      chatbotName: 'AI アシスタント',
      welcomeMessage: 'こんにちは！ToreMock ChatBotです。お気軽にご質問ください。',
      placeholderText: 'メッセージを入力...'
    }
  })
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // 店舗設定を取得
    const fetchStoreConfig = async () => {
      try {
        const response = await fetch('/api/store-config?storeId=demo')
        if (response.ok) {
          const config = await response.json()
          setStoreConfig(config)
          // 初期メッセージを設定
          setMessages([{
            id: '1',
            text: config.customSettings.welcomeMessage || 'こんにちは！お気軽にご質問ください。',
            sender: 'bot',
            timestamp: new Date()
          }])
        }
      } catch (error) {
        console.log('Using default configuration')
        // デフォルトの初期メッセージを設定
        setMessages([{
          id: '1',
          text: storeConfig.customSettings.welcomeMessage,
          sender: 'bot',
          timestamp: new Date()
        }])
      }
    }

    fetchStoreConfig()

    const handleOpenChat = () => setIsOpen(true);
    const handleColorChange = (event: CustomEvent) => {
      const newColor = event.detail.color;
      setStoreConfig(prev => ({
        ...prev,
        customSettings: {
          ...prev.customSettings,
          primaryColor: newColor
        }
      }));
    };

    window.addEventListener('open-chatbot', handleOpenChat);
    window.addEventListener('chatbot-color-change', handleColorChange as EventListener);
    
    return () => {
      window.removeEventListener('open-chatbot', handleOpenChat);
      window.removeEventListener('chatbot-color-change', handleColorChange as EventListener);
    };
  }, []);

  const handleSend = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // API呼び出し
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: inputText,
          storeId: 'demo' // デモ用のストアID
        })
      })

      console.log('API Response Status:', response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('API Response Data:', data)
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || data.error || 'エラーが発生しました。',
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Chat API Error:', error)
      // エラー時のフォールバック
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'デモモードです。実際の導入時には、貴社の情報に基づいた適切な回答を提供します。\n\n【対応可能な質問例】\n・営業時間について\n・商品・サービスの詳細\n・予約方法\n・よくある質問への回答\n\nぜひ導入をご検討ください！',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* チャットボタン */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300"
            style={{ 
              background: `linear-gradient(to right, ${storeConfig.customSettings.primaryColor}, ${storeConfig.customSettings.primaryColor}dd)` 
            }}
          >
            <MessageCircle size={28} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* チャットウィンドウ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxWidth: 'calc(100vw - 48px)', maxHeight: 'calc(100vh - 48px)' }}
          >
            {/* ヘッダー */}
            <div 
              className="text-white p-4 flex items-center justify-between"
              style={{ 
                background: `linear-gradient(to right, ${storeConfig.customSettings.primaryColor}, ${storeConfig.customSettings.primaryColor}dd)` 
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold">{storeConfig.customSettings.chatbotName}</h3>
                  <p className="text-xs opacity-90">オンライン</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* メッセージエリア */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: message.sender === 'user' ? storeConfig.customSettings.primaryColor : '#d1d5db'
                      }}
                    >
                      {message.sender === 'user' ? (
                        <User size={16} className="text-white" />
                      ) : (
                        <Bot size={16} className="text-gray-700" />
                      )}
                    </div>
                    <div 
                      className={`rounded-2xl px-4 py-2 ${
                        message.sender === 'user' 
                          ? 'text-white' 
                          : 'bg-white text-gray-800 shadow-sm'
                      }`}
                      style={{
                        backgroundColor: message.sender === 'user' ? storeConfig.customSettings.primaryColor : undefined
                      }}
                    >
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString('ja-JP', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-gray-700" />
                  </div>
                  <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* 入力エリア */}
            <div className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={storeConfig.customSettings.placeholderText}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 transition-all"
                  style={{
                    '--tw-ring-color': `${storeConfig.customSettings.primaryColor}33`,
                    borderColor: inputText ? storeConfig.customSettings.primaryColor : '#d1d5db'
                  } as React.CSSProperties}
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={isTyping || !inputText.trim()}
                  className="text-white p-2 rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    background: `linear-gradient(to right, ${storeConfig.customSettings.primaryColor}, ${storeConfig.customSettings.primaryColor}dd)` 
                  }}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
