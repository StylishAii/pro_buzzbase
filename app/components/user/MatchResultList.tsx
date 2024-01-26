import MatchResultsItem from "@app/components/listItem/MatchResultsItem";
import ResultsSelectBox from "@app/components/select/ResultsSelectBox";
import { gameType, years } from "@app/data/TestData";
import { getGameResults } from "@app/services/gameResultsService";
import { getCurrentPlateAppearance } from "@app/services/plateAppearanceService";
import { useEffect, useState } from "react";

type GameResult = {
  game_result_id: number;
};

export default function MatchResultList() {
  const [gameResultIndex, setGameResultIndex] = useState<GameResult[]>([]);
  const [plateAppearance, setPlateAppearance] = useState<GameResult[]>([]);

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
  return (
    <>
      <div className="bg-bg_sub p-4 rounded-xl">
        <div className="flex gap-x-4 mb-5">
          <ResultsSelectBox
            radius="full"
            defaultSelectedKeys={[years[0].label]}
            className="bg-transparent rounded-full text-xs border-zinc-400 max-w-xs"
            data={years}
            variant="faded"
            color="primary"
            ariaLabel="シーズンを選択"
            labelPlacement="outside"
            size="sm"
          />
          <ResultsSelectBox
            radius="full"
            defaultSelectedKeys={[gameType[0].label]}
            className="bg-transparent rounded-full text-xs border-zinc-400 max-w-xs"
            data={gameType}
            variant="faded"
            color="primary"
            ariaLabel="試合の種類を選択"
            labelPlacement="outside"
            size="sm"
          />
        </div>
        <div className="mt-8">
          <div className="mt-8 grid gap-y-5">
            <MatchResultsItem
              gameResult={gameResultIndex}
              plateAppearance={plateAppearance}
            />
          </div>
        </div>
      </div>
    </>
  );
}
