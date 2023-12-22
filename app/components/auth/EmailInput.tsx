import { MailIcon } from "@app/components/icon/MailIcon";
import { Input } from "@nextui-org/react";

export default function EmailInput({
  value,
  onChange,
  className,
  type = "email",
  label,
  placeholder,
  labelPlacement,
  isInvalid,
  color = "default",
  errorMessage,
}: EmailInputProps) {
  return (
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
      startContent={
        <MailIcon
          aria-hidden={true}
          fill="#71717A"
          focusable={false}
          height="1em"
          role="presentation"
          viewBox="0 0 24 24"
          width="1em"
          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
        />
      }
    />
  );
}
