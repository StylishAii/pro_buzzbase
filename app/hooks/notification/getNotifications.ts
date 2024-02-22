"use client";
import { useUser } from "@app/contexts/userContext";
import { fetcher } from "@app/hooks/swrFetcher";
import useSWR from "swr";

export function getNotifications() {
  const { state } = useUser();
  const usersUserId = state.usersUserId;
  const { data, error } = useSWR(
    usersUserId ? `/api/v1/notifications?user_id=${usersUserId.user_id}` : null,
    fetcher
  );
  return {
    notifications: data,
    isLoading: !error && !data,
    isError: error,
  };
}
