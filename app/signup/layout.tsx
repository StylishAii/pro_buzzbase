import { Metadata } from "next";
export const metadata: Metadata = {
  title: "新規会員登録",
};

import Header from "@app/components/header/Header";

export default function SignUpLayout({
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
