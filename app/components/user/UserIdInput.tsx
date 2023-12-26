import { AtMarkIcon } from "@app/components/icon/AtMarkIcon";
import { Input } from "@nextui-org/react";

export default function UserIdInput({
  value,
  onChange,
  className,
  type = "text",
  label,
  placeholder,
  labelPlacement,
  isInvalid,
  color = "default",
  errorMessage,
  variant,
}: UserIdInputProps) {
  return (
    <>
      <Input
        value={value}
        onChange={onChange}
        className={className}
        type={type}
        label={label}
        placeholder={placeholder}
        labelPlacement={labelPlacement}
        isInvalid={isInvalid}
        color={isInvalid ? "danger" : color}
        errorMessage={isInvalid && errorMessage}
        variant={variant}
        startContent={
          <AtMarkIcon width="18" height="18" fill="none" stroke="#e08e0a" />
        }
      />
    </>
  );
}
