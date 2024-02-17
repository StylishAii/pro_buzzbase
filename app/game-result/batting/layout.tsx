import { Metadata } from "next";
export const metadata: Metadata = {
  title: "打撃成績を記録",
};

export default function BattingLayout({
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
