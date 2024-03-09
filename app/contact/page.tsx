import { Metadata } from "next";
export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "「BUZZ BASE」のお問い合わせページです。不具合の報告・ご意見・ご要望・使い方についてなど、お気軽にお問い合わせください。",
};

import Header from "@app/components/header/Header";

export default function Contact() {
  return (
    <>
      <div className="buzz-dark flex flex-col w-full min-h-screen">
        <div className="h-full bg-main">
          <Header />
          <main className="h-full pb-16">
            <div className="px-4 pt-24">
              <div className="bg-main lg:m-[0_auto_0_6%]">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfbVKEQcaWWG6b5bAL429RVHO3dkCvvhOcuvHhNA3vY3ZKdIg/viewform?embedded=true"
                  className="w-full h-[1000px] bg-main"
                ></iframe>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
