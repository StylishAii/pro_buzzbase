import React from "react";
import { Link, Button } from "@nextui-org/react";
import { UserIcon } from "@app/components/icon/UserIcon";

export default function Header() {
  return (
    <>
      <header className="py-2 px-3 border-b border-b-zinc-500">
        <div className="flex items-center justify-between h-full">
          <a href="">LOGO</a>
          <div className="flex items-center gap-x-4">
            <Link href="" className="text-sm text-white">ログイン</Link>
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
              className="gap-x-1 bg-yellow-500 text-white text-sm py-1.5 px-3 h-auto rounded-lg"
            >
              新規登録
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
