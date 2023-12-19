"use client";

import EmailInput from "@app/components/auth/EmailInput";
import PasswordConfirmInput from "@app/components/auth/PasswordConfirmInput";
import PasswordInput from "@app/components/auth/PasswordInput";
import { DangerIcon } from "@app/components/icon/DangerIcon";
import { useAuthContext } from "@app/contexts/useAuthContext";
import { singUp } from "@app/services/authService";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const { setIsLoggedIn } = useAuthContext();
  const router = useRouter();

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

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
      await singUp({ email, password, passwordConfirmation });
      setIsLoggedIn(true);
      router.push("/registration-confirmation");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorsWithTimeout(error.response.data.errors.full_messages);
      } else {
        setErrorsWithTimeout(["登録に失敗しました"]);
      }
    }
  };

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const validatePassword = (passwordValue: string) =>
    /^[a-zA-Z\d]{6,}$/.test(passwordValue);

  const isInvalidPassword = React.useMemo(() => {
    if (password === "") return false;
    return validatePassword(password) ? false : true;
  }, [password]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-end gap-y-4"
      >
        {errors.length > 0 ? (
          <ul className="w-10/12 fixed top-8 left-1/2 -translate-x-1/2 bg-danger-300 p-4 rounded-xl flex flex-col justify-center gap-y-1.5 z-10">
            {errors.map((error, index) => (
              <li key={index} className="text-xs flex items-center gap-x-2">
                <DangerIcon
                  fill="#fff"
                  filled="#fff"
                  height="16"
                  width="16"
                  label=""
                />
                {error}
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
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
        <PasswordConfirmInput
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="caret-zinc-400"
          label="パスワード（確認用）"
          placeholder="パスワード再入力"
          labelPlacement="outside"
          isInvalid={isInvalid}
          isConfirmVisible={isConfirmVisible}
          toggleConfirmVisibility={toggleConfirmVisibility}
          type={isConfirmVisible ? "text" : "password"}
        />
        <Button
          className="bg-yellow-500 text-white text-base mt-8 mx-auto px-14 rounded-full block font-semibold"
          type="submit"
        >
          登録する
        </Button>
      </form>
    </>
  );
}
