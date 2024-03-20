import { fetcher } from "@app/hooks/swrFetcher";
import useSWR from "swr";

export default function getBaseballNotes() {
  const { data, error } = useSWR("/api/v1/baseball_notes", fetcher);
  return {
    notes: data,
    isLoading: !error && !data,
    isError: error,
  };
}
