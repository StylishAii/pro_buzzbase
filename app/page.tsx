import HeaderTop from "@app/components/header/HeaderTop";
import Top from "@app/components/page/Top";

export default function Home() {
  return (
    <>
      <div className="buzz-dark flex flex-col w-full min-h-screen bg-main pb-36">
        <HeaderTop />
        <Top />
      </div>
    </>
  );
}
