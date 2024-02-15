"use client";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import SubmitButton from "@app/components/button/SendButton";
import ToastSuccess from "@app/components/toast/ToastSuccess";
import UserIdInput from "@app/components/user/UserIdInput";
import UserNameInput from "@app/components/user/UserNameInput";
import { useAuthContext } from "@app/contexts/useAuthContext";
import { getUserData, updateUser } from "@app/services/userService";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function RegisterUserName() {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/signin");
    } else if (isLoggedIn === true) {
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

  const validateUserName = useCallback(
    (userName: string) =>
      /^[0-9A-Za-z\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF]+$/.test(
        userName
      ),
    []
  );

  const isInvalid = useMemo(() => {
    if (userName === "") return false;
    return validateUserName(userName) ? false : true;
  }, [userName, validateUserName]);

  const validateUserId = useCallback(
    (userId: string) => /^[A-Za-z0-9_-]+$/.test(userId),
    []
  );

  const isInvalidUserId = useMemo(() => {
    if (userId === "") return false;
    return validateUserId(userId) ? false : true;
  }, [userId, validateUserId]);

  const isFormValid = useMemo(() => {
    return (
      userName !== "" &&
      userId !== "" &&
      validateUserName(userName) &&
      validateUserId(userId)
    );
  }, [userName, userId, validateUserName, validateUserId]);

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
      await updateUser({ name: userName, user_id: userId });
      const userData = await getUserData();
      if (userData && userData.user_id) {
        router.push(`/mypage/${userData.user_id}`);
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorsWithTimeout(error.response.data.errors);
      } else {
        setErrorsWithTimeout(["ユーザー名とユーザーIDを入力してください"]);
      }
    }
  };

  return (
    <>
      {isLoginSuccess && <ToastSuccess text="ログイン成功！" />}
      <div className="px-4 w-full h-full flex flex-col items-center justify-center max-w-[720px] mx-auto lg:m-[0_auto_0_28%]">
        <p className="text-base leading-7">
          ご登録ありがとうございます！<br></br>
          <span className="text-lg font-bold">ユーザー名</span>と
          <span className="text-lg font-bold">ユーザーID</span>
          を登録して、BuzzBaseをはじめましょう！
        </p>
        <div className="mt-12 w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
            <ErrorMessages errors={errors} />
            <UserNameInput
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="caret-zinc-400"
              type="text"
              label="ユーザー名"
              placeholder="大谷 一郎（ニックネーム可）"
              labelPlacement="outside"
              isInvalid={isInvalid}
              color={isInvalid ? "warning" : "default"}
              variant={"bordered"}
              errorMessage={
                isInvalid ? "有効なユーザー名を入力してください" : ""
              }
              isRequired
            />
            <UserIdInput
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="caret-zinc-400"
              type="text"
              label="ユーザーID"
              placeholder="buzz_base235"
              labelPlacement="outside"
              isInvalid={isInvalidUserId}
              color={isInvalid ? "warning" : "default"}
              variant={"bordered"}
              errorMessage={
                isInvalidUserId
                  ? "半角英数字、ハイフン(-)、アンダーバー(_)のみ使用可能です"
                  : ""
              }
              isRequired
            />
            <span className="text-sm text-red-500">
              ※IDは一度決めると変更できません。
            </span>
            <SubmitButton
              className="bg-yellow-500 text-white h-auto text-base mt-6 mx-auto py-2 px-14 rounded-full block font-semibold"
              type="submit"
              text="はじめる"
              disabled={!isFormValid}
            />
          </form>
        </div>
      </div>
    </>
  );
}
