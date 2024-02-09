import { BackIcon } from "@app/components/icon/BackIcon";
import { Button } from "@nextui-org/react";

export default function HeaderResult() {
  const handleBackClick = () => {
    window.history.back();
  };
  return (
    <>
      <header className="py-2 px-3 fixed top-0 w-fit bg-transparent z-50">
        <div>
          <button onClick={handleBackClick}>
            <BackIcon width="24" height="24" fill="" stroke="white" />
          </button>
        </div>
      </header>
    </>
  );
}
