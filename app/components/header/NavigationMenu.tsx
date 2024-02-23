"use client";
import "@app/globals.css";
import { UserImage } from "@app/components/user/UserImage";
import NavigationItems from "./NavigationItems";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@app/contexts/useAuthContext";
import Image from "next/image";
import Link from "next/link";
import useCurrentUserImageId from "@app/hooks/user/useCurrentUserImageId";
import HeaderUserMenu from "@app/components/header/HeaderUserMenu";

type currentUserData = {
  user_id: string;
  image: any;
  url: string;
};

export default function NavigationMenu() {
  const pathName = usePathname();
  const navigationItems = NavigationItems();

  const isActive = (path: string, itemHref: string) => {
    const activePaths = ["/", "/game-result/lists", "/everyone", "/groups"];
    return path === itemHref && activePaths.includes(path);
  };

  return (
    <>
      <nav className="fixed bottom-0 w-full bg-main pt-2.5 pb-1.5 border-t border-t-zinc-500 z-100 lg:w-56 lg:bottom-0 lg:left-0 lg:top-0 lg:h-full lg:border-t-0 lg:pl-6 lg:pt-16 lg:border-r-1 lg:border-r-zinc-500 lg:z-50">
        <Link href="/" className="hidden lg:block">
          <Image
            src="/images/buzz-logo-v2.png"
            width="164"
            height="40"
            alt="BUZZ BASE"
            className="lg:block lg:mb-8"
          />
        </Link>
        <ul className="flex items-center justify-around max-w-[720px] mx-auto lg:grid-cols-1 lg:ml-0 lg:h-full lg:items-start lg:gap-y-5 lg:flex-col lg:justify-start">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`flex items-center min-w-[50px] flex-col gap-y-1 px-0 bg-transparent overflow-visible fontSize10 font-medium ${
                  isActive(pathName, item.href)
                    ? `text-yellow-500`
                    : `text-white`
                } lg:flex-row lg:text-base lg:w-fit lg:font-bold lg:gap-x-5 [&>svg]:lg:w-6 [&>svg]:lg:h-6 [&>svg]:lg:mr-4`}
              >
                <item.icon
                  fill={isActive(pathName, item.href) ? `#e08e0a` : `#F4F4F4`}
                  filled={isActive(pathName, item.href) ? `#e08e0a` : `#F4F4F4`}
                  height="22"
                  width="22"
                  label=""
                />
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <HeaderUserMenu />
          </li>
        </ul>
      </nav>
    </>
  );
}
