import { Metadata } from "next";
export const metadata: Metadata = {
  title: "成績記録",
};

export default function GameResultsListLayout({
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
