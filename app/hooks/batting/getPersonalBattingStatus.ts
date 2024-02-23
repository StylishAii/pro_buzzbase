"use client";
import { fetcher } from "@app/hooks/swrFetcher";
import useSWR from "swr";

export function getPersonalBattingStatus(userId: number) {
  const { data, error } = useSWR(
    userId
      ? `/api/v1/batting_averages/personal_batting_stats?user_id=${userId}`
      : null,
    fetcher
  );
  return {
    personalBattingStatus: data,
    isLoadingBS: !error && !data,
    isError: error,
  };
}
