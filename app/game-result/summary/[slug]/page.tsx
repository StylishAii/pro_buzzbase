"use client";
import HeaderGameDetail from "@app/components/header/HeaderGameDetail";;
import SummaryResultHeader from "@app/components/header/SummaryHeader";
import { ShareIcon } from "@app/components/icon/ShareIcon";
import { getUserBattingAverage } from "@app/services/battingAveragesService";
import { getUserMatchResult } from "@app/services/matchResultsService";
import { getUserPitchingResult } from "@app/services/pitchingResultsService";
import { getUserPlateAppearance } from "@app/services/plateAppearanceService";
import { getPositionName } from "@app/services/positionService";
import { getTeamName } from "@app/services/teamsService";
import { getTournamentName } from "@app/services/tournamentsService";
import {
  getCurrentUserId,
  getCurrentUsersUserId,
} from "@app/services/userService";
import { Button, Chip, Divider } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const battingOrder = [
  { id: 1, turn: "1番" },
  { id: 2, turn: "2番" },
  { id: 3, turn: "3番" },
  { id: 4, turn: "4番" },
  { id: 5, turn: "5番" },
  { id: 6, turn: "6番" },
  { id: 7, turn: "7番" },
  { id: 8, turn: "8番" },
  { id: 9, turn: "9番" },
];

export default function ResultsSummary() {
  const [matchResult, setMatchResult] = useState<MatchResult[]>([]);
  const [plateAppearance, setPlateAppearance] = useState<
    PlateAppearanceSummary[]
  >([]);
  const [battingAverage, setBattingAverage] = useState<BattingAverage[]>([]);
  const [pitchingResult, setPitchingResult] = useState<PitchingResult[]>([]);
  const [isDetailDataFetched, setIsDetailDataFetched] = useState(false);
  const [currentUsersUserId, setCurrentUsersUserId] = useState("");
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [memo, setMemo] = useState();
  const [currentUserPage, setCurrentUserPage] = useState(false);
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
      currentUsersUserIdData(currentUserId);
      const isCurrentUserPage = currentUserId === battingAverage[0].user_id;
      setCurrentUserPage(isCurrentUserPage);
    }
  }, [matchResult, isDetailDataFetched]);

  // 試合データ取得
  const fetchCurrentResultData = async (localStorageGameResultId: number) => {
    try {
      const matchResultData = await getUserMatchResult(
        localStorageGameResultId
      );
      const battingAverageData = await getUserBattingAverage(
        localStorageGameResultId
      );
      const pitchingResultData = await getUserPitchingResult(
        localStorageGameResultId
      );
      const plateAppearanceData = await getUserPlateAppearance(
        localStorageGameResultId
      );
      const currentUserIdData = await getCurrentUserId();
      if (matchResultData && matchResultData.length > 0) {
        setMemo(matchResultData[0].memo);
      }
      setMatchResult(matchResultData);
      setBattingAverage(battingAverageData);
      setPitchingResult(pitchingResultData);
      setPlateAppearance(plateAppearanceData);
      setCurrentUserId(currentUserIdData);
    } catch (error: any) {
      console.error(error);
    }
  };

  // user_id
  const currentUsersUserIdData = async (id: number | null) => {
    try {
      const response = await getCurrentUsersUserId(id);
      setCurrentUsersUserId(response);
    } catch (error) {
      console.log(`get user_id error: ${error}`);
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
      return <p className="text-lg">ー</p>;
    }
  };

  // 打順
  const getBattingOrderTurn = (battingOrderId: string) => {
    const battingOrderTurn = battingOrder.find(
      (order) => order.id.toString() === battingOrderId
    )?.turn;
    return battingOrderTurn || "";
  };

  // 打席
  const getBattingResultClassName = (battingResult: string) => {
    const hits = [
      "投安",
      "捕安",
      "一安",
      "二安",
      "三安",
      "遊安",
      "左安",
      "中安",
      "右安",
      "投二",
      "捕二",
      "一二",
      "二二",
      "三二",
      "遊二",
      "左二",
      "中二",
      "右二",
      "投三",
      "捕三",
      "一三",
      "二三",
      "三三",
      "遊三",
      "左三",
      "中三",
      "右三",
      "投本",
      "捕本",
      "一本",
      "二本",
      "三本",
      "遊本",
      "左本",
      "中本",
      "右本",
    ];
    const walks = [
      "四球",
      "死球",
      "投犠",
      "捕犠",
      "一犠",
      "二犠",
      "三犠",
      "遊犠",
      "打妨",
    ];

    if (hits.includes(battingResult)) {
      return "text-red-500";
    } else if (walks.includes(battingResult)) {
      return "text-blue-400";
    } else {
      return "";
    }
  };

  // 投球数
  const getInningPitched = (innings_pitched: number) => {
    const wholePart = Math.floor(innings_pitched);
    const fractionalPart = innings_pitched - wholePart;

    let fractionalString = "";
    if (fractionalPart >= 0.32 && fractionalPart <= 0.34) {
      fractionalString = "1/3";
    } else if (fractionalPart >= 0.65 && fractionalPart <= 0.67) {
      fractionalString = "2/3";
    }

    return `${wholePart}回${fractionalString ? `${fractionalString}` : ""}`;
  };

  const handleShare = () => {};
  const handleResultComplete = () => {
    router.push("/game-result/record");
  };

  return (
    <>
      {currentUserPage ? (
        <>
          <SummaryResultHeader
            onSummaryResult={handleResultComplete}
            text="編集"
          />
        </>
      ) : (
        <>
          <HeaderGameDetail />
        </>
      )}

      <main className="h-full">
        <div className="pb-32 relative">
          <div className="pt-20 px-4">
            {/* 試合情報 */}
            <div className="mt-6 py-5 px-6 bg-bg_sub rounded-xl">
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
                        <p className="text-lg font-bold">
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
                      <p className="text-sm text-zinc-400">
                        {match.defensive_position}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div>試合情報はありません。</div>
              )}
              <Divider className="my-4" />
              {/* 打撃成績 */}
              <div>
                {battingAverage ? (
                  battingAverage.map((batting: any) => (
                    <div key={batting.id}>
                      <p className="text-xs text-zinc-400">打撃</p>
                      <ul className="flex flex-wrap gap-2 mt-2">
                        {plateAppearance ? (
                          plateAppearance.map((plate) => (
                            <li key={plate.batter_box_number}>
                              <p
                                className={`font-bold ${getBattingResultClassName(
                                  plate.batting_result
                                )}`}
                              >
                                {plate.batting_result}
                              </p>
                            </li>
                          ))
                        ) : (
                          <></>
                        )}
                      </ul>
                      <div className="mt-1.5 grid grid-cols-3 gap-x-3 gap-y-1">
                        <div className="flex items-center">
                          <p className="text-sm text-zinc-400 mr-2">打点:</p>
                          <span className="block text-base font-bold">
                            {batting.runs_batted_in}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm text-zinc-400 mr-2">得点:</p>
                          <span className="block text-base font-bold">
                            {batting.run}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm text-zinc-400 mr-2">失策:</p>
                          <span className="block text-base font-bold">
                            {batting.error}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm text-zinc-400 mr-2">盗塁:</p>
                          <span className="block text-base font-bold">
                            {batting.stealing_base}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm text-zinc-400 mr-2">盗塁死:</p>
                          <span className="block text-base font-bold">
                            {batting.caught_stealing}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <p className="text-sm text-zinc-500">
                      打撃成績はありません。
                    </p>
                  </>
                )}
              </div>
              <Divider className="my-4" />
              {/* 投手成績 */}
              <div>
                {pitchingResult ? (
                  pitchingResult.map((pitching) => (
                    <div key={pitching.id}>
                      <p className="text-xs text-zinc-400 mb-2">投手</p>
                      <div className="flex gap-x-4">
                        {pitching.win === 1 ? (
                          <p className="text-red-500 font-bold">勝利投手</p>
                        ) : pitching.loss === 1 ? (
                          <p className="text-blue-500 font-bold">敗戦投手</p>
                        ) : (
                          <></>
                        )}
                        <div className="flex gap-x-4">
                          <span>
                            {getInningPitched(pitching.innings_pitched)}
                          </span>
                          <span>{pitching.number_of_pitches}球</span>
                        </div>
                      </div>
                      <div className="mt-1.5 grid grid-cols-3 gap-x-3 gap-y-1">
                        <div className="flex items-center">
                          <p className="text-sm text-zinc-400 mr-2">
                            ホールド:
                          </p>
                          <span className="block text-base font-bold">
                            {pitching.hold}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm text-zinc-400 mr-2">セーブ:</p>
                          <span className="block text-base font-bold">
                            {pitching.saves}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm text-zinc-400 mr-2">失点:</p>
                          <span className="block text-base font-bold">
                            {pitching.run_allowed}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm text-zinc-400 mr-2">自責点:</p>
                          <span className="block text-base font-bold">
                            {pitching.earned_run}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm text-zinc-400 mr-2">被安打:</p>
                          <span className="block text-base font-bold">
                            {pitching.hits_allowed}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm text-zinc-400 mr-2">
                            被本塁打:
                          </p>
                          <span className="block text-base font-bold">
                            {pitching.home_runs_hit}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm text-zinc-400 mr-2">奪三振:</p>
                          <span className="block text-base font-bold">
                            {pitching.strikeouts}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm text-zinc-400 mr-2">四球:</p>
                          <span className="block text-base font-bold">
                            {pitching.base_on_balls}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm text-zinc-400 mr-2">死球:</p>
                          <span className="block text-base font-bold">
                            {pitching.hit_by_pitch}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-zinc-500">
                    投手成績はありません。
                  </p>
                )}
              </div>
            </div>
            {memo != undefined ? (
              <>
                <p className="mt-4 text-sm text-zinc-500">MEMO</p>
                <div className="mt-2 border-1 border-zinc-500 rounded-lg p-3">
                  <p className="text-sm text-zinc-200">{memo}</p>
                </div>
              </>
            ) : (
              <></>
            )}
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
          </div>
        </div>
      </main>
    </>
  );
}
