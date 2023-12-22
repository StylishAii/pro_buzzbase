import { Button } from "@nextui-org/react";

export default function SubmitButton({
  className,
  type = "submit",
  text,
  disabled,
}: SendButtonProps) {
  return (
    <>
      <Button
        className={className}
        type={type}
        {...(disabled ? { isDisabled: true } : {})}
      >
        {text}
      </Button>
    </>
  );
}
