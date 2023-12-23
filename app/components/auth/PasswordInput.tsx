import { EyeFilledIcon } from "@app/components/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@app/components/icon/EyeSlashFilledIcon";
import { Input } from "@nextui-org/react";

export default function PasswordInput({
  value,
  onChange,
  className,
  label,
  placeholder,
  labelPlacement,
  isInvalid,
  color = "default",
  errorMessage,
  type = "password",
  isPasswordVisible,
  togglePasswordVisibility,
  variant,
}: PasswordInputProps) {
  return (
    <Input
      value={value}
      onChange={onChange}
      className={className}
      label={label}
      placeholder={placeholder}
      labelPlacement={labelPlacement}
      isInvalid={isInvalid}
      color={isInvalid ? "danger" : color}
      errorMessage={isInvalid && errorMessage}
      type={isPasswordVisible ? "text" : type}
      variant={variant}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <EyeSlashFilledIcon
              aria-hidden={true}
              fill="#71717A"
              focusable={false}
              height="1em"
              role="presentation"
              viewBox="0 0 24 24"
              width="1em"
              className="text-2xl text-default-400 pointer-events-none"
            />
          ) : (
            <EyeFilledIcon
              aria-hidden={true}
              fill="#71717A"
              focusable={false}
              height="1em"
              role="presentation"
              viewBox="0 0 24 24"
              width="1em"
              className="text-2xl text-default-400 pointer-events-none"
            />
          )}
        </button>
      }
    />
  );
}
