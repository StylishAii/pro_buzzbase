"use client";
import Header from "@app/components/header/Header";
import MatchResultsItem from "@app/components/listItem/MatchResultsItem";
import { getAllUserGameResults } from "@app/services/gameResultsService";
import { Divider, User } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function EveryoneGameResultList() {
  const [allUserGameResult, setAllUserGameResult] = useState<
    AllUserGameResult[]
  >([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseAllUserGameResult = await getAllUserGameResults();
      setAllUserGameResult(responseAllUserGameResult);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="buzz-dark flex flex-col w-full min-h-screen bg-main">
        <Header />
        <main className="h-full w-full max-w-[720px] mx-auto">
          <div className="pb-32 relative">
            <div className="pt-16 px-4">
              <h2 className="text-xl font-bold">みんなの成績</h2>
              <div className="mt-6 grid gap-y-6">
                {allUserGameResult.map((gameResult, index) => (
                  <div key={index}>
                    <div className="grid grid-cols-[1fr_auto] items-center ">
                      <Link
                        href={`/mypage/${gameResult.user_user_id}/`}
                        className="block mb-2"
                      >
                        <User
                          name={gameResult.user_name}
                          description={gameResult.user_user_id}
                          avatarProps={{
                            src: `${process.env.NEXT_PUBLIC_API_URL}${gameResult.user_image.url}`,
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
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
