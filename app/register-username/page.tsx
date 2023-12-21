"use client";
import ToastSuccess from "@app/components/toast/ToastSuccess";
import { useAuthContext } from "@app/contexts/useAuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterUserName() {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/signin");
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

  return (
    <>
      {isLoginSuccess && <ToastSuccess text="ログイン成功！" />}
      <p className="pt-20">ユーザー名登録</p>
    </>
  );
}
