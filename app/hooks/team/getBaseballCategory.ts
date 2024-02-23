import { fetcher } from "@app/hooks/swrFetcher";
import useSWR from "swr";

export default function getBaseballCategory() {
  const { data, error } = useSWR("/api/v1/baseball_categories", fetcher);
  return {
    teamCategoryName: data,
    isLoadingBaseballCat: !error && !data,
    isErrorBaseballCat: error,
  };
}
