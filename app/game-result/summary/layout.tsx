import { Metadata } from "next";
export const metadata: Metadata = {
  title: "試合結果まとめ",
  description:
    "この試合についての試合結果・打撃成績・投手成績をまとめて表示します。SNSなどで成績をシェアすることもできます。",
};
export default function SummaryLayout({
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
