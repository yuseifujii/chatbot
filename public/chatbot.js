/**
 * AI ChatBot Pro - 埋め込みスクリプト
 * 使用方法: <script src="https://chatbot.toremock.com/chatbot.js" data-store-id="YOUR_STORE_ID"></script>
 * 
 * 設定は store-config.json で管理されます。
 * storeId に対応する設定が自動的に適用されます。
 * 
 * 例:
 * - demo: デモ用の設定 (青色テーマ)
 * - ysfj501: 藤井佑成用の設定 (黒色テーマ)
 */

(function() {
  'use strict';

  // 設定の取得
  const script = document.currentScript;
  const storeId = script.getAttribute('data-store-id') || 'demo';
  const apiEndpoint = 'https://chatbot.toremock.com/api/chat';
  const configEndpoint = 'https://chatbot.toremock.com/api/store-config';
  
  // デフォルト設定
  let storeConfig = {
    name: 'AIアシスタント',
    customSettings: {
      primaryColor: '#2563eb',
      chatbotName: 'AIアシスタント',
      welcomeMessage: 'こんにちは！ご質問がございましたら、お気軽にお尋ねください。',
      placeholderText: 'メッセージを入力...',
      position: 'bottom-right',
      bubbleSize: '60'
    }
  };
  
  // スタイルを動的に生成する関数
  function generateStyles() {
    const position = storeConfig.customSettings.position || 'bottom-right';
    const primaryColor = storeConfig.customSettings.primaryColor || '#2563eb';
    const bubbleSize = storeConfig.customSettings.bubbleSize || '60';

    return `
    .chatbot-widget-container {
      position: fixed;
      ${position === 'bottom-left' ? 'left: 20px;' : 'right: 20px;'}
      bottom: 20px;
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    .chatbot-bubble {
      width: ${bubbleSize}px;
      height: ${bubbleSize}px;
      background: linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .chatbot-bubble:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }

    .chatbot-bubble svg {
      width: 28px;
      height: 28px;
      fill: white;
    }

    .chatbot-notification {
      position: absolute;
      top: -5px;
      right: -5px;
      width: 16px;
      height: 16px;
      background: #ef4444;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.2); opacity: 0.7; }
      100% { transform: scale(1); opacity: 1; }
    }

    .chatbot-window {
      position: absolute;
      ${position === 'bottom-left' ? 'left: 0;' : 'right: 0;'}
      bottom: 80px;
      width: 380px;
      height: 600px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      display: none;
      flex-direction: column;
      overflow: hidden;
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .chatbot-window.active {
      display: flex;
    }

    .chatbot-header {
      background: linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%);
      color: white;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .chatbot-header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .chatbot-avatar {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chatbot-title {
      font-weight: 600;
      font-size: 16px;
    }

    .chatbot-status {
      font-size: 12px;
      opacity: 0.9;
    }

    .chatbot-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: background 0.2s;
    }

    .chatbot-close:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .chatbot-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: #f9fafb;
    }

    .chatbot-message {
      margin-bottom: 16px;
      display: flex;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .chatbot-message.user {
      justify-content: flex-end;
    }

    .chatbot-message-content {
      max-width: 70%;
      padding: 12px 16px;
      border-radius: 18px;
      font-size: 14px;
      line-height: 1.4;
    }

    .chatbot-message.bot .chatbot-message-content {
      background: white;
      color: #1f2937;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .chatbot-message.user .chatbot-message-content {
      background: ${primaryColor};
      color: white;
    }

    .chatbot-typing {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 12px 16px;
      background: white;
      border-radius: 18px;
      width: fit-content;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .chatbot-typing span {
      width: 8px;
      height: 8px;
      background: #9ca3af;
      border-radius: 50%;
      animation: typing 1.4s infinite;
    }

    .chatbot-typing span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .chatbot-typing span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-10px); }
    }

    .chatbot-input {
      padding: 16px;
      background: white;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
    }

    .chatbot-input-field {
      flex: 1;
      padding: 10px 16px;
      border: 1px solid #d1d5db;
      border-radius: 24px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }

    .chatbot-input-field:focus {
      border-color: ${primaryColor};
    }

    .chatbot-send-button {
      width: 40px;
      height: 40px;
      background: ${primaryColor};
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, background 0.2s;
    }

    .chatbot-send-button:hover {
      transform: scale(1.05);
    }

    .chatbot-send-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (max-width: 480px) {
      .chatbot-window {
        width: 100vw;
        height: 100vh;
        bottom: 0;
        border-radius: 0;
      }

      .chatbot-bubble {
        width: 56px;
        height: 56px;
      }
    }
  `;
  }

  // HTMLテンプレートを動的に生成する関数
  function generateTemplate() {
    return `
    <div class="chatbot-widget-container">
      <div class="chatbot-bubble" id="chatbot-bubble">
        <svg viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .99 4.29L2 22l5.71-.99A9.95 9.95 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.23 0-2.4-.28-3.44-.78l-.25-.12-2.6.45.45-2.6-.12-.25A7.94 7.94 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
        <div class="chatbot-notification"></div>
      </div>
      
      <div class="chatbot-window" id="chatbot-window">
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <div class="chatbot-avatar">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <div>
              <div class="chatbot-title">${storeConfig.customSettings?.chatbotName || 'AIアシスタント'}</div>
              <div class="chatbot-status">オンライン</div>
            </div>
          </div>
          <button class="chatbot-close" id="chatbot-close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        
        <div class="chatbot-messages" id="chatbot-messages">
          <div class="chatbot-message bot">
            <div class="chatbot-message-content">
              ${storeConfig.customSettings?.welcomeMessage || 'こんにちは！ご質問がございましたら、お気軽にお尋ねください。'}
            </div>
          </div>
        </div>
        
        <div class="chatbot-input">
          <input 
            type="text" 
            class="chatbot-input-field" 
            id="chatbot-input" 
            placeholder="${storeConfig.customSettings?.placeholderText || 'メッセージを入力...'}"
          />
          <button class="chatbot-send-button" id="chatbot-send">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
  }

  // 店舗設定を取得
  async function fetchStoreConfig() {
    try {
      const response = await fetch(`${configEndpoint}?storeId=${storeId}`);
      if (response.ok) {
        const config = await response.json();
        storeConfig = config;
        console.log('Store configuration loaded:', storeConfig.customSettings);
      }
    } catch (error) {
      console.log('Failed to load store configuration, using defaults:', error);
    }
  }

  // DOMの準備完了を待つ
  async function init() {
    // 店舗設定を取得
    await fetchStoreConfig();
    
    // 設定取得後にスタイルを動的生成して挿入
    const styleSheet = document.createElement('style');
    styleSheet.id = 'chatbot-dynamic-styles';
    styleSheet.textContent = generateStyles();
    document.head.appendChild(styleSheet);

    // 設定取得後にHTMLテンプレートを動的生成して挿入
    const container = document.createElement('div');
    container.innerHTML = generateTemplate();
    document.body.appendChild(container.firstElementChild);

    // イベントリスナーの設定
    const bubble = document.getElementById('chatbot-bubble');
    const window = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');
    const messagesContainer = document.getElementById('chatbot-messages');

    // チャットウィンドウの開閉
    bubble.addEventListener('click', () => {
      window.classList.add('active');
      bubble.style.display = 'none';
      input.focus();
    });

    closeBtn.addEventListener('click', () => {
      window.classList.remove('active');
      bubble.style.display = 'flex';
    });

    // メッセージ送信
    async function sendMessage() {
      const message = input.value.trim();
      if (!message) return;

      // ユーザーメッセージを追加
      addMessage(message, 'user');
      input.value = '';
      input.disabled = true;
      sendBtn.disabled = true;

      // タイピングインジケーターを表示
      showTyping();

      try {
        // APIにリクエスト
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: message,
            storeId: storeId
          })
        });

        const data = await response.json();
        
        // タイピングインジケーターを削除
        hideTyping();
        
        // ボットの返答を追加
        addMessage(data.response || 'すみません、エラーが発生しました。', 'bot');
      } catch (error) {
        hideTyping();
        addMessage('接続エラーが発生しました。しばらくしてから再度お試しください。', 'bot');
      } finally {
        input.disabled = false;
        sendBtn.disabled = false;
        input.focus();
      }
    }

    // メッセージを追加
    function addMessage(text, sender) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `chatbot-message ${sender}`;
      
      const contentDiv = document.createElement('div');
      contentDiv.className = 'chatbot-message-content';
      contentDiv.textContent = text;
      
      messageDiv.appendChild(contentDiv);
      messagesContainer.appendChild(messageDiv);
      
      // スクロールを最下部へ
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // タイピングインジケーターを表示
    function showTyping() {
      const typingDiv = document.createElement('div');
      typingDiv.className = 'chatbot-message bot';
      typingDiv.id = 'typing-indicator';
      
      const typingContent = document.createElement('div');
      typingContent.className = 'chatbot-typing';
      typingContent.innerHTML = '<span></span><span></span><span></span>';
      
      typingDiv.appendChild(typingContent);
      messagesContainer.appendChild(typingDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // タイピングインジケーターを削除
    function hideTyping() {
      const typing = document.getElementById('typing-indicator');
      if (typing) {
        typing.remove();
      }
    }

    // イベントリスナー
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // DOMContentLoadedまたは即座に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
