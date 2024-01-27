import MatchResultsItem from "@app/components/listItem/MatchResultsItem";
import ResultsSelectBox from "@app/components/select/ResultsSelectBox";
import { gameType, years } from "@app/data/TestData";
import { getGameResults } from "@app/services/gameResultsService";
import { getMatchResults } from "@app/services/matchResultsService";
import { getCurrentPlateAppearance } from "@app/services/plateAppearanceService";
import { getCurrentUserId } from "@app/services/userService";
import { useEffect, useState } from "react";

type GameResult = {
  game_result_id: number;
};

type AvailableYear = number | string;

type AvailableMatchType = string;

export default function MatchResultList() {
  const [availableYears, setAvailableYears] = useState<AvailableYear[]>([]);
  const [selectAvailableYears, setSelectAvailableYears] = useState<
    AvailableYear[]
  >([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [availableMatchType, setAvailableMatchType] = useState<AvailableYear[]>(
    []
  );
  const [selectedMatchType, setSelectedMatchType] = useState("");
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
      const currentUserIdData = await getCurrentUserId();
      const matchResultData = await getMatchResults();
      const matchResultDate = matchResultData.map(
        (result: any) => result.date_and_time
      );
      const yearArray: AvailableYear[] = matchResultDate.map(
        (dateString: string) => {
          const date = new Date(dateString);
          return date.getFullYear();
        }
      );
      const uniqueYears = Array.from(new Set(yearArray));
      uniqueYears.unshift("通算");
      setAvailableYears(uniqueYears);
      setSelectAvailableYears(uniqueYears);

      const matchTypeData: AvailableMatchType[] = matchResultData.map(
        (type: any) => type.match_type
      );
      const uniqueMatchType = Array.from(new Set(matchTypeData));
      const uniqueMatchTypeChange = uniqueMatchType.map((type) => {
        if (type === "open") {
          return "オープン戦";
        } else if (type === "regular") {
          return "公式戦";
        } else {
          return type;
        }
      });
      uniqueMatchTypeChange.unshift("全て");
      setAvailableMatchType(uniqueMatchTypeChange);
      setGameResultIndex(gameResultsDataLists);
      setPlateAppearance(plateAppearanceDataLists);
      setCurrentUserId(currentUserIdData);
    } catch (error) {
      console.log(`game lists fetch error:`, error);
    }
  };

  // const fetchFilteredData = async () => {
  //   try {
  //     const gameResultsDataLists = await getFilterGameResults(
  //       selectedYear,
  //       selectedMatchType
  //     );
  //     const plateAppearanceDataLists = await Promise.all(
  //       gameResultsDataLists.map((gameResult) =>
  //         getCurrentPlateAppearance(gameResult.game_result_id)
  //       )
  //     );

  //     setGameResultIndex(gameResultsDataLists);
  //     setPlateAppearance(plateAppearanceDataLists);
  //   } catch (error) {
  //     console.log(`Filtered game lists fetch error:`, error);
  //   }
  // };

  const handleYearChange = (event: any) => {
    setSelectedYear(event.target.value);
  };

  const handleMatchTypeChange = (event: any) => {
    setSelectedMatchType(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (availableYears.length > 0 && availableMatchType.length > 0) {
      setSelectedYear(availableYears[0].toString());
      setSelectedMatchType(availableMatchType[0].toString());
    }
  }, [availableYears]);

  useEffect(() => {}, [selectedYear, selectedMatchType]);

  return (
    <>
      <div className="bg-bg_sub p-4 rounded-xl">
        <div className="flex gap-x-4 mb-5">
          <ResultsSelectBox
            radius="full"
            className="bg-transparent rounded-full text-xs border-zinc-400 max-w-xs"
            data={years}
            variant="faded"
            color="primary"
            ariaLabel="シーズンを選択"
            labelPlacement="outside"
            size="sm"
            onChange={handleYearChange}
            propsYears={availableYears}
            selectedKeys={selectedYear ? [selectedYear.toString()] : []}
          />
          <ResultsSelectBox
            radius="full"
            className="bg-transparent rounded-full text-xs border-zinc-400 max-w-xs"
            data={gameType}
            variant="faded"
            color="primary"
            ariaLabel="試合の種類を選択"
            labelPlacement="outside"
            size="sm"
            onChange={handleMatchTypeChange}
            propsYears={availableMatchType}
            selectedKeys={
              selectedMatchType ? [selectedMatchType.toString()] : []
            }
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
