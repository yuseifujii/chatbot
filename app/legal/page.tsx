"use client"

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getFormattedPrices } from '@/lib/pricing-config';

export default function LegalPage() {
  const prices = getFormattedPrices();
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">特定商取引法に基づく表記</h1>
        
        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <p className="text-gray-700 mb-0">
              特定商取引法第11条（通信販売）に基づく表記
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-8">
            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">販売業者</h2>
              <p className="text-gray-700 leading-relaxed">
                合同会社ToreMock（トレモック）
              </p>
            </section>

            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">運営統括責任者</h2>
              <p className="text-gray-700 leading-relaxed">
                代表社員CEO 藤井 佑成
              </p>
            </section>

            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">所在地</h2>
              <p className="text-gray-700 leading-relaxed">
                千葉県船橋市薬園台六丁目八番二号
              </p>
            </section>

            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">電話番号</h2>
              <p className="text-gray-700 leading-relaxed">
                法令に基づき開示請求があった場合に遅滞なく開示いたします。<br />
                お問い合わせはメールアドレスまでお願いいたします。
              </p>
            </section>

            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">メールアドレス</h2>
              <p className="text-gray-700 leading-relaxed">
                info@toremock.com
              </p>
            </section>

            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">ホームページURL</h2>
              <p className="text-gray-700 leading-relaxed">
                https://toremock.com/info/ja
              </p>
            </section>

            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">販売価格</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p><strong>導入初期費用：</strong>{prices.initialFee.taxIncluded}</p>
                <p><strong>サービス維持費：</strong>{prices.maintenanceFee.taxIncluded}</p>
                <p><strong>導入サポート・追加変更：</strong>{prices.supportFee.amount}</p>
                <p className="text-sm text-gray-600 mt-4">
                  ※ 価格は予告なく変更される場合がございます。<br />
                  ※ 最新の価格はお申し込み時にご確認ください。
                </p>
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">商品代金以外の必要料金</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>・決済手数料：お客様のご利用される決済方法により異なります</p>
                <p>・通信費：お客様負担</p>
                <p>・その他追加費用は発生いたしません</p>
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">支払方法</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>Stripe決済サービスによる以下の方法：</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>クレジットカード決済（Visa、Mastercard、American Express、JCB、Diners Club、Discover）</li>
                  <li>デビットカード決済</li>
                  <li>その他Stripeがサポートする決済方法</li>
                </ul>
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">支払時期</h2>
              <div className="text-gray-700 leading-relaxed">
                <p><strong>導入初期費用：</strong>お申し込み時に即時決済</p>
                <p><strong>サービス維持費：</strong>初回は導入初期費用と同時決済、2年目以降は毎年自動更新</p>
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">商品の引渡時期</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>お申し込み・お支払い完了後、2営業日～5営業日以内にカスタムAIチャットボットを開発・納品いたします。</p>
                <p className="text-sm text-gray-600 mt-2">
                  ※ お客様のご要望内容や繁忙期により、納期が延長される場合がございます。<br />
                  ※ 具体的な納期はお申し込み後にご連絡いたします。
                </p>
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">返品・交換・キャンセル</h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="font-semibold text-red-600 mb-3">原則として返品・返金・キャンセルはお受けできません。</p>
                <p>本サービスは、お客様のご要望に基づいてカスタム開発を行うデジタルコンテンツのため、以下の理由により返品・返金は承っておりません：</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>商品の性質上、返品が困難であること</li>
                  <li>お客様専用にカスタム開発されるサービスであること</li>
                  <li>デジタルコンテンツの特性上、使用開始後の返品が不可能であること</li>
                </ul>
                <p className="mt-4 text-sm">
                  ただし、当社の責に帰すべき事由により、契約内容と著しく異なるサービスが提供された場合に限り、個別に対応を検討いたします。
                </p>
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">サービス提供期間</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>サービス維持費のお支払いが継続されている限り、サービスを提供いたします。</p>
                <p className="text-sm text-gray-600 mt-2">
                  ※ サービス維持費の更新を停止された場合、チャットボットの稼働を停止いたします。<br />
                  ※ サービス停止前には事前にご連絡いたします。
                </p>
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">瑕疵担保責任</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>提供するサービスに瑕疵があった場合、当社の責任において修正・改善を行います。</p>
                <p className="text-sm text-gray-600 mt-2">
                  ※ お客様の都合による仕様変更は、別途料金が発生する場合があります。
                </p>
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">表示について</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>このWebサイトに掲載されている情報の正確性について万全を期しておりますが、サイトの運営者は利用者が当サイトの情報を用いて行う一切の行為について責任を負うものではありません。</p>
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">個人情報について</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>お客様からお預かりした個人情報は、商品の発送業務、お客様からのお問い合わせ対応以外の目的では使用いたしません。個人情報の取り扱いについては、「プライバシーポリシー」をご確認ください。</p>
              </div>
            </section>
          </div>

          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">お問い合わせ</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                特定商取引法に関するお問い合わせは、下記までご連絡ください：<br /><br />
                <strong>合同会社ToreMock</strong><br />
                メールアドレス：info@toremock.com<br />
                受付時間：平日 9:00-18:00<br />
                （土日祝日・年末年始を除く）
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
