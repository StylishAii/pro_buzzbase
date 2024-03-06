import { Metadata } from "next";
export const metadata: Metadata = {
  title: "グループ情報編集",
  description:
    "現在のグループ名とアイコン画像を編集することができます。",
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
