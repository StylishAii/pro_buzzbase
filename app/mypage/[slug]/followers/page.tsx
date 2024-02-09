"use client";
import FollowButton from "@app/components/button/FollowButton";
import HeaderBack from "@app/components/header/HeaderBack";
import {
  getCurrentUserId,
  getFollowersUser,
  getUserId,
} from "@app/services/userService";
import { User, user } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

type UserId = {
  id: number;
};

export default function Followers() {
  const [followers, setFollowers] = useState<FollowingUser[]>([]);
  const [userIdName, setUserIdName] = useState("");
  const [userId, setUserId] = useState<UserId>();
  const [currentUserId, setCurrentUserId] = useState(null);
  const pathName = usePathname();

  useEffect(() => {
    const pathParts = pathName.split("/");
    const userIdPart = pathParts[pathParts.length - 2];
    if (userIdPart && userIdPart !== "undefined") {
      fetchUserId(userIdPart);
      setUserIdName(userIdPart);
    }
  }, [pathName]);

  useEffect(() => {
    if (userId) {
      fetchFollowersUser(userId.id);
    }
  }, [userId]);

  const fetchUserId = async (userId: string) => {
    try {
      const response = await getUserId(userId);
      if (response) {
        setUserId(response);
      }
      const responseCurrentUserId = await getCurrentUserId();
      setCurrentUserId(responseCurrentUserId);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFollowersUser = async (userId: number) => {
    try {
      const response = await getFollowersUser(userId);
      setFollowers(response);
    } catch (error) {
      console.log("フォロワーの取得に失敗しました", error);
    }
  };

  return (
    <>
      <div className="buzz-dark">
        <HeaderBack />
        <div className="h-full">
          <main className="h-full">
            <div className="pt-10 grid grid-cols-2 text-center">
              <Link
                href={`/mypage/${userIdName}/following`}
                className="font-bold text-base py-3 border-b-2 border-zinc-600"
              >
                フォロー中
              </Link>
              <Link
                href={`/mypage/${userIdName}/followers`}
                className="font-bold text-base py-3 border-b-2 border-yellow-500"
              >
                フォロワー
              </Link>
            </div>
            <div className="px-4 py-5 pb-24 grid gap-y-5 bg-main">
              {followers.map((follow) => (
                <div
                  key={follow.id}
                  className="grid grid-cols-[1fr_auto] items-center "
                >
                  <Link href={`/mypage/${follow.user_id}/`} className="block">
                    <User
                      name={follow.name}
                      description={follow.user_id}
                      avatarProps={{
                        src: `${process.env.NEXT_PUBLIC_API_URL}${follow.image.url}`,
                      }}
                    />
                  </Link>
                  <div>
                    {follow.id === currentUserId ? (
                      <></>
                    ) : (
                      <>
                        <FollowButton
                          userId={follow.id}
                          isFollowing={follow.isFollowing}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
