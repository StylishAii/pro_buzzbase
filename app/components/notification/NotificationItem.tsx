"use client";
import NotificationGroup from "@app/components/notification/NotificationGroup";
import { getNotifications } from "@app/hooks/notification/getNotifications";
import useRequireAuth from "@app/hooks/auth/useRequireAuth";
import { readNotification } from "@app/services/notificationsService";
import { Avatar, Divider, Spinner } from "@nextui-org/react";
import Link from "next/link";

export default function NotificationItem() {
  const { notifications, isError, isLoading } = getNotifications();
  useRequireAuth();
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner color="primary" />
      </div>
    );
  }
  if (isError) {
    return (
      <p className="text-sm text-white text-center">
        通知の読み込みに失敗しました。
      </p>
    );
  }

  const handleRead = async (id: number) => {
    try {
      await readNotification(id);
    } catch (error) {}
  };

  return (
    <>
      <div className="py-5 pb-24 grid gap-y-5 bg-main lg:pb-6">
        {notifications?.length > 0 ? (
          notifications?.map((notice: any) => (
            <div key={notice.id}>
              {notice.event_type === "group_invitation" &&
              notice.group_invitation === "pending" ? (
                <>
                  <NotificationGroup notice={notice} />
                  <Divider className="mt-3" />
                </>
              ) : notice.event_type === "followed" ? (
                <>
                  <div
                    className={`grid grid-cols-[28px_1fr] gap-x-3 ${
                      notice.read_at ? "opacity-30" : ""
                    }`}
                  >
                    <Link
                      href={`/mypage/${notice.actor_user_id}`}
                      onClick={() => handleRead(notice.id)}
                    >
                      <Avatar
                        src={
                          process.env.NODE_ENV === "production"
                            ? `${notice.actor_icon.url}`
                            : `${process.env.NEXT_PUBLIC_API_URL}${notice.actor_icon.url}`
                        }
                        size="sm"
                        isBordered
                        className="min-w-[28px] max-w-[28px] min-h-[28px] max-h-[28px]"
                      />
                    </Link>
                    <div className="flex flex-col items-start gap-y-1">
                      <p className="text-sm text-zinc-400">
                        <Link
                          href={`/mypage/${notice.actor_user_id}`}
                          className="text-base text-white font-bold"
                          onClick={() => handleRead(notice.id)}
                        >
                          {notice.actor_name}
                        </Link>
                        さんから
                        <span className="text-base text-white font-bold">
                          {notice.group_name}
                        </span>
                        フォローされました
                      </p>
                    </div>
                  </div>
                  <Divider className="mt-3" />
                </>
              ) : (
                <></>
              )}
            </div>
          ))
        ) : (
          <>
            <p className="text-zinc-400 text-center pt-2 text-sm">
              通知はありません
            </p>
          </>
        )}
      </div>
    </>
  );
}
