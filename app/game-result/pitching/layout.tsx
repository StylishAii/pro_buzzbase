import { Metadata } from "next";
export const metadata: Metadata = {
  title: "投手成績を記録",
  description: "この試合の投手成績を記録することができます。勝敗・投球回数・投球数・完投・ホールド・セーブ・失点・自責点・被安打・被本塁打・奪三振・四球・死球などを記録することができます。",
};

export default function PitchingLayout({
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
