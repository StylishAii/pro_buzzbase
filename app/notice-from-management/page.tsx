import { Metadata } from "next";
export const metadata: Metadata = {
  title: "運営からのお知らせ",
  description: "運営より、新機能追加・不具合などのお知らせを記載しています。",
};

import Header from "@app/components/header/Header";
import NoticeItems from "@app/notice-from-management/notice-item";

export default function NoticeFromManagement() {
  const notices = [
    {
      href: "/notice-from-management/notice-2024-03-12",
      date: "2024.03.11",
      title: "ユーザーID未設定による不具合",
    },
  ];

  return (
    <>
      <div className="buzz-dark flex flex-col w-full min-h-screen bg-main">
        <div className="h-full bg-main">
          <Header />
          <main className="h-full pb-16 w-full  max-w-[720px] mx-auto lg:m-[0_auto_0_28%]">
            <div className="px-4 pt-20 lg:border-x-1 lg:border-b-1 lg:border-zinc-500 lg:px-6 lg:pb-6">
              <h2 className="text-2xl font-bold">運営からのお知らせ</h2>
              <NoticeItems notices={notices} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
