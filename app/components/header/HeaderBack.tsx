"use client";
import React, { useEffect } from "react";
import { BackIcon } from "@app/components/icon/BackIcon";

export default function HeaderBack() {
  const handleBackClick = () => {
    window.history.back();
  };
  useEffect(() => {
    localStorage.removeItem("gameResultId");
  }, []);
  return (
    <>
      <header className="py-2 px-3 border-b border-b-zinc-500 fixed top-0 w-full bg-main z-50">
        <div className="flex items-center justify-between h-full max-w-[692px] mx-auto">
          <button onClick={handleBackClick}>
            <BackIcon width="24" height="24" fill="" stroke="white" />
          </button>
        </div>
      </header>
    </>
  );
}
