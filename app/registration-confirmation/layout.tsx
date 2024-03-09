import Header from "@app/components/header/Header";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "ユーザー名・ユーザーID登録",
  description: "ここでは、ユーザー名とユーザーIDの登録をお願いします。",
  robots: {
    index: false,
  },
};

export default function RegistrationConfirmationLayout({
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
