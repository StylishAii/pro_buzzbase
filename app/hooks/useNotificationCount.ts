import axiosInstance from "@app/utils/axiosInstance";
import useSWR from "swr";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export function useNotificationCount() {
  const { data, error } = useSWR(`/api/v1/notifications/count`, fetcher);

  return {
    notificationCount: data,
    isLoading: !error && !data,
    isError: error,
  };
}
