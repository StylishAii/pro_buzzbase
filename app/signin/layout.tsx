import { Metadata } from "next";
export const metadata: Metadata = {
  title: "ログイン",
};

import Header from "@app/components/header/Header";

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="h-full buzz-dark flex flex-col w-full min-h-screen">
        <main className="h-full">{children}</main>
      </div>
    </>
  );
}
