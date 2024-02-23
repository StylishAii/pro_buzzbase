import { fetcher } from "@app/hooks/swrFetcher";
import { extractUserIdFromPath } from "@app/hooks/user/extractUserIdFromPath";
import { usePathname } from "next/navigation";
import useSWR from "swr";

export default function getUserAwards() {
  const pathName = usePathname();
  const userId = extractUserIdFromPath(pathName);
  const { data, error } = useSWR<UserAwards[]>(
    userId ? `/api/v1/users/${userId}/awards/index_user_id` : null,
    fetcher
  );
  return {
    userAwards: data,
    isLoadingAwards: !error && !data,
    isErrorAwards: error,
  };
}
