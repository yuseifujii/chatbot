"use client"

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getFormattedPrices } from '@/lib/pricing-config';

export default function TermsPage() {
  const prices = getFormattedPrices();
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">利用規約</h1>
        
        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <p className="text-gray-700 mb-0">
              制定日：2025年8月1日<br />
              最終更新日：2025年8月1日
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">第1条（適用）</h2>
            <p className="text-gray-700 leading-relaxed">
              本規約は、合同会社ToreMock（以下「当社」といいます）が提供するAIチャットボット開発・提供サービス（以下「本サービス」といいます）の利用条件を定めるものです。お客様（以下「利用者」といいます）は、本サービスを利用することにより、本規約に同意したものとみなします。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">第2条（サービス内容）</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              本サービスは、以下の内容を提供いたします：
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>利用者の業務内容に特化したカスタムAIチャットボットの開発</li>
              <li>Webサイトへの簡単な導入サポート（1行コード実装）</li>
              <li>チャットボットとお客様の対話履歴の共有</li>
              <li>デザインカスタマイズサービス</li>
              <li>定期的なAI性能アップデート</li>
              <li>導入後のサポート</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">第3条（利用登録）</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>本サービスの利用を希望する方は、当社所定の方法により利用申込を行うものとします。</li>
              <li>当社は、利用申込を行った方（以下「申込者」といいます）が以下の事由に該当する場合には、利用登録を承認しないことがあります：
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>申込者が本規約に違反するおそれがあると認められる場合</li>
                  <li>申込者が反社会的勢力等であるか、または資金提供その他を通じて反社会的勢力等の維持・運営・経営に協力・関与する等反社会的勢力等との何らかの交流・関与を行っていると当社が判断した場合</li>
                  <li>申込にあたり必要な情報の記載が不十分な場合</li>
                  <li>その他、当社が利用登録を相当でないと判断した場合</li>
                </ul>
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">第4条（料金及び支払い）</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>本サービスの料金は、以下の通りです：
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>導入初期費用：{prices.initialFee.taxIncluded}</li>
                  <li>サービス維持費：{prices.maintenanceFee.taxIncluded}</li>
                  <li>導入サポート・追加変更：{prices.supportFee.amount}</li>
                </ul>
              </li>
              <li>料金の支払いは、当社が指定する決済サービス（Stripe）を通じて行うものとします。</li>
              <li>一度お支払いいただいた料金は、原則として返金いたしません。</li>
              <li>当社は、料金を改定する場合があります。改定後の料金は、当社がWebサイト上で通知した時点から適用されます。</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">第5条（禁止事項）</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              利用者は、本サービスの利用にあたり、以下の行為をしてはなりません：
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>当社、他の利用者、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
              <li>当社のサービスの運営を妨害するおそれのある行為</li>
              <li>他の利用者に関する個人情報等を収集または蓄積する行為</li>
              <li>不正アクセスをし、またはこれを試みる行為</li>
              <li>他の利用者に成りすます行為</li>
              <li>当社のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
              <li>公序良俗に反する内容をチャットボットに学習させる行為</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">第6条（本サービスの提供の停止等）</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>当社は、以下のいずれかの事由があると判断した場合、利用者に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします：
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                  <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                  <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                  <li>その他、当社が本サービスの提供が困難と判断した場合</li>
                </ul>
              </li>
              <li>当社は、本サービスの提供の停止または中断により、利用者または第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">第7条（著作権）</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>利用者は、自ら著作権等の必要な知的財産権を有するか、または必要な権利者の許諾を得た内容のみをチャットボットに学習させるものとします。</li>
              <li>利用者がチャットボットに学習させた内容に関する著作権は利用者に帰属します。</li>
              <li>本サービスに関する著作権およびその他の知的財産権は、当社または当社にその利用を許諾した権利者に帰属します。</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">第8条（利用制限および登録抹消）</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>当社は、利用者が以下のいずれかに該当する場合には、事前の通知なく、利用者に対して本サービスの全部もしくは一部の利用を制限し、または利用者としての登録を抹消することができるものとします：
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>本規約のいずれかの条項に違反した場合</li>
                  <li>登録事項に虚偽の事実があることが判明した場合</li>
                  <li>料金等の支払債務の不履行があった場合</li>
                  <li>当社からの連絡に対し、一定期間返答がない場合</li>
                  <li>本サービスについて、最終の利用から一定期間利用がない場合</li>
                  <li>その他、当社が本サービスの利用を適当でないと判断した場合</li>
                </ul>
              </li>
              <li>当社は、本条に基づき当社が行った行為により利用者に生じた損害について、一切の責任を負いません。</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">第9条（保証の否認および免責事項）</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>当社は、本サービスに事実上または法律上の瑕疵がないことを明示的にも黙示的にも保証しておりません。</li>
              <li>当社は、本サービスに起因して利用者に生じたあらゆる損害について、当社の故意または重過失による場合を除き、一切の責任を負いません。ただし、本サービスに関する当社と利用者との間の契約が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。</li>
              <li>前項ただし書に定める場合であっても、当社は、当社の過失（重過失を除きます。）による債務不履行または不法行為により利用者に生じた損害のうち特別な事情から生じた損害については責任を負いません。また、当社の過失（重過失を除きます。）による債務不履行または不法行為により利用者に生じた損害の賠償は、利用者から当該損害が発生した月に受領した利用料の額を上限とします。</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">第10条（サービス内容の変更等）</h2>
            <p className="text-gray-700 leading-relaxed">
              当社は、利用者への事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、利用者はこれに同意するものとします。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">第11条（利用規約の変更）</h2>
            <p className="text-gray-700 leading-relaxed">
              当社は以下の場合には、利用者の個別の同意を要することなく、本規約を変更することができるものとします。変更後の利用規約は、当社ウェブサイトに掲示された時点から効力を生じるものとします。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">第12条（個人情報の取扱い）</h2>
            <p className="text-gray-700 leading-relaxed">
              当社は、本サービスの利用によって取得する個人情報については、当社の「プライバシーポリシー」に従い適切に取り扱うものとします。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">第13条（通知または連絡）</h2>
            <p className="text-gray-700 leading-relaxed">
              利用者と当社との間の通知または連絡は、当社の定める方法によって行うものとします。当社は、利用者から、当社が別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時に利用者へ到達したものとみなします。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">第14条（権利義務の譲渡の禁止）</h2>
            <p className="text-gray-700 leading-relaxed">
              利用者は、当社の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">第15条（準拠法・裁判管轄）</h2>
            <p className="text-gray-700 leading-relaxed">
              本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">お問い合わせ</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                本規約に関するお問い合わせは、下記までご連絡ください：<br /><br />
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
