import Header from "@app/components/header/Header";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="h-full buzz-dark">
        <main className="h-full">{children}</main>
      </div>
    </>
  );
}
