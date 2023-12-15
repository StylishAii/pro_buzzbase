import SignUp from "@app/components/auth/SignUp";
import React from "react";

export default function page() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="bg-sub w-11/12 px-6 py-8 rounded-3xl">
        <h2 className="text-xl font-bold mb-4">新規会員登録</h2>
        <SignUp />
      </div>
    </div>
  );
}
