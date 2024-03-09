import { Metadata } from "next";
export const metadata: Metadata = {
  title: "試合一覧",
  description:
    "あなたの今までの試合成績一覧を見ることができます。シーズン・公式戦・オープン戦で絞り込み検索を行うことも可能です。",
};

export default function GameResultsListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="buzz-dark bg-main flex flex-col w-full min-h-screen">
        {children}
      </div>
    </>
  );
}
