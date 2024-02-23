"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "@nextui-org/react";
import { useAuthContext } from "@app/contexts/useAuthContext";
import { NotificationIcon } from "@app/components/icon/NotificationIcon";
import { getNotificationCount } from "@app/services/notificationsService";
import Image from "next/image";
import Link from "next/link";
import HeaderLoginAndSignUp from "@app/components/auth/HeaderLoginAndSignUp";
import UserSearch from "@app/components/user/UserSearch";

type NotificationCount = {
  count: number;
};

export default function Header() {
  const [notificationCount, setNotificationCount] =
    useState<NotificationCount | null>(null);
  const { isLoggedIn } = useAuthContext();
  useEffect(() => {
    localStorage.removeItem("gameResultId");
    fetchDate();
  }, []);
  const fetchDate = async () => {
    try {
      if (!isLoggedIn == false) {
        const responseNotificationCount = await getNotificationCount();
        setNotificationCount(responseNotificationCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="py-2 px-3 border-b border-b-zinc-500 fixed top-0 w-full bg-main z-50">
        <div className="flex items-center justify-between h-full max-w-[692px] mx-auto lg:m-[0_auto_0_28%] relative">
          <Link href="/">
            <Image
              src="/images/buzz-logo-v2.png"
              width="120"
              height="30"
              alt="BUZZ BASE"
            />
          </Link>
          <div className="flex items-center gap-x-4 pt-1">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-x-2">
                  <UserSearch />
                  {notificationCount?.count ? (
                    <>
                      <Badge
                        color="danger"
                        content={notificationCount?.count}
                        isInvisible={false}
                        shape="circle"
                        size="sm"
                      >
                        <Link href="/mypage/notifications">
                          <NotificationIcon size={24} />
                        </Link>
                      </Badge>
                    </>
                  ) : (
                    <>
                      <Link href="/mypage/notifications">
                        <NotificationIcon size={24} />
                      </Link>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <HeaderLoginAndSignUp />
                <div className="absolute top-14 right-2">
                  <UserSearch />
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
