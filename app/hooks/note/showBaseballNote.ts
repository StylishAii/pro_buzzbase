import { fetcher } from "@app/hooks/swrFetcher";
import useSWR from "swr";

export default function showBaseballNote(id: number) {
  const { data, error } = useSWR(`/api/v1/baseball_notes/${id}`, fetcher);
  return {
    note: data,
    isLoading: !error && !data,
    isError: error,
  };
}
