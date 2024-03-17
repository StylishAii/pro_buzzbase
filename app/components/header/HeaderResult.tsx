import { BackIcon } from "@app/components/icon/BackIcon";

export default function HeaderResult() {
  const handleBackClick = () => {
    window.history.back();
  };
  return (
    <>
      <header className="py-2 px-3 fixed top-0 w-fit bg-transparent z-50 lg:m-[0_auto_0_28%]">
        <div className="max-w-[692px] mx-auto">
          <button onClick={handleBackClick}>
            <BackIcon width="24" height="24" fill="" stroke="white" />
          </button>
        </div>
      </header>
    </>
  );
}
