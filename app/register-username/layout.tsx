import HeaderLogo from "@app/components/header/HeaderLogo";

export default function RegisterUsernameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderLogo />
      {children}
    </>
  );
}
