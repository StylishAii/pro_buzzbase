"use client";
import React, { Suspense, useEffect, useState } from "react";
import SignIn from "@app/components/auth/SignIn";
import ToastSuccess from "@app/components/toast/ToastSuccess";
import { useAuthContext } from "@app/contexts/useAuthContext";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@app/components/spinner/LoadingSpinner";

function SignInComponent() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const logoutParams = searchParams.get("logout");

  const router = useRouter();
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (isLoggedIn === true) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (logoutParams === "success") {
      setSuccessToastWithTimeout();
      setMessage("ログアウトしました");
    }
  }, [logoutParams]);

  const setSuccessToastWithTimeout = () => {
    setLogoutSuccess(true);
    const timeout = setTimeout(() => {
      setLogoutSuccess(false);
    }, 5000);
    return () => clearTimeout(timeout);
  };

  return (
    <>
      {logoutSuccess && <ToastSuccess text={message} />}
      <div className="h-full flex flex-col items-center justify-center px-4">
        <div className="w-11/12 max-w-[720px] mx-auto lg:m-[0_auto_0_28%]">
          <h2 className="text-2xl font-bold mb-9">ログイン</h2>
          <SignIn />
        </div>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SignInComponent />
    </Suspense>
  );
}
