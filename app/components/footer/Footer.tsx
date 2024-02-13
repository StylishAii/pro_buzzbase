"use client";
import Logout from "@app/components/auth/Logout";
import { XIcon } from "@app/components/icon/XIcon";
import { useAuthContext } from "@app/contexts/useAuthContext";
import Link from "next/link";

export default function Footer() {
  const { isLoggedIn } = useAuthContext();
  return (
    <>
      <footer className="border-t border-t-zinc-500 pt-12 px-4 pb-24 bg-main lg:pt-18 lg:pb-12">
        <ul className="grid grid-cols-1 gap-y-4 max-w-[692px] mx-auto lg:m-[0_auto_0_30%] lg:flex items-baseline lg:gap-x-10">
          <li>
            {isLoggedIn ? (
              <>
                <Logout />
              </>
            ) : (
              <></>
            )}
          </li>
          <li>
            <Link
              href="https://twitter.com/ippei_111"
              target="_blank"
              className="flex items-baseline text-sm"
            >
              運営者
              <span className="flex items-center gap-x-1 pl-2">
                <XIcon fill="#f4f4f4" width="14" height="14" />
                @ippei_111
              </span>
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-sm">
              お問い合わせ
            </Link>
          </li>
          <li>
            <Link href="/privacypolicy" className="text-sm">
              プライバシーポリシー
            </Link>
          </li>
          <li>
            <Link href="/termsofservice" className="text-sm">
              利用規約
            </Link>
          </li>
        </ul>
      </footer>
    </>
  );
}
