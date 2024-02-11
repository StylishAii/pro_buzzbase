"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RecordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  useEffect(() => {
    const savedGameResultId = localStorage.getItem("gameResultId");
    if (
      !(pathname === "/game-result/battings") &&
      !(pathname === "/game-result/record") &&
      savedGameResultId
    ) {
      localStorage.removeItem("gameResultId");
    }
  }, [pathname]);
  return (
    <>
      <div className="buzz-dark bg-main flex flex-col w-full min-h-screen">{children}</div>
    </>
  );
}
