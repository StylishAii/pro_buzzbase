import MatchResultsItem from "@app/components/listItem/MatchResultsItem";
import ResultsSelectBox from "@app/components/select/ResultsSelectBox";
import { gameType, years } from "@app/data/TestData";
import {
  getFilterGameResults,
  getFilterGameResultsUserId,
  getGameResults,
} from "@app/services/gameResultsService";
import {
  getMatchResults,
  getMatchResultsUserId,
} from "@app/services/matchResultsService";
import {
  getCurrentPlateAppearance,
  getCurrentPlateAppearanceUserId,
} from "@app/services/plateAppearanceService";
import { getCurrentUserId, getUserId } from "@app/services/userService";
import { useEffect, useState } from "react";

type GameResult = {
  game_result_id: number;
};

type UserId = {
  userId: number;
};

type AvailableYear = number | string;

type AvailableMatchType = string;

export default function MatchResultList(props: UserId) {
  const { userId } = props;
  const [availableYears, setAvailableYears] = useState<AvailableYear[]>([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedYear, setSelectedYear] = useState("通算");
  const [availableMatchType, setAvailableMatchType] = useState<AvailableYear[]>(
    []
  );
  const [selectedMatchType, setSelectedMatchType] = useState("全て");
  const [gameResultIndex, setGameResultIndex] = useState<GameResult[]>([]);
  const [plateAppearance, setPlateAppearance] = useState<GameResult[]>([]);

  useEffect(() => {
    if (userId) {
      fetchFilteredData();
    } else {
      fetchData();
    }
  }, [userId]);

  useEffect(() => {
    if (selectedYear && selectedMatchType) {
      fetchFilteredData();
    }
  }, [selectedYear, selectedMatchType, userId]);

  const fetchFilteredData = async () => {
    try {
      let filteredGameResultData;
      let plateAppearanceDataLists;
      if (userId) {
        // ユーザーごと試合一覧
        filteredGameResultData = await getFilterGameResultsUserId(
          userId,
          selectedYear,
          selectedMatchType
        );
        // ユーザーごと打席結果
        plateAppearanceDataLists = await Promise.all(
          filteredGameResultData.map((gameResult: GameResult) =>
            getCurrentPlateAppearanceUserId(userId, gameResult.game_result_id)
          )
        );
        (dateString: string) => {
          const date = new Date(dateString);
          return date.getFullYear();
        };
        // ユーザーごとシーズン
        const matchResultData = await getMatchResultsUserId(userId);
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
        // ユーザーごと試合タイプ
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
      }
      if (filteredGameResultData && plateAppearanceDataLists) {
        setGameResultIndex(filteredGameResultData);
        setPlateAppearance(plateAppearanceDataLists);
      } else {
        setGameResultIndex([]);
        setPlateAppearance([]);
      }
    } catch (error) {
      console.error(`Filtered game lists fetch error:`, error);
    }
  };

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

  const handleYearChange = (event: any) => {
    setSelectedYear(event.target.value);
  };

  const handleMatchTypeChange = (event: any) => {
    setSelectedMatchType(event.target.value);
  };
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
            {gameResultIndex.length > 0 ? (
              <>
                <MatchResultsItem
                  gameResult={gameResultIndex}
                  plateAppearance={plateAppearance}
                />
              </>
            ) : (
              <>
                <p className="text-sm text-zinc-400 text-center pb-3">
                  試合結果はありません。
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
