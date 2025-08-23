"use client"

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">プライバシーポリシー</h1>
        
        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <p className="text-gray-700 mb-0">
              制定日：2025年8月1日<br />
              最終更新日：2025年8月1日
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">1. 基本方針</h2>
            <p className="text-gray-700 leading-relaxed">
              合同会社ToreMock（以下「当社」といいます）は、AIチャットボット開発・提供サービスの運営にあたり、お客様の個人情報保護の重要性を認識し、個人情報の保護に関する法律（個人情報保護法）その他の関係法令等を遵守し、お客様の個人情報を適切に取り扱います。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">2. 個人情報の取得</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              当社は、以下の方法でお客様の個人情報を取得いたします：
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>サービスお申し込み時のフォーム入力</li>
              <li>お問い合わせフォーム</li>
              <li>メールでのやり取り</li>
              <li>チャットボットとの対話履歴</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">3. 取得する個人情報の項目</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>氏名・会社名</li>
              <li>メールアドレス</li>
              <li>電話番号</li>
              <li>Webサイトアドレス</li>
              <li>業種・サービス内容</li>
              <li>チャットボットに学習させたい内容</li>
              <li>決済情報（Stripe経由で処理、当社では保存しません）</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">4. 個人情報の利用目的</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>カスタムAIチャットボットの開発・提供</li>
              <li>お客様への連絡・サポート</li>
              <li>サービスの改善・品質向上</li>
              <li>請求書発行・決済処理</li>
              <li>チャット履歴の共有・分析</li>
              <li>法令に基づく対応</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">5. 個人情報の第三者提供</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              当社は、以下の場合を除き、お客様の同意なく個人情報を第三者に提供することはありません：
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>法令に基づく場合</li>
              <li>生命・身体または財産の保護のために必要がある場合</li>
              <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              なお、決済処理にはStripe Inc.を利用しており、決済に関する情報は同社のプライバシーポリシーに従って処理されます。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">6. 個人情報の保存期間</h2>
            <p className="text-gray-700 leading-relaxed">
              お客様の個人情報は、利用目的を達成するために必要な期間、またはサービス提供終了後5年間保存いたします。チャット履歴については、サービス提供期間中およびサービス終了後1年間保存いたします。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">7. 個人情報の安全管理</h2>
            <p className="text-gray-700 leading-relaxed">
              当社は、お客様の個人情報を適切に管理し、不正アクセス、紛失、破損、改ざん、漏洩などから保護するため、SSL暗号化通信、アクセス制御、定期的なセキュリティ監査などの安全管理措置を講じています。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">8. お客様の権利</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              お客様は、ご自身の個人情報について、以下の権利を有します：
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>開示請求権</li>
              <li>訂正・追加・削除請求権</li>
              <li>利用停止・消去請求権</li>
              <li>第三者提供停止請求権</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              これらの権利を行使される場合は、下記お問い合わせ先までご連絡ください。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">9. Cookieの使用</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトでは、サービス向上のためCookieを使用する場合があります。Cookieは個人を特定するものではなく、ブラウザの設定により無効にすることができます。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">10. プライバシーポリシーの変更</h2>
            <p className="text-gray-700 leading-relaxed">
              当社は、法令の改正やサービス内容の変更に伴い、本プライバシーポリシーを変更する場合があります。変更後のプライバシーポリシーは、本サイトに掲載した時点から効力を生じるものとします。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">11. お問い合わせ</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください：<br /><br />
                <strong>合同会社ToreMock</strong><br />
                メールアドレス：info@toremock.com<br />
                受付時間：平日 9:00-18:00
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
