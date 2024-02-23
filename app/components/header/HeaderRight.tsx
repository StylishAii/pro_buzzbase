import { Skeleton } from "@nextui-org/react";
import { useAuthContext } from "@app/contexts/useAuthContext";
import NotificationBadge from "@app/components/notification/NotificationBadge";
import HeaderLoginAndSignUp from "@app/components/auth/HeaderLoginAndSignUp";
import UserSearch from "@app/components/user/UserSearch";

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
            <div className="flex items-center gap-x-4">
              <UserSearch />
              <NotificationBadge />
            </div>
          </>
        ) : (
          <>
            <HeaderLoginAndSignUp />
            <div className="absolute top-14 right-2">
              <UserSearch />
            </div>
          </>
        )}
      </div>
    </>
  );
}
