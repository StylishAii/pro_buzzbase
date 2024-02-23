"use client";
import { fetcher } from "@app/hooks/swrFetcher";
import useSWR from "swr";

export function getPersonalPitchingResultStats(userId: number) {
  const { data, error } = useSWR(
    userId
      ? `/api/v1/pitching_results/personal_pitching_stats?user_id=${userId}`
      : null,
    fetcher
  );
  return {
    personalPitchingStatus: data,
    isLoadingPS: !error && !data,
    isError: error,
  };
}
