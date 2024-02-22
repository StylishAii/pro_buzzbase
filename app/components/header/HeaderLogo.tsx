"use client";
import React, { useEffect } from "react";
import Image from "next/image";

export default function HeaderLogo() {
  useEffect(() => {
    localStorage.removeItem("gameResultId");
  }, []);
  return (
    <>
      <header className="py-2 px-3 border-b border-b-zinc-500 fixed top-0 w-full bg-main z-50">
        <div className="flex items-center justify-center h-full max-w-[692px] mx-auto lg:m-[0_auto_0_28%]">
          <Image
            src="/images/buzz-logo-v2.png"
            width="120"
            height="30"
            alt="BUZZ BASE"
          />
        </div>
      </header>
    </>
  );
}
