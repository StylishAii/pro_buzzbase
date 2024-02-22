import { fetcher } from "@app/hooks/swrFetcher";
import useSWR from "swr";

export function useNotificationCount() {
  const { data, error } = useSWR(`/api/v1/notifications/count`, fetcher);

  return {
    notificationCount: data,
    isLoading: !error && !data,
    isError: error,
  };
}
