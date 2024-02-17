import { Metadata } from "next";
export const metadata: Metadata = {
  title: "投手成績を記録",
};

export default function PitchingLayout({
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
