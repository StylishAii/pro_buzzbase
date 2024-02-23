"use client";
import HeaderBack from "@app/components/header/HeaderBack";
import FollowersUser from "@app/components/user/FollowersUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Followers() {
  const [userIdName, setUserIdName] = useState("");
  const pathName = usePathname();

  useEffect(() => {
    const pathParts = pathName.split("/");
    const userIdPart = pathParts[pathParts.length - 2];
    if (userIdPart && userIdPart !== "undefined") {
      setUserIdName(userIdPart);
    }
  }, [pathName]);

  return (
    <>
      <div className="buzz-dark flex flex-col w-full min-h-screen">
        <HeaderBack />
        <div className="h-full bg-main">
          <main className="h-full lg:pb-16">
            <div className="pt-10 grid grid-cols-2 text-center lg:border-x-1 lg:border-x-zinc-500 lg:pt-11 lg:flex lg:justify-around lg:max-w-[720px] lg:m-[0_auto_0_28%]">
              <Link
                href={`/mypage/${userIdName}/following`}
                className="font-bold text-base py-3 border-b-2 border-zinc-600 lg:w-full"
              >
                フォロー中
              </Link>
              <Link
                href={`/mypage/${userIdName}/followers`}
                className="font-bold text-base py-3 border-b-2 border-yellow-500 lg:w-full"
              >
                フォロワー
              </Link>
            </div>
            <FollowersUser />
          </main>
        </div>
      </div>
    </>
  );
}
