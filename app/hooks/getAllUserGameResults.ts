import { fetcher } from "@app/hooks/swrFetcher";
import useSWR from "swr";

export default function getAllUserGameResults() {
  const { data, error, isLoading } = useSWR(
    "/api/v1/game_results/all_game_associated_data",
    fetcher
  );
  return {
    allUserGameResults: data,
    isLoading,
    isError: error,
  };
}
