import { getTeamName } from "@app/services/teamsService";
import { getTournamentName } from "@app/services/tournamentsService";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type MatchResultsItemProps = {
  gameResult: any[];
  plateAppearance: any;
};

type TeamNames = {
  [key: string]: string;
};

type TournamentNames = {
  [key: string]: string;
};

type PlateAppearance = {
  id: number;
  batting_result: string;
  game_result_id: number;
};

export default function MatchResultsItem(props: MatchResultsItemProps) {
  const { gameResult, plateAppearance } = props;
  const [opponentTeamNames, setOpponentTeamNames] = useState<TeamNames>({});
  const [tournamentNames, setTournamentNames] = useState<TournamentNames>({});
  const router = useRouter();

  // console.log(gameResult);
  // console.log(plateAppearance);

  useEffect(() => {
    const fetchTeamNames = async () => {
      const names: TeamNames = {};
      const namesTournament: TournamentNames = {};

      for (const game of gameResult) {
        if (game.match_result && game.match_result.opponent_team_id) {
          const teamName = await getTeamName(
            game.match_result.opponent_team_id
          );
          names[game.match_result.opponent_team_id] = teamName;
          if (game.match_result && game.match_result.tournament_id) {
            const tournamentName = await getTournamentName(
              game.match_result.tournament_id
            );
            namesTournament[game.match_result.tournament_id] = tournamentName;
          } else {
            namesTournament[game.match_result?.tournament_id] = "";
          }
        }
      }

      setOpponentTeamNames(names);
      setTournamentNames(namesTournament);
    };

    fetchTeamNames();
  }, [gameResult]);

  const renderScoreResult = (match: {
    my_team_score: number;
    opponent_team_score: number;
  }) => {
    if (match?.my_team_score > match?.opponent_team_score) {
      return <p className="text-red-500">◯</p>;
    } else if (match?.my_team_score < match?.opponent_team_score) {
      return <p className="text-blue-500 text-lg">×</p>;
    } else {
      return <p className="text-lg">ー</p>;
    }
  };

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
      return "font-light";
    }
  };

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

  const handleGameResultEdit = (gameResultId: number) => {
    localStorage.setItem("gameResultId", JSON.stringify(gameResultId));
    router.push(`/game-result/summary/${gameResultId}`);
  };

  return (
    <>
      {gameResult.map((game, index) => (
        <div key={game.game_result_id}>
          <Card className="px-4 py-3 relative">
            <Button
              color="primary"
              variant="ghost"
              radius="full"
              size="sm"
              className="w-fit absolute right-4 top-3 z-20"
              onClick={() => handleGameResultEdit(game.game_result_id)}
            >
              詳細
            </Button>
            <CardHeader className="p-0 flex-col items-start">
              <div className="flex items-center gap-x-2">
                {game.match_result?.match_type ? (
                  <>
                    <Chip
                      variant="faded"
                      classNames={{
                        base: "border-small border-zic-500 px-2",
                        content: "text-yellow-500 text-xs",
                      }}
                    >
                      {game.match_result.match_type === "regular"
                        ? "公式戦"
                        : game.match_result.match_type === "open"
                        ? "オープン戦"
                        : ""}
                    </Chip>
                    <p className="text-sm font-normal text-zinc-400">
                      {new Date(
                        game.match_result.date_and_time
                      ).toLocaleDateString()}
                    </p>
                  </>
                ) : (
                  ""
                )}
              </div>
              <p className="text-sm mt-2 text-zinc-400">
                {tournamentNames[game.match_result?.tournament_id]}
              </p>
              <div className="flex gap-x-3 items-center mt-1">
                <div className="flex gap-x-2 items-baseline">
                  {renderScoreResult(game.match_result)}
                  <div className="flex gap-x-2 items-baseline">
                    <p className="text-lg font-bold">
                      {game.match_result?.my_team_score} -{" "}
                      {game.match_result?.opponent_team_score}
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-1 items-baseline">
                  <span className="text-base font-normal text-zinc-400">
                    vs.
                  </span>
                  <p className="text-base font-bold">
                    {opponentTeamNames[game.match_result?.opponent_team_id]}
                  </p>
                </div>
              </div>
            </CardHeader>
            <Divider className="my-3" />
            <CardBody className="p-0">
              <p className="text-sm font-normal text-zinc-400">打撃</p>
              <ul className="flex flex-wrap gap-2 ">
                {plateAppearance
                  .flat()
                  .filter(
                    (plate: PlateAppearance) =>
                      plate.game_result_id == game.game_result_id
                  )
                  .map((plate: PlateAppearance) => (
                    <li
                      key={plate.id}
                      className={`font-bold ${getBattingResultClassName(
                        plate.batting_result
                      )}`}
                    >
                      {plate.batting_result}
                    </li>
                  ))}
              </ul>
              <p className="text-sm font-normal text-zinc-400 mt-2">投手</p>
              <ul className="flex flex-wrap gap-2 ">
                {game.pitching_result &&
                game.pitching_result.innings_pitched != null ? (
                  <>
                    <li className="font-light">
                      {getInningPitched(game.pitching_result.innings_pitched)}
                    </li>
                    <li className="font-light">
                      {game.pitching_result.run_allowed}失点
                    </li>
                  </>
                ) : (
                  <></>
                )}
                {game.pitching_result ? (
                  <>
                    {game.pitching_result.win === 1 ? (
                      <li className="text-red-500 font-bold">勝利投手</li>
                    ) : game.pitching_result.loss === 1 ? (
                      <li className="text-blue-400 font-bold">敗戦投手</li>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <></>
                )}
              </ul>
            </CardBody>
          </Card>
        </div>
      ))}
    </>
  );
}
