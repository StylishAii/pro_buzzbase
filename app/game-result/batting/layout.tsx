import { Metadata } from "next";
export const metadata: Metadata = {
  title: "打撃成績を記録",
  description:
    "この試合の打撃成績を記録することができます。1打席ごとの打席結果や打点・得点・失策・盗塁・盗塁死などを簡単に記録することができます。",
};

export default function BattingLayout({
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
