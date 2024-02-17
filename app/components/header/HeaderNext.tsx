"use client";
import { Link, Button } from "@nextui-org/react";
import { NextArrowIcon } from "@app/components/icon/NextArrowIcon";
import Image from "next/image";

export default function HeaderNext({ onMatchResultSave }: HeaderNextProps) {
  return (
    <>
      <header className="py-2 px-3 border-b border-b-zinc-500 fixed top-0 w-full bg-main z-50">
        <div className="flex items-center justify-between h-full max-w-[692px] mx-auto">
        <Link href="/">
            <Image
              src="/images/buzz-logo-v2.png"
              width="120"
              height="50"
              alt="BUZZ BASE"
            />
          </Link>
          <div className="flex items-center gap-x-4">
            <Button
              color="primary"
              variant="solid"
              size="sm"
              radius="full"
              endContent={
                <NextArrowIcon width="16" height="16" stroke="#F4F4F4" />
              }
              onClick={onMatchResultSave}
            >
              次へ
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
