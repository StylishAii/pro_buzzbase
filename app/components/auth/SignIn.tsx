"use client";
import EmailInput from "@app/components/auth/EmailInput";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import PasswordInput from "@app/components/auth/PasswordInput";
import SubmitButton from "@app/components/button/SendButton";
import { useAuthContext } from "@app/contexts/useAuthContext";
import { signIn } from "@app/services/authService";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const { setIsLoggedIn } = useAuthContext();
  const router = useRouter();

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const setErrorsWithTimeout = (newErrors: React.SetStateAction<string[]>) => {
    setErrors(newErrors);
    setTimeout(() => {
      setErrors([]);
    }, 5000);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors([]);
    try {
      await signIn({ email, password });
      setIsLoggedIn(true);
      router.push("/register-username");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorsWithTimeout(error.response.data.errors);
      } else {
        setErrorsWithTimeout(["ログインに失敗しました"]);
      }
    }
  };

  const validateEmail = (email: string) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const validatePassword = (password: string) =>
    /^[a-zA-Z\d]{6,}$/.test(password);

  const isInvalidPassword = useMemo(() => {
    if (password === "") return false;
    return validatePassword(password) ? false : true;
  }, [password]);

  const isFormValid = useMemo(() => {
    return (
      email !== "" &&
      password !== "" &&
      validateEmail(email) &&
      validatePassword(password)
    );
  }, [email, password, validateEmail, validatePassword]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-end gap-y-4"
      >
        <ErrorMessages errors={errors} />
        <EmailInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="caret-zinc-400"
          type="email"
          label="メールアドレス"
          placeholder="buzzbase@example.com"
          labelPlacement="outside"
          isInvalid={isInvalid}
          color={isInvalid ? "danger" : "default"}
          variant={"bordered"}
          errorMessage={
            isInvalid ? "有効なメールアドレスを入力してください" : ""
          }
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="caret-zinc-400"
          label="パスワード"
          placeholder="6文字以上半角英数字のみ"
          labelPlacement="outside"
          isInvalid={isInvalidPassword}
          isPasswordVisible={isPasswordVisible}
          togglePasswordVisibility={togglePasswordVisibility}
          color={isInvalidPassword ? "danger" : "default"}
          variant={"bordered"}
          errorMessage={
            isInvalidPassword ? "6文字以上で半角英数字のみ有効です" : ""
          }
          type={isPasswordVisible ? "text" : "password"}
        />
        <SubmitButton
          className="bg-yellow-500 text-white h-auto text-base mt-6 mx-auto py-2 px-14 rounded-full block font-semibold"
          type="submit"
          text="ログインする"
          disabled={!isFormValid}
        />
      </form>
    </>
  );
}
