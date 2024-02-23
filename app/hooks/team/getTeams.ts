import { usePathname } from "next/navigation";
import { extractUserIdFromPath } from "@app/hooks/user/extractUserIdFromPath";
import { fetcher } from "@app/hooks/swrFetcher";
import useSWR from "swr";

type Team = {
  id: number;
  name: string;
  category_name: string;
  prefecture_name: string;
};

export default function getMyTeams() {
  const pathName = usePathname();
  const userId = extractUserIdFromPath(pathName);
  const { data, error } = useSWR<Team>(
    userId ? `/api/v1/teams/${userId}/my_team` : null,
    fetcher
  );
  return {
    teamData: data,
    isLoadingTeams: !error && !data,
    isErrorTeams: error,
  };
}
