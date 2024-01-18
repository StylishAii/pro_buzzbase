import { PlusIcon } from "@app/components/icon/PlusIcon";
import { Button } from "@nextui-org/react";

export default function PlusButton({
  className,
  type,
  onClick,
}: PlusButtonProps) {
  return (
    <>
      <Button
        isIconOnly
        className={`${className} p-0 h-auto w-auto min-w-max block`}
        type={type}
        onClick={onClick}
      >
        <PlusIcon width="24" height="24" fill="#C4841D" />
      </Button>
    </>
  );
}
