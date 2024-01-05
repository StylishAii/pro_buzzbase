import Header from "@app/components/header/Header";

type MyPageLayoutProps = {
  children?: React.ReactNode;
  pageType: "mypage" | "edit";
};

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
