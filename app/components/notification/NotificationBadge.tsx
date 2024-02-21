import { Link, Badge } from "@nextui-org/react";
import { getNotificationCount } from "@app/services/notificationsService";
import { NotificationIcon } from "@app/components/icon/NotificationIcon";
import { useEffect, useState } from "react";

type NotificationCount = {
  count: number;
};

export default function NotificationBadge() {
  const [notificationCount, setNotificationCount] =
    useState<NotificationCount | null>(null);

  const fetchDate = async () => {
    try {
      const responseNotificationCount = await getNotificationCount();
      setNotificationCount(responseNotificationCount);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {notificationCount?.count ? (
        <>
          <Badge
            color="danger"
            content={notificationCount?.count}
            isInvisible={false}
            shape="circle"
            size="sm"
          >
            <Link href="/mypage/notifications">
              <NotificationIcon size={24} />
            </Link>
          </Badge>
        </>
      ) : (
        <>
          <Link href="/mypage/notifications">
            <NotificationIcon size={24} />
          </Link>
        </>
      )}
    </>
  );
}
