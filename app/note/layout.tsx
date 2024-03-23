import { Metadata } from "next";
export const metadata: Metadata = {
  title: "野球ノート",
  description:
    "野球ノート機能は、練習や試合で気づいたこと・感じたことをメモすることができる機能です。",
};

export default function CalculationOfGradesLayout({
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
