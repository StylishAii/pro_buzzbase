import Header from "@app/components/header/Header";
import HeaderNext from "@app/components/header/HeaderNext";

export default function RecordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="buzz-dark bg-main">
        <HeaderNext />
        <div className="h-full buzz-dark">
          <main className="h-full">{children}</main>
        </div>
      </div>
    </>
  );
}
