"use client";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import FollowButton from "@app/components/button/FollowButton";
import { useUser } from "@app/contexts/userContext";
import useFollowersUser from "@app/hooks/user/useFollowersUser";
import { getUserId } from "@app/services/userService";
import { Spinner, User } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type UserId = {
  id: number;
};

export default function FollowersUser() {
  const [userId, setUserId] = useState<UserId>();
  const pathName = usePathname();
  const [errors, setErrors] = useState<string[]>([]);
  const { state } = useUser();
  const currentUserId = state.userId;

  useEffect(() => {
    const pathParts = pathName.split("/");
    const userIdPart = pathParts[pathParts.length - 2];
    if (userIdPart && userIdPart !== "undefined") {
      fetchUserId(userIdPart);
    }
  }, [pathName]);

  const fetchUserId = async (userId: string) => {
    try {
      const response = await getUserId(userId);
      if (response) {
        setUserId(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { followers, isLoadingFollowers } = useFollowersUser(userId?.id);

  if (isLoadingFollowers) {
    return (
      <div className="flex pt-12 pb-12 buzz-dark flex-col w-full min-h-screen lg:max-w-[720px] lg:m-[0_auto_0_28%]">
        <Spinner color="primary" />
      </div>
    );
  }

  const setErrorsWithTimeout = (newErrors: React.SetStateAction<string[]>) => {
    setErrors(newErrors);
    setTimeout(() => {
      setErrors([]);
    }, 2000);
  };

  return (
    <>
      <ErrorMessages errors={errors} />
      <div className="px-4 py-5 pb-24 grid gap-y-5 bg-main max-w-[720px] mx-auto lg:px-6 lg:pb-10 lg:m-[0_auto_0_28%] lg:border-x-1 lg:border-zinc-500 lg:border-b-1">
        {followers && followers.length > 0 ? (
          followers.map((follow: FollowingUser) => (
            <div
              key={follow.id}
              className="grid grid-cols-[1fr_auto] items-center "
            >
              <Link href={`/mypage/${follow.user_id}/`} className="block">
                <User
                  name={follow.name}
                  description={`@${follow.user_id}`}
                  avatarProps={{
                    src:
                      process.env.NODE_ENV === "production"
                        ? follow.image.url
                        : `${process.env.NEXT_PUBLIC_API_URL}${follow.image.url}`,
                  }}
                />
              </Link>
              <div>
                {follow.id !== currentUserId.id && (
                  <FollowButton
                    userId={follow.id}
                    isFollowing={follow.isFollowing}
                    setErrorsWithTimeout={setErrorsWithTimeout}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-center text-white pt-10">
            フォロワーはいません。
          </p>
        )}
      </div>
    </>
  );
}
