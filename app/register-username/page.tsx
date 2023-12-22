"use client";
import ToastSuccess from "@app/components/toast/ToastSuccess";
import UserNameInput from "@app/components/user/UserNameInput";
import { useAuthContext } from "@app/contexts/useAuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function RegisterUserName() {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      // router.push("/signin");
    } else {
      setSuccessToastWithTimeout();
    }
  }, [isLoggedIn, router]);

  const setSuccessToastWithTimeout = () => {
    setIsLoginSuccess(true);
    const timeout = setTimeout(() => {
      setIsLoginSuccess(false);
    }, 5000);
    return () => clearTimeout(timeout);
  };

  const validateUserName = (userName: string) =>
    /^[0-9A-Za-z\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF]+$/.test(
      userName
    );

  const isInvalid = useMemo(() => {
    if (userName === "") return false;
    return validateUserName(userName) ? false : true;
  }, [userName]);

  return (
    <>
      {isLoginSuccess && <ToastSuccess text="ログイン成功！" />}
      <div className="px-4 w-full h-full flex flex-col items-center justify-center">
        <p className="text-base leading-7">
          ご登録ありがとうございます！<br></br>
          <span className="text-lg font-bold">ユーザー名</span>と
          <span className="text-lg font-bold">ユーザーID</span>
          を登録して、BuzzBaseをはじめましょう！
        </p>
        <div className="mt-20 w-full">
          <form>
            <UserNameInput
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="caret-zinc-400"
              type="text"
              label="ユーザー名"
              placeholder="山田 太郎（ニックネーム可）"
              labelPlacement="outside"
              isInvalid={isInvalid}
              color={isInvalid ? "warning" : "default"}
              variant={"bordered"}
              errorMessage={
                isInvalid ? "有効なユーザー名を入力してください" : ""
              }
            />
          </form>
        </div>
      </div>
    </>
  );
}
