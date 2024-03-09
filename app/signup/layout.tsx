import { Metadata } from "next";
export const metadata: Metadata = {
  title: "新規会員登録",
  description: "「BUZZ BASE」のに登録して、野球の打率や打点などの打撃成績や投球回数や奪三振数などの投手成績を記録して、友達とグループを作って成績をランキング形式で共有しよう！",
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
