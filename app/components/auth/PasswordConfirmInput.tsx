import { EyeFilledIcon } from "@app/components/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@app/components/icon/EyeSlashFilledIcon";
import { Input } from "@nextui-org/react";

export default function PasswordConfirmInput({
  value,
  onChange,
  className,
  label,
  placeholder,
  labelPlacement,
  type = "password",
  isConfirmVisible,
  toggleConfirmVisibility,
  variant,
}: PasswordConfirmationInputProps) {
  return (
    <Input
      value={value}
      onChange={onChange}
      className={className}
      label={label}
      placeholder={placeholder}
      labelPlacement={labelPlacement}
      type={isConfirmVisible ? "text" : type}
      variant={variant}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleConfirmVisibility}
        >
          {isConfirmVisible ? (
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
