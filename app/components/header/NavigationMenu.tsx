import { UserImage } from "@app/components/user/UserImage";
import NavigationItems from "./NavigationItems";

export default function NavigationMenu() {
  return (
    <>
      <nav className="fixed bottom-0 w-full bg-main py-2">
        <ul className="flex items-center justify-around">
          {NavigationItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="text-xxs flex items-center flex-col gap-y-1"
              >
                <item.icon
                  fill="#F4F4F4"
                  filled="#F4F4F4"
                  height="22"
                  width="22"
                  label=""
                />
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a href="" className="text-xxs flex items-center flex-col gap-y-1">
              <UserImage
                src={"/images/default-user-icon-yellow.svg"}
                width={22}
                height={22}
                alt=""
              />
              マイページ
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
