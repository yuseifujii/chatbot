import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 md:py-12">
      <div className="container mx-auto px-3 md:px-4">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              ToreMock LLC
            </h3>
            <p className="text-gray-400 text-[13px] md:text-sm">
              最先端のAI技術で、<br />
              ビジネスの成長を支援します
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            <div>
              <h4 className="font-semibold mb-3 md:mb-4">会社情報</h4>
              <ul className="space-y-2 text-gray-400 text-[13px] md:text-sm">
                <li><a href="https://toremock.com/info/ja" className="hover:text-white transition-colors">会社概要</a></li>
                <li><a href="https://toremock.com/privacy" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
                <li><a href="https://toremock.com/terms" className="hover:text-white transition-colors">利用規約</a></li>
                <li><a href="https://toremock.com/legal" className="hover:text-white transition-colors">特定商取引法</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 md:mb-4">お問い合わせ</h4>
              <ul className="space-y-2 text-gray-400 text-[13px] md:text-sm">
                <li>合同会社ToreMock</li>
                <li>info@toremock.com</li>
                <li>千葉県船橋市薬園台六丁目八番二号</li>
                <li>平日 9:00-18:00</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-[13px] md:text-sm">
          <p>&copy; 2025 ToreMock LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
