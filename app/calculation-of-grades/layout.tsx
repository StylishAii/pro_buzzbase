import { Metadata } from "next";
export const metadata: Metadata = {
  title: "成績の算出方法",
  description:
    "打撃成績や投手成績の算出方法を確認することができます。",
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
