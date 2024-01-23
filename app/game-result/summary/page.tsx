"use client";
import SummaryResultHeader from "@app/components/header/SummaryHeader";
import { ShareIcon } from "@app/components/icon/ShareIcon";
import { battingOrder } from "@app/game-result/record/page";
import { getCurrentBattingAverage } from "@app/services/battingAveragesService";
import { getCurrentMatchResult } from "@app/services/matchResultsService";
import { getCurrentPitchingResult } from "@app/services/pitchingResultsService";
import { getPositionName } from "@app/services/positionService";
import { getTeamName } from "@app/services/teamsService";
import { getTournamentName } from "@app/services/tournamentsService";
import { Button, Chip, Divider } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultsSummary() {
  const [matchResult, setMatchResult] = useState<MatchResult[]>([]);
  const [battingAverage, setBattingAverage] = useState([]);
  const [pitchingResult, setPitchingResult] = useState([]);
  const [isDetailDataFetched, setIsDetailDataFetched] = useState(false);
  const [localStorageGameResultId, setLocalStorageGameResultId] = useState<
    number | null
  >(null);
  const router = useRouter();
  const pathname = usePathname();

  const fetchMatchResultDetailData = async () => {
    const updateMatchResults = await Promise.all(
      matchResult.map(async (match) => {
        const [tournamentName, myTeamName, opponentTeam, positionName] =
          await Promise.all([
            getTournamentName(match.tournament_id),
            getTeamName(match.my_team_id),
            getTeamName(match.opponent_team_id),
            getPositionName(Number(match.defensive_position)),
          ]);
        return {
          ...match,
          tournament_name: tournamentName,
          my_team_name: myTeamName,
          opponent_team_name: opponentTeam,
          defensive_position: positionName,
        };
      })
    );
    setMatchResult(updateMatchResults);
    setIsDetailDataFetched(true);
  };

  useEffect(() => {
    // ローカルストレージからid取得
    const savedGameResultId = localStorage.getItem("gameResultId");
    if (savedGameResultId) {
      setLocalStorageGameResultId(JSON.parse(savedGameResultId));
      fetchCurrentResultData(JSON.parse(savedGameResultId));
    }
  }, [pathname]);

  useEffect(() => {
    if (matchResult.length > 0 && !isDetailDataFetched) {
      fetchMatchResultDetailData();
    }
  }, [matchResult, isDetailDataFetched]);

  // データ取得
  const fetchCurrentResultData = async (localStorageGameResultId: number) => {
    try {
      const matchResultData = await getCurrentMatchResult(
        localStorageGameResultId
      );
      const battingAverageData = await getCurrentBattingAverage(
        localStorageGameResultId
      );
      const pitchingResultData = await getCurrentPitchingResult(
        localStorageGameResultId
      );
      setMatchResult(matchResultData);
      setBattingAverage(battingAverageData);
      setPitchingResult(pitchingResultData);
    } catch (error) {
      console.log(`fetch error: ${error}`);
    }
  };

  // 勝敗
  const renderScoreResult = (match: {
    my_team_score: number;
    opponent_team_score: number;
  }) => {
    if (match.my_team_score > match.opponent_team_score) {
      return <p className="text-red-500">◯</p>;
    } else if (match.my_team_score < match.opponent_team_score) {
      return <p className="text-blue-500 text-lg">×</p>;
    } else {
      return <p className="text-lg">-</p>;
    }
  };

  // 打順
  const getBattingOrderTurn = (battingOrderId: string) => {
    const battingOrderTurn = battingOrder.find(
      (order) => order.id.toString() === battingOrderId
    )?.turn;
    return battingOrderTurn || "";
  };

  const handleShare = () => {};
  const handleResultEdit = () => {};

  console.log(matchResult);
  console.log(battingAverage);
  console.log(pitchingResult);
  return (
    <>
      <SummaryResultHeader onSummaryResult={handleResultEdit} text="編集" />
      <main className="h-full">
        <div className="pb-32 relative">
          <div className="pt-20 px-4">
            <h2 className="text-xl font-bold text-center">試合結果まとめ</h2>
            <p className="text-sm text-center mt-6">
              成績を友達にシェアしよう！
            </p>
            <div className="flex justify-center">
              <Button
                color="primary"
                size="sm"
                endContent={<ShareIcon stroke="#F4F4F4" />}
                className="mt-4"
                onChange={handleShare}
              >
                成績をシェア
              </Button>
            </div>
            <div className="mt-6 py-5 px-6 bg-bg_sub rounded-xl">
              {/* 試合情報 */}
              {matchResult ? (
                matchResult.map((match: any) => (
                  <div key={match.id}>
                    <div className="flex items-center gap-x-2">
                      <Chip
                        variant="faded"
                        classNames={{
                          base: "border-small border-zic-500 px-2",
                          content: "text-yellow-500 text-xs",
                        }}
                      >
                        {match.match_type === "regular"
                          ? "公式戦"
                          : match.match_type === "open"
                          ? "オープン戦"
                          : ""}
                      </Chip>
                      <p className="text-sm font-normal">
                        {new Date(match.date_and_time).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm mt-3">{match.tournament_name}</p>
                    <span className="mt-3 text-xs text-zinc-400">
                      マイチーム
                    </span>
                    <p className="text-base">{match.my_team_name}</p>
                    <div className="flex gap-x-3 items-center mt-2">
                      <div className="flex gap-x-2 items-baseline">
                        {renderScoreResult(match)}
                        <p className="text-lg">
                          {match.my_team_score} - {match.opponent_team_score}
                        </p>
                      </div>
                      <div className="flex gap-x-1 items-baseline">
                        <span className="text-base font-normal text-zinc-400">
                          vs.
                        </span>
                        <p className="text-base font-bold">
                          {match.opponent_team_name}
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-1.5 gap-x-3">
                      <p className="text-sm text-zinc-400">
                        {getBattingOrderTurn(match.batting_order)}
                      </p>
                      <p className="text-sm text-zinc-400">{match.defensive_position}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div>試合情報はありません。</div>
              )}
              <Divider className="my-4" />
              {/* 打撃成績 */}
              {/* 投手成績 */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
