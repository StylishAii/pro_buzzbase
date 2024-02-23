"use client";
import MatchResultsItem from "@app/components/listItem/MatchResultsItem";
import getAllUserGameResults from "@app/hooks/game/getAllUserGameResults";
import { Divider, Spinner, User } from "@nextui-org/react";
import Link from "next/link";

type AllUserGameResult = {
  game_result_id: number;
  user_id: number;
  user_image: {
    url: string;
  };
  user_name: string;
  user_user_id: string;
  match_result: any[];
  pitching_result: any[];
  plate_appearances: any[];
};

export default function AllUserGameResultItem() {
  const { allUserGameResults, isError, isLoading } = getAllUserGameResults();
  if (isLoading) {
    return (
      <div className="flex justify-center pb-6 pt-14">
        <Spinner color="primary" />
      </div>
    );
  }
  if (isError) {
    return (
      <p className="text-sm text-white text-center">
        成績の読み込みに失敗しました。
      </p>
    );
  }
  return (
    <>
      <div className="mt-6 grid gap-y-6">
        {allUserGameResults.map(
          (gameResult: AllUserGameResult, index: number) => (
            <div key={index}>
              <div className="grid grid-cols-[1fr_auto] items-center ">
                <Link
                  href={`/mypage/${gameResult.user_user_id}/`}
                  className="block mb-2"
                >
                  <User
                    name={gameResult.user_name}
                    description={`@${gameResult.user_user_id}`}
                    avatarProps={{
                      src:
                        process.env.NODE_ENV === "production"
                          ? gameResult.user_image.url
                          : `${process.env.NEXT_PUBLIC_API_URL}${gameResult.user_image.url}`,
                    }}
                  />
                </Link>
              </div>
              <MatchResultsItem
                gameResult={[gameResult]}
                plateAppearance={[gameResult.plate_appearances]}
              />
              <Divider className="mt-6" />
            </div>
          )
        )}
      </div>
    </>
  );
}
