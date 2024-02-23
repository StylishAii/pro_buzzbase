import { Metadata } from "next";
export const metadata: Metadata = {
  title: "ユーザー検索",
};

import Header from "@app/components/header/Header";

export default function UserSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="buzz-dark flex flex-col w-full min-h-screen">
        <main className="h-full">{children}</main>
      </div>
    </>
  );
}
