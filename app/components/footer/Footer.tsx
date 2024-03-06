"use client";
import Logout from "@app/components/auth/Logout";
import { XIcon } from "@app/components/icon/XIcon";
import { useAuthContext } from "@app/contexts/useAuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const { isLoggedIn } = useAuthContext();
  const pathName = usePathname();

  const shouldHideFooter = pathName.includes("/register-username");
  return (
    <>
      {!shouldHideFooter && (
        <footer className="border-t border-t-zinc-500 pt-12 px-4 pb-24 bg-main lg:pb-12 lg:relative lg:z-100 lg:pl-[8%] ">
          <div className="lg:max-w-[1274px] lg:mx-auto lg:flex lg:items-center lg:gap-x-3">
            <div className="max-w-[692px] mx-auto mb-6 lg:mb-0 lg:mx-0 lg:m-[0_0_0_32%] lg:max-w-full">
              <Link href="/">
                <Image
                  src="/images/buzz-logo-v2.png"
                  width="184"
                  height="45"
                  alt="BUZZ BASE"
                  className="block mb-3 lg:mb-0"
                />
              </Link>
            </div>
            <ul className="grid grid-cols-1 gap-y-4 max-w-[692px] mx-auto lg:flex items-baseline lg:gap-x-10 lg:max-w-full">
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
          </div>
        </footer>
      )}
    </>
  );
}
