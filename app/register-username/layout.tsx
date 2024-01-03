import HeaderLogo from "@app/components/header/HeaderLogo";

export default function RegisterUsernameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderLogo />
      <div className="h-full buzz-dark">
        <main className="h-full">{children}</main>
      </div>
    </>
  );
}
