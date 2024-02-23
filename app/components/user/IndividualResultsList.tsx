import BattingAverageTable from "@app/components/table/BattingAverageTable";
import PitchingRecordTable from "@app/components/table/PitchingRecordTable";
import { getPersonalBattingAverage } from "@app/hooks/batting/getPersonalBattingAverage";
import { getPersonalBattingStatus } from "@app/hooks/batting/getPersonalBattingStatus";
import { getPersonalPitchingResult } from "@app/hooks/pitching/getPersonalPitchingResult";
import { getPersonalPitchingResultStats } from "@app/hooks/pitching/getPersonalPitchingResultStats";
import { Skeleton } from "@nextui-org/react";

type UserId = {
  userId: number;
};

type PersonalBattingAverages = {
  number_of_matches: number;
  base_on_balls: number;
  caught_stealing: number;
  error: number;
  hit: number;
  hit_by_pitch: number;
  home_run: number;
  id: number;
  run: number;
  runs_batted_in: number;
  sacrifice_hit: number;
  stealing_base: number;
  strike_out: number;
  three_base_hit: number;
  times_at_bat: number;
  total_bases: number;
  two_base_hit: number;
  at_bats: number;
};

type PersonalBattingStatus = {
  batting_average: number;
  bb_per_k: number;
  iso: number;
  isod: number;
  on_base_percentage: number;
  ops: number;
};

type PersonalPitchingResults = {
  number_of_appearances: number;
  win: number;
  loss: number;
  hold: number;
  saves: number;
  innings_pitched: number;
  hits_allowed: number;
  home_runs_hit: number;
  strikeouts: number;
  base_on_balls: number;
  hit_by_pitch: number;
  run_allowed: number;
  earned_run: number;
};

type PersonalPitchingStatus = {
  bb_per_nine: number;
  complete_games: number;
  era: number;
  k_bb: number;
  k_per_nine: number;
  shutouts: number;
  whip: number;
  win_percentage: number;
};

export default function IndividualResultsList(props: UserId) {
  const { userId } = props;
  const { personalBattingAverages, isLoadingBA } =
    getPersonalBattingAverage(userId);
  const { personalBattingStatus, isLoadingBS } =
    getPersonalBattingStatus(userId);
  const { personalPitchingResults, isLoadingPR } =
    getPersonalPitchingResult(userId);
  const { personalPitchingStatus, isLoadingPS } =
    getPersonalPitchingResultStats(userId);

  const isLoading = isLoadingBA || isLoadingBS || isLoadingPR || isLoadingPS;

  if (isLoading) {
    return (
      <div className="my-6">
        <Skeleton className="rounded-lg">
          <div className="h-80 w-full rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    );
  }

  return (
    <>
      <div className="bg-bg_sub p-4 rounded-xl lg:p-6">
        <div className="flex gap-x-4 mb-5">
          {/* <ResultsSelectBox
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
          /> */}
        </div>
        <h2 className="text-xl">打撃成績</h2>
        <BattingAverageTable
          personalBattingAverages={personalBattingAverages}
          personalBattingStatus={personalBattingStatus}
        />
        <h2 className="text-xl mt-8">投手成績</h2>
        <PitchingRecordTable
          personalPitchingResults={personalPitchingResults}
          personalPitchingStatus={personalPitchingStatus}
        />
      </div>
    </>
  );
}
