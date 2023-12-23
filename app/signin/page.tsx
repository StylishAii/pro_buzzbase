import SignIn from "@app/components/auth/SignIn";
import React from "react";

export default function Page() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-4">
      <div className="w-11/12">
        <h2 className="text-2xl font-bold mb-9">ログイン</h2>
        <SignIn />
      </div>
    </div>
  );
}
