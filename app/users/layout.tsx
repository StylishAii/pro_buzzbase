import { Metadata } from "next";
export const metadata: Metadata = {
  title: "ユーザー検索",
  description: "「BUZZ BASE」に登録しているユーザーを検索することができます。「BUZZ BASE」は、野球の試合結果や個人の打率や防御率などの個人成績を記録することができ、チーム内外の野球友達とグループを作成することで、個人成績をランキングで共有することができるアプリです。友達と打率や打点数・防御率や奪三振率などの成績をランキングで比較することができます。",
};

import Header from "@app/components/header/Header";

export default function UserSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="buzz-dark flex flex-col w-full min-h-screen">
        <main className="h-full">{children}</main>
      </div>
    </>
  );
}
