import Header from "@app/components/header/Header";
import { ReactNode } from "react";

interface MyPageLayoutProps {
  children: ReactNode;
  pageType: "mypage" | "edit";
}

const MyPageLayout = ({ children, pageType }: MyPageLayoutProps) => {
  return (
    <>
      {pageType === "mypage" && <Header />}
      {pageType === "edit" && ""}
      <div className="h-full buzz-dark">
        <main className="h-full">{children}</main>
      </div>
    </>
  );
};

export default MyPageLayout;
