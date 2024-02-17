"use client";
import React, { useEffect, useState } from "react";
import { Link, Button, Badge } from "@nextui-org/react";
import { UserIcon } from "@app/components/icon/UserIcon";
import { useAuthContext } from "@app/contexts/useAuthContext";
import { NotificationIcon } from "@app/components/icon/NotificationIcon";
import { getNotificationCount } from "@app/services/notificationsService";
import Image from "next/image";

type NotificationCount = {
  count: number;
};

export default function HeaderTop() {
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
          <div className="flex items-center gap-x-4 pt-1">
            {isLoggedIn ? (
              <>
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
              </>
            ) : (
              <>
                <Link href="/signin" className="text-sm text-white font-medium">
                  ログイン
                </Link>
                <Button
                  href="/signup"
                  as={Link}
                  startContent={
                    <UserIcon
                      fill="#F4F4F4"
                      filled="#F4F4F4"
                      height="18"
                      width="18"
                      label=""
                    />
                  }
                  className="gap-x-1 bg-yellow-500 text-white text-sm py-1.5 px-3 h-auto rounded-lg font-medium"
                >
                  新規登録
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
