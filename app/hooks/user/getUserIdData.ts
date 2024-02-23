import { fetcher } from "@app/hooks/swrFetcher";
import useSWR from "swr";
import { usePathname } from "next/navigation";
import { extractUserIdFromPath } from "@app/hooks/user/extractUserIdFromPath";

export default function getUserIdData() {
  const pathName = usePathname();
  const userId = extractUserIdFromPath(pathName);
  const { data, error } = useSWR(
    userId ? `/api/v1/users/show_user_id_data?user_id=${userId}` : null,
    fetcher
  );
  return {
    userData: data,
    isLoadingUsers: !error && !data,
    isErrorUser: error,
  };
}
