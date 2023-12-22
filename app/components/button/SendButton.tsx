import { Button } from "@nextui-org/react";

export default function SubmitButton({
  className,
  type = "submit",
  text,
}: SendButtonProps) {
  return (
    <>
      <Button className={className} type={type}>
        {text}
      </Button>
    </>
  );
}
