import { Metadata } from "next";
export const metadata: Metadata = {
  title: "メンバー一覧",
};
interface GroupLayoutProps {
  children: React.ReactNode;
}

const GroupLayout = ({ children }: GroupLayoutProps) => {
  return <>{children}</>;
};

export default GroupLayout;
