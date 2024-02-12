"use client";
import "@app/globals.css";
import { UserImage } from "@app/components/user/UserImage";
import NavigationItems from "./NavigationItems";
import { Link, Button } from "@nextui-org/react";
import { getUserData } from "@app/services/userService";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@app/contexts/useAuthContext";

type userData = {
  user_id: string;
  image: any;
  url: string;
};

export default function NavigationMenu() {
  const [userData, setUserData] = useState<userData | null>(null);
  const { isLoggedIn } = useAuthContext();
  const pathName = usePathname();
  const navigationItems = NavigationItems();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        setUserData(null);
      }
    };
    fetchUserData();
  }, []);

  const myPageLink = isLoggedIn ? `/mypage/${userData?.user_id}` : "/signin";
  const isActive = (path: string, itemHref: string) => {
    const activePaths = ["/", "/game-result/lists", "/everyone", "/groups"];
    return path === itemHref && activePaths.includes(path);
  };

  return (
    <>
      <nav className="fixed bottom-0 w-full bg-main pt-2.5 pb-1.5 border-t border-t-zinc-500 z-100">
        <ul className="flex items-center justify-around">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <Button
                isIconOnly
                href={item.href}
                as={Link}
                startContent={
                  <item.icon
                    fill={isActive(pathName, item.href) ? `#e08e0a` : `#F4F4F4`}
                    filled={
                      isActive(pathName, item.href) ? `#e08e0a` : `#F4F4F4`
                    }
                    height="22"
                    width="22"
                    label=""
                  />
                }
                className={`flex items-center flex-col gap-y-1 px-0 bg-transparent overflow-visible fontSize10 ${
                  isActive(pathName, item.href)
                    ? `text-yellow-500`
                    : `text-white`
                }`}
              >
                {item.label}
              </Button>
            </li>
          ))}
          <li>
            <Button
              isIconOnly
              href={myPageLink}
              as={Link}
              className={`flex items-center flex-col gap-y-1 px-0 bg-transparent isIconOnly overflow-visible fontSize10 ${
                pathName.includes("/mypage") ? `text-yellow-500` : `text-white`
              } `}
            >
              <UserImage
                src={
                  userData?.image.url
                    ? `${process.env.NEXT_PUBLIC_API_URL}${userData.image.url}`
                    : "/images/user-default-yellow.svg"
                }
                width={22}
                height={22}
                alt=""
                active={pathName.includes("/mypage") ? true : false}
              />
              マイページ
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
}
