import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useAuthContext } from "@app/contexts/useAuthContext";

const EmailConfirmation = () => {
  const router = useRouter();
  const { confirmationMessage, confirmationError, confirmAccount } =
    useAuthContext();
  const searchParams = useSearchParams();
  const confirmationToken = searchParams.get("confirmation_token");

  useEffect(() => {
    if (confirmationToken) {
      confirmAccount(confirmationToken);
    }
  }, [confirmationToken, confirmAccount]);

  useEffect(() => {
    if (confirmationMessage) {
      router.push("/signin");
    }
  }, [confirmationMessage, router]);

  return (
    <div>
      {confirmationError && <p>エラーが発生しました: {confirmationError}</p>}
      {!confirmationMessage && <p>アカウントを確認しています...</p>}
    </div>
  );
};

export default EmailConfirmation;
