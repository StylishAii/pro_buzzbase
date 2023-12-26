interface SignUpData {
  email: string;
  password: string;
  passwordConfirmation: string;
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
}

interface updateUser {
  name: string;
  user_id: string;
}

interface getUserData {
  user_id: string;
}
