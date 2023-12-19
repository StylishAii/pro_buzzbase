"use client";

import { DangerIcon } from "@app/components/icon/DangerIcon";
import { EyeFilledIcon } from "@app/components/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@app/components/icon/EyeSlashFilledIcon";
import { MailIcon } from "@app/components/icon/MailIcon";
import { useAuthContext } from "@app/contexts/useAuthContext";
import { singUp } from "@app/services/authService";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

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
      router.push("/");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorsWithTimeout(error.response.data.errors.full_messages);
      } else {
        setErrorsWithTimeout(["登録に失敗しました"]);
      }
    }
  };

  // メールアドレスバリデーション
  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

  const isInvalid = React.useMemo(() => {
    if (value === "") return false;
    return validateEmail(value) ? false : true;
  }, [value]);

  // パスワードバリデーション
  const validatePassword = (passwordValue: string) =>
    /^[a-zA-Z\d]{6,}$/.test(passwordValue);

  const isInvalidPassword = React.useMemo(() => {
    if (passwordValue === "") return false;
    return validatePassword(passwordValue) ? false : true;
  }, [passwordValue]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-end gap-y-4"
      >
        {errors.length > 0 ? (
          <ul className="w-10/12 fixed top-20 left-1/2 -translate-x-1/2 bg-danger-300 p-4 rounded-xl flex flex-col justify-center gap-y-1.5 z-10">
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
        <Input
          onChange={(e) => setEmail(e.target.value)}
          className="caret-zinc-400"
          type="email"
          label="メールアドレス"
          placeholder="buzzbase@example.com"
          labelPlacement="outside"
          isInvalid={isInvalid}
          color={isInvalid ? "danger" : "default"}
          errorMessage={isInvalid && "有効なメールアドレスを入力してください"}
          onValueChange={setValue}
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
        <Input
          onChange={(e) => setPassword(e.target.value)}
          className="caret-zinc-400"
          label="パスワード"
          placeholder="6文字以上半角英数字のみ"
          labelPlacement="outside"
          isInvalid={isInvalidPassword}
          color={isInvalidPassword ? "danger" : "default"}
          errorMessage={
            isInvalidPassword && "6文字以上で半角英数字のみ有効です"
          }
          onValueChange={setPasswordValue}
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
          type={isPasswordVisible ? "text" : "password"}
        />
        <Input
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          label="パスワード（確認用）"
          placeholder="パスワード再入力"
          labelPlacement="outside"
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
          type={isConfirmVisible ? "text" : "password"}
          className="caret-zinc-400"
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
