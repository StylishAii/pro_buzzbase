"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@app/contexts/useAuthContext";
import LoadingSpinnerText from "@app/components/spinner/LoadingSpinnerText";
import LoadingSpinner from "@app/components/spinner/LoadingSpinner";

const EmailConfirmationComponent = () => {
  const router = useRouter();
  const { confirmationMessage, confirmationError, confirmAccount } =
    useAuthContext();
  const searchParams = new URLSearchParams(window.location.search);
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
      {confirmationError && (
        <>
          <div className="px-4 pt-14">
            <p className="text-red-500">
              エラーが発生しました: {confirmationError}
            </p>
          </div>
        </>
      )}
      {!confirmationMessage && (
        <LoadingSpinnerText spinnerText="アカウント確認中" />
      )}
    </div>
  );
};

export default function EmailConfirmation() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <EmailConfirmationComponent />
    </Suspense>
  );
}
