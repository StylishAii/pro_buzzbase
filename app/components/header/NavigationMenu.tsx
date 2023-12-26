"use client";
import { UserImage } from "@app/components/user/UserImage";
import NavigationItems from "./NavigationItems";
import { Link, Button } from "@nextui-org/react";
import { getUserData } from "@app/services/userService";
import { useEffect, useState } from "react";

type userData = {
  user_id: string;
};

export default function NavigationMenu() {
  const [userData, setUserData] = useState<userData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const myPageLink = userData ? `/mypage/${userData.user_id}` : "/signin";

  return (
    <>
      <nav className="fixed bottom-0 w-full bg-main pt-2.5 pb-1.5 border-t border-t-zinc-500">
        <ul className="flex items-center justify-around">
          {NavigationItems.map((item, index) => (
            <li key={index}>
              <Button
                isIconOnly
                href={item.href}
                as={Link}
                startContent={
                  <item.icon
                    fill="#F4F4F4"
                    filled="#F4F4F4"
                    height="22"
                    width="22"
                    label=""
                  />
                }
                className="text-xxs flex items-center flex-col gap-y-1 px-0 bg-transparent overflow-visible"
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
              className="text-xxs flex items-center flex-col gap-y-1 px-0 bg-transparent isIconOnly overflow-visible"
            >
              <UserImage
                src={"/images/user-default-yellow.svg"}
                width={22}
                height={22}
                alt=""
              />
              マイページ
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
}
