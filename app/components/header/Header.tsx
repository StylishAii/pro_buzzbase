"use client";
import React, { useEffect } from "react";
import { Link, Button, Badge } from "@nextui-org/react";
import { UserIcon } from "@app/components/icon/UserIcon";
import { useAuthContext } from "@app/contexts/useAuthContext";
import { NotificationIcon } from "@app/components/icon/NotificationIcon";

export default function Header() {
  const { isLoggedIn } = useAuthContext();
  useEffect(() => {
    localStorage.removeItem("gameResultId");
  }, []);
  return (
    <>
      <header className="py-2 px-3 border-b border-b-zinc-500 fixed top-0 w-full bg-main z-50">
        <div className="flex items-center justify-between h-full">
          <Link href="/">LOGO</Link>
          <div className="flex items-center gap-x-4">
            {isLoggedIn ? (
              <>
                <Badge
                  color="danger"
                  content={5}
                  isInvisible={false}
                  shape="circle"
                  size="sm"
                  
                >
                  <Link>
                    <NotificationIcon size={20} />
                  </Link>
                </Badge>
              </>
            ) : (
              <>
                <Link href="/signin" className="text-sm text-white">
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
                  className="gap-x-1 bg-yellow-500 text-white text-sm py-1.5 px-3 h-auto rounded-lg font-normal"
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
