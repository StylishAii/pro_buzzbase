"use client";
import Header from "@app/components/header/Header";
import { GroupIcon } from "@app/components/icon/GroupIcon";
import LoadingSpinner from "@app/components/spinner/LoadingSpinner";
import { useAuthContext } from "@app/contexts/useAuthContext";
import { acceptGroupInvitation } from "@app/services/groupInvitationsService";
import { getNotifications } from "@app/services/notificationsService";
import {
  getCurrentUserId,
  getCurrentUsersUserId,
} from "@app/services/userService";
import { Avatar, Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState<
    Notifications[] | undefined
  >(undefined);
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();
  useEffect(() => {
    if (isLoggedIn === false) {
      return router.push("/signin");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    fetchDate();
  }, []);

  const fetchDate = async () => {
    try {
      const currentUserId = await getCurrentUserId();
      const currentUserUserId = await getCurrentUsersUserId(currentUserId);
      const response = await getNotifications(currentUserUserId);
      setNotifications(response);
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        router.push("/404");
      } else {
        console.error(error);
      }
    }
  };

  const handleAcceptGroupInvitation = async (invitationId: number) => {
    try {
      await acceptGroupInvitation(invitationId);
      router.push(`/groups/${invitationId}`);
    } catch (error) {}
  };

  console.log(notifications);

  if (!notifications) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="buzz-dark flex flex-col w-full min-h-screen">
        <Header />
        <div className="h-full">
          <main className="h-full">
            <div className="px-4 py-16">
              <h2 className="text-xl font-bold">通知</h2>
              <div className="py-5 pb-24 grid gap-y-5 bg-main">
                {notifications?.map((notice) => (
                  <div key={notice.id}>
                    {notice.event_type === "group_invitation" ? (
                      <>
                        <div className="grid grid-cols-[28px_1fr] gap-x-3">
                          <GroupIcon fill="#e08e0a" width="28" height="28" />
                          <div className="flex flex-col items-start gap-y-1 pt-1.5">
                            <Link href={`/mypage/${notice.actor_user_id}`}>
                              <Avatar
                                src={`${process.env.NEXT_PUBLIC_API_URL}${notice.actor_icon.url}`}
                                size="sm"
                                isBordered
                                className="min-w-[28px] max-w-[28px] min-h-[28px] max-h-[28px]"
                              />
                            </Link>
                            <p className="text-sm text-zinc-400">
                              <Link
                                href={`/mypage/${notice.actor_user_id}`}
                                className="text-base text-white font-bold"
                              >
                                {notice.actor_name}
                              </Link>
                              さんから
                              <span className="text-base text-white font-bold">
                                {notice.group_name}
                              </span>
                              グループへ招待されました
                            </p>
                            <div className="flex justify-start gap-x-5 w-full mt-2">
                              <Button
                                size="sm"
                                color="primary"
                                onClick={() =>
                                  handleAcceptGroupInvitation(notice.event_id)
                                }
                              >
                                参加する
                              </Button>
                              <Button size="sm" color="danger">
                                拒否する
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Divider className="mt-3" />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
