import { Link, Button, Badge, Skeleton } from "@nextui-org/react";
import { UserIcon } from "@app/components/icon/UserIcon";
import { useAuthContext } from "@app/contexts/useAuthContext";
import NotificationBadge from "@app/components/notification/NotificationBadge";

export default function HeaderRight() {
  const { isLoggedIn, loading } = useAuthContext();

  if (loading) {
    return (
      <>
        <Skeleton className="rounded-lg">
          <div className="h-6 rounded-lg bg-default-300"></div>
        </Skeleton>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-x-4 pt-1">
        {isLoggedIn ? (
          <>
            <NotificationBadge />
          </>
        ) : (
          <>
            <Link href="/signin" className="text-sm text-white font-medium">
              ログイン
            </Link>
            <Button
              href="/signup"
              as={Link}
              startContent={
                <UserIcon
                  fill="#F4F4F4"
                  filled="#F4F4F4"
                  height="18"
                  width="18"
                  label=""
                />
              }
              className="gap-x-1 bg-yellow-500 text-white text-sm py-1.5 px-3 h-auto rounded-lg font-medium"
            >
              新規登録
            </Button>
          </>
        )}
      </div>
    </>
  );
}
