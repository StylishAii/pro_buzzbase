import Header from "@app/components/header/Header";
import HeaderSave from "@app/components/header/HeaderSave";

export default function MyPageLayout({
  children,
  pageType,
}: {
  children: React.ReactNode;
  pageType: "mypage" | "edit";
}) {
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
