import { Metadata } from "next";
export const metadata: Metadata = {
  title: "メンバー招待",
};
interface GroupLayoutProps {
  children: React.ReactNode;
}

const GroupLayout = ({ children }: GroupLayoutProps) => {
  return <>{children}</>;
};

export default GroupLayout;
