export default function RecordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="buzz-dark bg-main">{children}</div>
    </>
  );
}
