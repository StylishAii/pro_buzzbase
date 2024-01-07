import SignUp from "@app/components/auth/SignUp";
import React from "react";

export default function Page() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-11/12 px-4">
        <h2 className="text-2xl font-bold mb-8">新規会員登録</h2>
        <SignUp />
      </div>
    </div>
  );
}
