import { Metadata } from "next";
export const metadata: Metadata = {
  title: "メンバー招待",
  description:
    "現在のグループに追加するユーザーを選択して、招待通知を送信することができます。グループに招待することができるのは、フォローしているユーザーのみになります。",
  robots: {
    index: false,
  },
};
interface GroupLayoutProps {
  children: React.ReactNode;
}

const GroupLayout = ({ children }: GroupLayoutProps) => {
  return <>{children}</>;
};

export default GroupLayout;
