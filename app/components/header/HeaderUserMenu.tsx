import { UserImage } from "@app/components/user/UserImage";
import { useAuthContext } from "@app/contexts/useAuthContext";
import useCurrentUserImageId from "@app/hooks/user/useCurrentUserImageId";
import { Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderUserMenu() {
  const { isLoggedIn } = useAuthContext();
  const pathName = usePathname();
  const { currentUserData, isLoadingCurrentUserData } = useCurrentUserImageId();

  const isLoading = isLoadingCurrentUserData;

  if (isLoading) {
    return (
      <div>
        <Skeleton className="rounded-full bg-zinc-700 border-none lg:rounded-lg">
          <div className="w-[50px] h-[41px] lg:w-[139px] lg:h-[24px]"></div>
        </Skeleton>
      </div>
    );
  }

  const myPageLink = isLoggedIn
    ? `/mypage/${currentUserData?.user_id}`
    : "/signin";

  const imageUrl =
    process.env.NODE_ENV === "production"
      ? currentUserData?.image.url
      : `${process.env.NEXT_PUBLIC_S3_API_URL}${currentUserData?.image.url}`;
  return (
    <>
      <Link
        href={myPageLink}
        className={`flex items-center flex-col gap-y-1 min-w-[50px] font-medium px-0 bg-transparent isIconOnly overflow-visible fontSize10 ${
          pathName.includes("/mypage") ? `text-yellow-500` : `text-white`
        } lg:flex-row lg:text-base lg:w-fit lg:font-bold lg:gap-x-5`}
      >
        <UserImage
          src={
            currentUserData?.image.url
              ? `${imageUrl}`
              : "/images/user-default-yellow.svg"
          }
          width={22}
          height={22}
          alt=""
          active={pathName.includes("/mypage") ? true : false}
          className={"object-cover lg:w-6 lg:h-6 lg:mr-4"}
        />
        マイページ
      </Link>
    </>
  );
}
