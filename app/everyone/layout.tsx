import { Metadata } from "next";
export const metadata: Metadata = {
  title: "みんなの成績",
  description: "ユーザー同士の野球の試合結果や打席内容・投球内容などの記録を一覧で見ることができます。",
};

export default function EveryoneLayout({
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
