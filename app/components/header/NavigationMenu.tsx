import { UserImage } from "@app/components/user/UserImage";
import NavigationItems from "./NavigationItems";
import { Link, Button } from "@nextui-org/react";

export default function NavigationMenu() {
  return (
    <>
      <nav className="fixed bottom-0 w-full bg-main py-2">
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
              href=""
              as={Link}
              className="text-xxs flex items-center flex-col gap-y-1 px-0 bg-transparent isIconOnly overflow-visible"
            >
              <UserImage
                src={"/images/default-user-icon-yellow.svg"}
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
