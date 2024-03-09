import { Metadata } from "next";
export const metadata: Metadata = {
  title: "グループ新規作成",
  description:
    "「BUZZ BASE」のグループ作成機能は、フォローしているユーザーのみ招待できて、グループメンバー同士の打率や打点・勝率や防御率などの個人成績をランキング形式で、比較・共有することができます。違うチームの友達とも個人成績を比較することができます。",
};
interface GroupLayoutProps {
  children: React.ReactNode;
}

const GroupLayout = ({ children }: GroupLayoutProps) => {
  return <>{children}</>;
};

export default GroupLayout;
