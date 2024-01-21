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
      console.log("削除しました");
    } else {
      console.log("維持しています");
    }
  }, [pathname]);
  return (
    <>
      <div className="buzz-dark bg-main">{children}</div>
    </>
  );
}
