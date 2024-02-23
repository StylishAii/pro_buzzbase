import { fetcher } from "@app/hooks/swrFetcher";
import useSWR from "swr";

export default function useFollowingUser(id: number | undefined) {
  const { data, error } = useSWR(
    id ? `/api/v1/users/${id}/following_users` : null,
    fetcher
  );
  return {
    following: data,
    isLoadingFollowing: !error && !data,
    isErrorFollowing: error,
  };
}
