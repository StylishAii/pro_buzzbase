interface SignUpData {
  email: string;
  password: string;
  passwordConfirmation: string;
  confirm_success_url: string | undefined;
}

interface SignInData {
  email: string;
  password: string;
}

interface EmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  labelPlacement?: "outside" | "outside-left" | "inside";
  isInvalid: boolean;
  color?:
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
  errorMessage?: string;
  variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
}

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  label?: string;
  placeholder: string;
  labelPlacement?: "outside" | "outside-left" | "inside";
  isInvalid: boolean;
  color?:
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
  errorMessage?: string;
  togglePasswordVisibility: () => void;
  isPasswordVisible: boolean;
  type: string;
  variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
}

interface PasswordConfirmationInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  label?: string;
  placeholder: string;
  labelPlacement?: "outside" | "outside-left" | "inside";
  toggleConfirmVisibility: () => void;
  isConfirmVisible: boolean;
  type: string;
}

interface ErrorMessagesProps {
  errors: string[];
}

interface SendButtonProps {
  className: string;
  type?: "submit" | "button" | "reset" | undefined;
  text: string;
  disabled: boolean;
}

interface ToastSuccessProps {
  text: string;
}

interface UserNameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  labelPlacement?: "outside" | "outside-left" | "inside";
  isInvalid: boolean;
  color?:
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
  errorMessage?: string;
  variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
  isRequired: boolean;
}

interface UserIdInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  labelPlacement?: "outside" | "outside-left" | "inside";
  isInvalid: boolean;
  color?:
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
  errorMessage?: string;
  variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
  isRequired: boolean;
}

interface updateUser {
  name: string;
  user_id: string;
}

interface ResultsSelectBoxProps {
  radius?: "none" | "sm" | "md" | "lg" | "full" | undefined;
  className?: string;
  data: { label: string }[];
  defaultSelectedKeys: string[];
  color?:
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
  ariaLabel: string;
  variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
  labelPlacement?: "outside" | "outside-left" | "inside";
  size?: "sm" | "md" | "lg" | undefined;
}

interface HeaderSaveProps {
  onProfileUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface updateUserPositions {
  userId: string;
  positionIds: number[];
}

interface getUserPositions {
  userId: string;
}
