"use client";

import Header from "@app/components/header/Header";
import { PlusIcon } from "@app/components/icon/PlusIcon";
import MatchResultList from "@app/components/user/MatchResultList";
import { useAuthContext } from "@app/contexts/useAuthContext";
import {
  createGameResult,
  getGameResults,
} from "@app/services/gameResultsService";
import { getCurrentPlateAppearance } from "@app/services/plateAppearanceService";
import { getCurrentUserId } from "@app/services/userService";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type GameResult = {
  game_result_id: number;
};

export default function GameResultList() {
  const [gameResultIndex, setGameResultIndex] = useState<GameResult[]>([]);
  const [plateAppearance, setPlateAppearance] = useState<GameResult[]>([]);
  const [currentUserId, setCurrentUserId] = useState(0);
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (isLoggedIn === false) {
      return router.push("/signin");
    }
  }, [router]);

  const fetchData = async () => {
    try {
      const gameResultsDataLists = await getGameResults();
      const plateAppearanceDataLists = await Promise.all(
        gameResultsDataLists.map((gameResult: GameResult) =>
          getCurrentPlateAppearance(gameResult.game_result_id)
        )
      );
      const currentUserIdData = await getCurrentUserId();

      setGameResultIndex(gameResultsDataLists);
      setPlateAppearance(plateAppearanceDataLists);
      setCurrentUserId(currentUserIdData);
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
      <Header />
      <main className="h-full max-w-[720px] mx-auto w-full">
        <div className="pb-32 relative">
          <div className="pt-16 px-4">
            <h2 className="text-xl font-bold mt-10">試合一覧</h2>
            <Button
              color="primary"
              variant="solid"
              radius="full"
              endContent={<PlusIcon width="22" height="22" fill="#F4F4F4" />}
              className="fixed top-14 right-4 z-100 font-medium"
              onClick={handleNewRecord}
            >
              新規追加
            </Button>
            <div className="mt-5 grid gap-y-5">
              <MatchResultList userId={currentUserId} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
