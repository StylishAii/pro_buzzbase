"use client";

import HeaderLogo from "@app/components/header/HeaderLogo";
import { PlusIcon } from "@app/components/icon/PlusIcon";
import MatchResultsItem from "@app/components/listItem/MatchResultsItem";
import {
  createGameResult,
  getGameResults,
} from "@app/services/gameResultsService";
import { getCurrentPlateAppearance } from "@app/services/plateAppearanceService";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type GameResult = {
  game_result_id: number;
};

export default function GameResultList() {
  const [gameResultIndex, setGameResultIndex] = useState<GameResult[]>([]);
  const [plateAppearance, setPlateAppearance] = useState<GameResult[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const gameResultsDataLists = await getGameResults();
      const plateAppearanceDataLists = await Promise.all(
        gameResultsDataLists.map((gameResult: GameResult) =>
          getCurrentPlateAppearance(gameResult.game_result_id)
        )
      );

      setGameResultIndex(gameResultsDataLists);
      setPlateAppearance(plateAppearanceDataLists);
    } catch (error) {
      console.log(`game lists fetch error:`, error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNewRecord = async () => {
    try {
      const newGameResult = await createGameResult();
      localStorage.setItem("gameResultId", JSON.stringify(newGameResult.id));
      router.push(`/game-result/record`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <HeaderLogo />
      <main className="h-full">
        <div className="pb-32 relative">
          <div className="pt-16 px-4">
            <h2 className="text-xl font-bold mt-10">試合一覧</h2>
            <Button
              color="primary"
              variant="solid"
              radius="full"
              endContent={<PlusIcon width="22" height="22" fill="#F4F4F4" />}
              className="fixed top-14 right-4 z-100"
              onClick={handleNewRecord}
            >
              新規追加
            </Button>
            <div className="mt-5 grid gap-y-5">
              <MatchResultsItem
                gameResult={gameResultIndex}
                plateAppearance={plateAppearance}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
