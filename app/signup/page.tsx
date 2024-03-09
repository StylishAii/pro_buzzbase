import SignUp from "@app/components/auth/SignUp";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <>
      <Image
        src="/images/logo-bg.png"
        alt=""
        width={500}
        height={400}
        className="absolute opacity-[0.03] -left-28 -top-10 lg:left-24 lg:w-[620px]"
      />
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-11/12 px-4 max-w-[720px] mx-auto lg:m-[0_auto_0_28%]">
          <h2 className="text-2xl font-bold mb-8">新規会員登録</h2>
          <SignUp />
        </div>
      </div>
    </>
  );
}
