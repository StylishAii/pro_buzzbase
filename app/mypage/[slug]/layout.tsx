import Header from "@app/components/header/Header";

interface MyPageLayoutProps {
  children: React.ReactNode;
  pageType: "mypage" | "edit";
}

export default function MyPageLayout({
  children,
  pageType,
}: MyPageLayoutProps) {
  return (
    <>
      {pageType === "mypage" && <Header />}
      {pageType === "edit" && ""}
      <div className="h-full buzz-dark">
        <main className="h-full">{children}</main>
      </div>
    </>
  );
}
