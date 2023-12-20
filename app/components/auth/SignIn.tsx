"use client";
import EmailInput from "@app/components/auth/EmailInput";
import PasswordInput from "@app/components/auth/PasswordInput";
import SubmitButton from "@app/components/button/SendButton";
import { useMemo, useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault;
    try {
    } catch (error) {}
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

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-end gap-y-4"
      >
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
          errorMessage={
            isInvalidPassword ? "6文字以上で半角英数字のみ有効です" : ""
          }
          type={isPasswordVisible ? "text" : "password"}
        />
        <SubmitButton
          className="bg-yellow-500 text-white text-base mt-6 mx-auto px-14 rounded-full block font-semibold"
          type="submit"
          text="ログインする"
        />
      </form>
    </>
  );
}
