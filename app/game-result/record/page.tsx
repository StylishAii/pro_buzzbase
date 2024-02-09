"use client";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import HeaderResult from "@app/components/header/HeaderResult";
import { NextArrowIcon } from "@app/components/icon/NextArrowIcon";
import { updateGameResult } from "@app/services/gameResultsService";
import {
  checkExistingMatchResults,
  createMatchResults,
  updateMatchResult,
} from "@app/services/matchResultsService";
import { getPositions } from "@app/services/positionService";
import { createOrUpdateTeam, getTeams } from "@app/services/teamsService";
import {
  createTournament,
  getTournaments,
  updateTournament,
} from "@app/services/tournamentsService";
import { getCurrentUserId, getUserData } from "@app/services/userService";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";

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

type Team = {
  id: string;
  name: string;
};

type Position = {
  userId: string;
  position_id: number;
  id: string;
  name: string;
};

type userData = {
  image: any;
  name: string;
  id: number;
  url: string;
  introduction: string;
  positions: Position[];
  team_id: number;
};

export default function GameRecord() {
  const [userData, setUserData] = useState<userData | null>(null);
  const [existingGameDate, setExistingGameDate] = useState<string>("");
  const [myTeam, setMyTeam] = useState("");
  const [existingMyTeam, setExistingMyTeam] = useState("");
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const [positionData, setPositionData] = useState<Position[]>([]);
  const [tournamentData, setTournamentData] = useState<TournamentData[]>([]);
  const [myPosition, setMyPosition] = useState("");
  const [matchType, setMatchType] = useState("regular");
  const [opponentTeam, setOpponentTeam] = useState("");
  const [existingOpponentTeam, setExistingOpponentTeam] = useState<
    number | undefined
  >(undefined);
  const [myTeamScore, setMyTeamScore] = useState(0);
  const [opponentTeamScore, setOpponentTeamScore] = useState(0);
  const [matchBattingOrder, setMatchBattingOrder] = useState("");
  const [existingMatchBattingOrder, setExistingMatchBattingOrder] =
    useState("");
  const [defensivePosition, setDefensivePosition] = useState<string>("");
  const [existingDefensivePosition, setExistingDefensivePosition] =
    useState<string>("");
  const [tournament, setTournament] = useState<number | null>(null);
  const [inputTournamentName, setInputTournamentName] = useState("");
  const [matchMemo, setMatchMemo] = useState<string | null>(null);
  const [isMatchDate, setIsMatchDate] = useState(true);
  const [isMyTeamValid, setIsMyTeamValid] = useState(true);
  const [isOpponentTeamValid, setIsOpponentTeamValid] = useState(true);
  const [isMyTeamScoreValid, setIsMyTeamScoreValid] = useState(true);
  const [isOpponentTeamScoreValid, setIsOpponentTeamScoreValid] =
    useState(true);
  const [isBattingOrderValid, setIsBattingOrderValid] = useState(true);
  const [isDefensivePositionValid, setIsDefensivePositionValid] =
    useState(true);
  const [isLocalStorageId, setIsLocalStorageId] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [localStorageGameResultId, setLocalStorageGameResultId] = useState<
    number | null
  >(null);
  const router = useRouter();
  const pathname = usePathname();

  const fetchData = async () => {
    try {
      const currentUserData = await getUserData();
      setUserData(currentUserData);
      const userTeamId = currentUserData.team_id;
      const getTeamsList = await getTeams();
      const getTournamentList = await getTournaments();
      setTeamsData(getTeamsList);
      // マイチーム名取得
      const userTeam = getTeamsList.find(
        (team: { id: string }) => team.id === userTeamId
      );
      if (userTeam) {
        setMyTeam(userTeam.name);
      }
      const positionDataList = await getPositions();
      setPositionData(positionDataList);
      setTournamentData(getTournamentList);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
    // ローカルストレージからid取得
    const savedGameResultId = localStorage.getItem("gameResultId");
    if (savedGameResultId) {
      setLocalStorageGameResultId(JSON.parse(savedGameResultId));
      fetchExistingMatchResult(JSON.parse(savedGameResultId));
    }
    if (
      !(pathname === "/game-result/battings") &&
      !(pathname === "/game-result/record") &&
      savedGameResultId
    ) {
      localStorage.removeItem("gameResultId");
    }
  }, [pathname]);

  // 既に同じgame_result_idが存在する場合
  const fetchExistingMatchResult = async (gameResultId: number) => {
    try {
      const currentUserId = await getCurrentUserId();
      const existingMatchResult = await checkExistingMatchResults(
        gameResultId,
        currentUserId
      );
      console.log(existingMatchResult);
      if (existingMatchResult) {
        const date = new Date(existingMatchResult.date_and_time);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        setExistingGameDate(formattedDate);
        setMatchType(existingMatchResult.match_type);
        setTournament(existingMatchResult.tournament_id);
        setExistingMyTeam(existingMatchResult.my_team_id);
        setMyTeamScore(existingMatchResult.my_team_score);
        setOpponentTeamScore(existingMatchResult.opponent_team_score);
        setExistingMatchBattingOrder(existingMatchResult.batting_order);
        setMatchMemo(existingMatchResult.memo);
        setExistingOpponentTeam(existingMatchResult.opponent_team_id);
        setExistingDefensivePosition(existingMatchResult.defensive_position);
      }
    } catch (error) {
      console.error("Error fetching existing match result:", error);
    }
  };

  useEffect(() => {
    // 守備位置設定
    if (userData && positionData.length > 0) {
      const userPositionFirstId = userData.positions[0].id;
      const userPosition = positionData.find(
        (position) => position.id === userPositionFirstId
      );
      if (userPosition) {
        setMyPosition(userPosition.id.toString());
      }
    }
  }, [userData, positionData]);

  // チーム名検索(編集時)
  useEffect(() => {
    if (existingMyTeam) {
      const foundTeam = teamsData.find((team) => team.id === existingMyTeam);
      if (foundTeam) {
        setMyTeam(foundTeam.name);
      }
    }
  }, [existingMyTeam, teamsData]);

  // 今日の日付
  const [gameDate, setGameDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  });
  // 日付入力
  const handleDateChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setExistingGameDate(event.target.value);
    setGameDate(event.target.value);
  };

  // 試合タイプ
  const handleMatchTypeChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setMatchType(event.target.value);
  };

  // 自チーム名設定
  const handleMyTeamChange = (event: any) => {
    setExistingMyTeam(event.target.value);
    setMyTeam(event.target.value);
  };

  // 相手チーム設定
  const handleOpponentTeamChange = (teamName: any) => {
    setExistingOpponentTeam(Number(teamName));
    setOpponentTeam(teamName);
  };

  const handleTournamentInputChange = (value: string) => {
    setInputTournamentName(value);
  };
  const handleTournamentSelectionChange = (value: any) => {
    setTournament(value);
  };

  // 自分チーム得点
  const handleMyScoreChange = (event: any) => {
    setMyTeamScore(event.target.value);
  };

  // 相手チーム得点
  const handleOpponentScoreChange = (event: any) => {
    setOpponentTeamScore(event.target.value);
  };

  // 打順
  const handleBattingOrderChange = (event: { target: { value: any } }) => {
    const order = event.target.value;
    setExistingMatchBattingOrder(order);
    setMatchBattingOrder(order);
  };

  // 守備位置
  const handleDefensivePositionChange = (event: { target: { value: any } }) => {
    const position = event.target.value;
    setExistingDefensivePosition(position);
    setDefensivePosition(position);
  };

  const setErrorsWithTimeout = (newErrors: React.SetStateAction<string[]>) => {
    setErrors(newErrors);
    setTimeout(() => {
      setErrors([]);
    }, 2000);
  };
  // バリデーション
  const validateForm = () => {
    let isValid = true;
    let newErrors = [];

    if (!localStorageGameResultId) {
      setIsLocalStorageId(false);
      isValid = false;
      newErrors.push("エラーが発生しました。");
    } else {
      setIsLocalStorageId(true);
    }

    if (!gameDate) {
      setIsMatchDate(false);
      isValid = false;
      newErrors.push("試合日付が未入力です。");
    } else {
      setIsMatchDate(true);
    }

    if (!myTeam) {
      setIsMyTeamValid(false);
      isValid = false;
      newErrors.push("自チーム名が未入力です。");
    } else {
      setIsMyTeamValid(true);
    }

    if (!opponentTeam) {
      setIsOpponentTeamValid(false);
      isValid = false;
      newErrors.push("相手チーム名が未入力です。");
    } else {
      setIsOpponentTeamValid(true);
    }

    if (!myTeamScore && myTeamScore !== 0) {
      setIsMyTeamScoreValid(false);
      isValid = false;
      newErrors.push("自チーム名の点数が未入力です。");
    } else {
      setIsMyTeamScoreValid(true);
    }

    if (!opponentTeamScore && opponentTeamScore !== 0) {
      setIsOpponentTeamScoreValid(false);
      isValid = false;
      newErrors.push("相手チーム名の点数が未入力です。");
    } else {
      setIsOpponentTeamScoreValid(true);
    }

    if (!matchBattingOrder && !existingMatchBattingOrder) {
      setIsBattingOrderValid(false);
      isValid = false;
      newErrors.push("打順が未入力です。");
    } else {
      setIsBattingOrderValid(true);
    }

    if (!defensivePosition && !myPosition) {
      setIsDefensivePositionValid(false);
      isValid = false;
      newErrors.push("守備位置が未入力です。");
    } else {
      setIsDefensivePositionValid(true);
    }

    if (!isValid) {
      setErrorsWithTimeout(newErrors);
    }

    return isValid;
  };

  // フォームデータ送信
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setErrors([]);
    try {
      const userId = userData?.id;
      let myTeamId = teamsData.find((team) => team.name === myTeam)?.id;
      if (!myTeamId) {
        const newTeam = await createOrUpdateTeam({
          team: {
            name: myTeam,
            category_id: undefined,
            prefecture_id: undefined,
          },
        });
        myTeamId = newTeam.data.id;
      }

      // 大会保存
      let tournamentId = tournament;
      const existingTournament = tournamentData.find(
        (t) => t.name === inputTournamentName
      );
      if (existingTournament) {
        const updatedTournament = await updateTournament(
          existingTournament.id,
          inputTournamentName
        );
        if (updatedTournament) {
          tournamentId = updatedTournament.id;
        }
      } else if (inputTournamentName) {
        const newTournament = await createTournament({
          name: inputTournamentName,
        });
        if (newTournament) {
          setTournamentData([...tournamentData, newTournament]);
          tournamentId = newTournament.id;
        }
      }

      // 相手チーム保存
      let opponentTeamId;
      if (typeof opponentTeam === "string") {
        const newTeamResponse = await createOrUpdateTeam({
          team: {
            name: opponentTeam,
            category_id: undefined,
            prefecture_id: undefined,
          },
        });
        opponentTeamId = newTeamResponse.data.id;
      } else {
        opponentTeamId = teamsData.find(
          (team) => team.name === opponentTeam
        )?.id;
      }
      const matchResultData = {
        match_result: {
          game_result_id: localStorageGameResultId,
          user_id: Number(userId),
          date_and_time: gameDate,
          match_type: matchType,
          my_team_id: Number(existingMyTeam)
            ? Number(existingMyTeam)
            : Number(myTeamId),
          opponent_team_id: existingOpponentTeam
            ? existingOpponentTeam
            : Number(opponentTeamId),
          my_team_score: myTeamScore,
          opponent_team_score: opponentTeamScore,
          batting_order: existingMatchBattingOrder
            ? existingMatchBattingOrder
            : matchBattingOrder,
          defensive_position: existingDefensivePosition
            ? existingDefensivePosition
            : myPosition,
          tournament_id: tournamentId,
          memo: matchMemo,
        },
      };
      const existingMatchResults = await checkExistingMatchResults(
        matchResultData.match_result.game_result_id,
        matchResultData.match_result.user_id
      );
      if (existingMatchResults) {
        await updateMatchResult(existingMatchResults.id, matchResultData);
      } else {
        const response = await createMatchResults(matchResultData);
        console.log(response);
        if (
          typeof userId !== "undefined" &&
          localStorageGameResultId !== null
        ) {
          const updateGameResultData = {
            game_result: {
              user_id: userId,
              match_result_id: response.id,
              batting_average_id: null,
              pitching_result_id: null,
            },
          };
          await updateGameResult(
            localStorageGameResultId,
            updateGameResultData
          );
        }
      }
      router.push(`/game-result/batting/`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <>
      <HeaderResult />
      <main className="h-full">
        <div className="pb-40 relative">
          <ErrorMessages errors={errors} />
          <div className="pt-12 px-4">
            <div className="flex items-center justify-center gap-x-2">
              <p className="text-xl font-medium text-yellow-500">試合結果</p>
              <span className="opacity-40">→</span>
              <p className="text-xl font-medium opacity-40">打撃結果</p>
              <span className="opacity-40">→</span>
              <p className="text-xl font-medium opacity-40">投手結果</p>
            </div>
            <h2 className="text-base text-center mt-5">
              試合結果を入力しよう！
            </h2>
            <form>
              <div className="mt-6 py-5 px-6 bg-bg_sub rounded-xl">
                <Input
                  isRequired
                  type="date"
                  size="md"
                  variant="bordered"
                  label="試合日付"
                  labelPlacement="outside-left"
                  className="flex justify-between items-center"
                  color={isMatchDate ? "default" : "danger"}
                  value={existingGameDate ? existingGameDate : gameDate}
                  onChange={handleDateChange}
                />
                <Divider className="my-4" />
                <RadioGroup
                  isRequired
                  label="試合種類"
                  orientation="horizontal"
                  defaultValue={matchType}
                  value={matchType}
                  color="primary"
                  size="sm"
                  className="text-sm flex justify-between items-center flex-row [&>span]:text-white"
                  onChange={handleMatchTypeChange}
                >
                  <Radio value="regular">公式戦</Radio>
                  <Radio value="open">オープン戦</Radio>
                </RadioGroup>
                <Divider className="my-4" />
                <Autocomplete
                  allowsCustomValue
                  label="大会名"
                  variant="bordered"
                  placeholder="大会名を入力"
                  labelPlacement="outside-left"
                  className="[&>div]:justify-between"
                  size="md"
                  onInputChange={handleTournamentInputChange}
                  onSelectionChange={handleTournamentSelectionChange}
                  selectedKey={
                    tournament !== undefined ? tournament?.toString() : null
                  }
                >
                  {tournamentData.map((data) => (
                    <AutocompleteItem key={data.id} value={data.name}>
                      {data.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                <Divider className="my-4" />
                <Input
                  isRequired
                  type="text"
                  size="sm"
                  variant="bordered"
                  label="自チーム"
                  labelPlacement="outside-left"
                  placeholder="自分のチーム名を入力"
                  className="flex justify-between items-center"
                  color={isMyTeamValid ? "default" : "danger"}
                  value={myTeam}
                  onChange={handleMyTeamChange}
                />
                <Divider className="my-4" />
                <Autocomplete
                  isRequired
                  allowsCustomValue
                  label="相手チーム"
                  variant="bordered"
                  placeholder="相手のチーム名を入力"
                  labelPlacement="outside-left"
                  className="[&>div]:justify-between"
                  size="sm"
                  color={isOpponentTeamValid ? "default" : "danger"}
                  selectedKey={
                    existingOpponentTeam
                      ? existingOpponentTeam.toString()
                      : null
                  }
                  onInputChange={(value) => setOpponentTeam(value)}
                  onSelectionChange={handleOpponentTeamChange}
                >
                  {teamsData.map((data) => (
                    <AutocompleteItem
                      key={data.id}
                      value={data.name}
                      textValue={data.name}
                    >
                      {data.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                <Divider className="my-4" />
                <div className="flex justify-between items-center">
                  <p className="text-sm">
                    点数<span className="text-red-500 pl-1">*</span>
                  </p>
                  <div className="flex gap-x-2 items-center">
                    <Input
                      isRequired
                      type="number"
                      size="md"
                      variant="bordered"
                      labelPlacement="outside"
                      placeholder="自分"
                      className="flex justify-between items-center w-20"
                      defaultValue={myTeamScore.toString()}
                      value={myTeamScore.toString()}
                      color={isMyTeamScoreValid ? "default" : "danger"}
                      min={0}
                      onChange={handleMyScoreChange}
                    />
                    <span>対</span>
                    <Input
                      isRequired
                      type="number"
                      size="md"
                      variant="bordered"
                      placeholder="相手"
                      labelPlacement="outside"
                      className="flex justify-between items-center w-20"
                      defaultValue={opponentTeamScore.toString()}
                      value={opponentTeamScore.toString()}
                      color={isOpponentTeamScoreValid ? "default" : "danger"}
                      min={0}
                      onChange={handleOpponentScoreChange}
                    />
                  </div>
                </div>
                <Divider className="my-4" />
                <Select
                  isRequired
                  variant="faded"
                  label="打順"
                  labelPlacement="outside-left"
                  size="md"
                  fullWidth={false}
                  color={isBattingOrderValid ? "default" : "danger"}
                  className="grid justify-between items-center grid-cols-[auto_78px]"
                  onChange={handleBattingOrderChange}
                  selectedKeys={
                    existingMatchBattingOrder !== undefined
                      ? [existingMatchBattingOrder.toString()]
                      : []
                  }
                >
                  {battingOrder.map((order) => (
                    <SelectItem
                      key={order.id}
                      value={order.id.toString()}
                      textValue={order.turn}
                    >
                      {order.turn}
                    </SelectItem>
                  ))}
                </Select>
                <Divider className="my-4" />
                <Select
                  isRequired
                  variant="faded"
                  label="守備位置"
                  labelPlacement="outside-left"
                  size="md"
                  fullWidth={false}
                  color={isDefensivePositionValid ? "default" : "danger"}
                  placeholder="守備"
                  onChange={handleDefensivePositionChange}
                  className="grid justify-between items-center grid-cols-[auto_110px]"
                  selectedKeys={
                    existingDefensivePosition
                      ? existingDefensivePosition
                      : myPosition
                  }
                >
                  {positionData.map((position) => (
                    <SelectItem
                      key={position.id}
                      value={position.id.toString()}
                      textValue={position.name}
                      className="text-white"
                    >
                      {position.name}
                    </SelectItem>
                  ))}
                </Select>
                <Divider className="my-4" />
                <Textarea
                  variant="bordered"
                  label="メモ"
                  labelPlacement="outside"
                  placeholder="試合の中で気づいたこと、感じたことをメモしておこう！"
                  className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                  onChange={(event) => setMatchMemo(event.target.value)}
                  value={matchMemo !== null ? matchMemo : ""}
                />
              </div>
              <div className="mt-8">
                <Button
                  color="primary"
                  size="md"
                  radius="sm"
                  className="ml-auto mr-0 px-6 font-bold text-base flex items-center"
                  onClick={handleSubmit}
                  endContent={<NextArrowIcon stroke="#fff" />}
                >
                  打撃結果
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
