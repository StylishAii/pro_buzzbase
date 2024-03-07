import { Metadata } from "next";
export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "「BUZZ BASE」のプライバシーポリシーになります。",
};

import Header from "@app/components/header/Header";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <div className="buzz-dark flex flex-col w-full min-h-screen bg-main">
        <div className="h-full bg-main">
          <Header />
          <main className="h-full pb-16 w-full max-w-[720px] mx-auto lg:m-[0_auto_0_28%]">
            <div className="px-4 pt-24 lg:border-x-1 lg:border-b-1 lg:border-zinc-500 lg:px-6 lg:pb-6">
              <h2 className="text-2xl font-bold">プライバシーポリシー</h2>
              <h3 className="text-xl font-bold mt-8">はじめに</h3>
              <p className="text-sm mt-4">BuzzBase（以下、「当社」とします）は、当社が運営するWebサービス（以下、「本サービス」とします）において、お客様のプライバシーを尊重し、お客様から提供される個人情報の保護に努めています。本プライバシーポリシーは、本サービスを利用される際に、当社がどのような情報を収集し、その情報をどのように扱うかについて説明しています。</p>
              <h3 className="text-xl font-bold mt-8">収集する情報</h3>
              <p className="text-sm mt-4">当社は、本サービスの提供、改善、お客様のサポートのために、以下の情報を収集することがあります。<br></br><br></br>
              ・氏名（ニックネームも含む）<br></br>
              ・メールアドレス<br></br>
              ・写真<br></br>
              ・Cookieを用いて生成された識別情報<br></br>
              ・OSが生成するID、端末の種類、端末識別子等のお客様が利用するOSや端末に関する情報<br></br>
              ・当社ウェブサイトの滞在時間、入力履歴、購買履歴等の当社ウェブサイトにおけるお客様の行動履歴<br></br>
              ・当社アプリの起動時間、入力履歴、購買履歴等の当社アプリの利用履歴<br></br>
              </p>
              <h3 className="text-xl font-bold mt-8">利用目的</h3>
              <p className="text-sm mt-4">収集した情報は、以下の目的で利用されます。<br></br><br></br>
              ・本サービスの提供と運営<br></br>
              ・お客様からのお問い合わせへの対応<br></br>
              ・本サービスの改善と開発<br></br>
              ・新サービスの案内や更新情報の提供<br></br>
              ・不正アクセスや不正利用の防止</p>
              <h3 className="text-xl font-bold mt-8">第三者への提供</h3>
              <p className="text-sm mt-4">当社は、法律に基づく場合やお客様の同意がある場合を除き、お客様の個人情報を第三者に提供することはありません。ただし、Google Analyticsのような第三者サービスを利用しており、これらのサービス提供者がデータを収集・分析する場合があります。</p>
              <h3 className="text-xl font-bold mt-8">お問い合わせ</h3>
              <p className="text-sm mt-4">お客様からの個人情報に関するお問い合わせは、以下のメールアドレスまでお願いいたします。<br></br><br></br>
              Email: <Link href="mailto:buzzbase.app@gmail.com">buzzbase.app@gmail.com</Link>
              </p>
              <h3 className="text-xl font-bold mt-8">改訂</h3>
              <p className="text-sm mt-4">本プライバシーポリシーは、法令の変更や本サービスの変更に応じて、必要に応じて改訂されることがあります。改訂された場合は、本サービス上で適切にお知らせします。</p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
