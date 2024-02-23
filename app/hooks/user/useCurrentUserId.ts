import { fetcher } from "@app/hooks/swrFetcher";
import useSWR from "swr";

export default function useCurrentUserId() {
  const { data, error } = useSWR("/api/v1/users/current", fetcher);
  return {
    currentUserId: data,
    isLoadingCurrentUserId: !error && !data,
    isErrorCurrentUserId: error,
  };
}
