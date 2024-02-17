import { Metadata } from "next";
export const metadata: Metadata = {
  title: "みんなの成績",
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
