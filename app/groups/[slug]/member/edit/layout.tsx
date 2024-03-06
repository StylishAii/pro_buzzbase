import { Metadata } from "next";
export const metadata: Metadata = {
  title: "メンバー一覧",
  description:
    "現在のグループに参加しているユーザーの一覧になります。ユーザーのチェックを外して「メンバー退会」ボタンをクリックすることで、そのユーザーをグループから退会させることができます。",
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
