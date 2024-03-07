import HeaderLogo from "@app/components/header/HeaderLogo";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "ユーザー名・ユーザーID登録",
  description: "ここでは、ユーザー名とユーザーIDの登録をお願いします。",
  robots: {
    index: false,
  },
};

export default function RegisterUsernameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderLogo />
      <div className="h-full buzz-dark">
        <main className="h-full">{children}</main>
      </div>
    </>
  );
}
