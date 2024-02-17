import { Metadata } from "next";
export const metadata: Metadata = {
  title: "試合結果まとめ",
};
export default function SummaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="buzz-dark bg-main flex flex-col w-full min-h-screen">{children}</div>
    </>
  );
}
