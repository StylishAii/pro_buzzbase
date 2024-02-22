"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import HeaderRight from "@app/components/header/HeaderRight";
import Link from "next/link";

export default function HeaderTop() {
  useEffect(() => {
    localStorage.removeItem("gameResultId");
  }, []);

  return (
    <>
      <header className="py-2 px-3 border-b border-b-zinc-500 fixed top-0 w-full bg-main z-50 lg:pl-[22%]">
        <div className="flex items-center justify-between h-full lg:max-w-[1108px] mx-auto lg:mr-auto lg:ml-[14px]">
          <Link href="/">
            <Image
              src="/images/buzz-logo-v2.png"
              width="120"
              height="30"
              alt="BUZZ BASE"
            />
          </Link>
          <HeaderRight />
        </div>
      </header>
    </>
  );
}
