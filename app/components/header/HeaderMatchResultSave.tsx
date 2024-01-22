import { BackIcon } from "@app/components/icon/BackIcon";
import { Button } from "@nextui-org/react";

export default function HeaderMatchResultNext({
  onMatchResultNext,
  text,
}: HeaderMatchResultsProps) {
  const handleBackClick = () => {
    window.history.back();
  };
  return (
    <>
      <header className="py-2 px-3 border-b border-b-zinc-500 fixed top-0 w-full bg-main z-50">
        <div className="flex items-center justify-between h-full">
          <button onClick={handleBackClick}>
            <BackIcon width="24" height="24" fill="" stroke="white" />
          </button>
          <Button
            onClick={onMatchResultNext}
            color="primary"
            variant="solid"
            size="sm"
            radius="full"
          >
            {text}
          </Button>
        </div>
      </header>
    </>
  );
}
