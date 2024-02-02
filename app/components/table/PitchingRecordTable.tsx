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

type Props = {
  personalPitchingResults: PersonalPitchingResults[];
  personalPitchingStatus: PersonalPitchingStatus | undefined;
};

export default function PitchingRecordTable(props: Props) {
  const { personalPitchingResults, personalPitchingStatus } = props;

  const pitchingResult =
    personalPitchingResults.length > 0 ? personalPitchingResults[0] : undefined;

  const pitchingStats = personalPitchingStatus
    ? personalPitchingStatus
    : undefined;

  const displayValue = (value: number | undefined) => {
    if (value === undefined) {
      return "-";
    } else {
      const formattedValue = value.toString();
      return formattedValue.startsWith("0.")
        ? formattedValue.substring(1)
        : formattedValue;
    }
  };

  const styleTableBox = "grid grid-cols-2 text-center";
  const styleTableTitle =
    "border-r-1 border-b-1 border-r-zinc-500 border-b-zinc-500 text-sm py-2.5 font-normal text-zic-300";
  const styleTableData =
    "bg-sub text-sm py-2.5 font-medium border-b-1 border-b-zinc-500";

  return (
    <>
      <div className="mt-4 border-x-1 border-t-1 border-zinc-500 rounded-md overflow-hidden">
        <div className="grid grid-cols-2">
          <div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>防御率</p>
              <span className={styleTableData}>
                {displayValue(pitchingStats?.era)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>勝利</p>
              <span className={styleTableData}>
                {displayValue(pitchingResult?.win)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>ホールド</p>
              <span className={styleTableData}>
                {displayValue(pitchingResult?.hold)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>完投</p>
              <span className={styleTableData}>
                {displayValue(pitchingStats?.complete_games)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>勝率</p>
              <span className={styleTableData}>
                {displayValue(pitchingStats?.win_percentage)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>失点</p>
              <span className={styleTableData}>
                {displayValue(pitchingResult?.run_allowed)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>被安打数</p>
              <span className={styleTableData}>
                {displayValue(pitchingResult?.hits_allowed)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>奪三振</p>
              <span className={styleTableData}>
                {displayValue(pitchingResult?.strikeouts)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>与四球</p>
              <span className={styleTableData}>
                {displayValue(pitchingResult?.base_on_balls)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>BB/9</p>
              <span className={styleTableData}>
                {displayValue(pitchingStats?.bb_per_nine)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={`${styleTableTitle} rounded-bl-md`}>WHIP</p>
              <span className={styleTableData}>
                {displayValue(pitchingStats?.whip)}
              </span>
            </div>
          </div>
          <div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>登板</p>
              <span className={styleTableData}>
                {displayValue(pitchingResult?.number_of_appearances)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>敗戦</p>
              <span className={styleTableData}>
                {displayValue(pitchingResult?.loss)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>セーブ</p>
              <span className={styleTableData}>
                {displayValue(pitchingResult?.saves)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>完封</p>
              <span className={styleTableData}>
                {displayValue(pitchingStats?.shutouts)}
              </span>
            </div>

            <div className={styleTableBox}>
              <p className={styleTableTitle}>投球回</p>
              <span className={styleTableData}>
                {displayValue(pitchingResult?.innings_pitched)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>自責点</p>
              <span className={styleTableData}>
                {displayValue(pitchingResult?.earned_run)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>被本塁打</p>
              <span className={styleTableData}>
                {displayValue(pitchingResult?.home_runs_hit)}
              </span>
            </div>

            <div className={styleTableBox}>
              <p className={styleTableTitle}>与死球</p>
              <span className={styleTableData}>
                {displayValue(pitchingResult?.hit_by_pitch)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>K/9</p>
              <span className={styleTableData}>
                {displayValue(pitchingStats?.k_per_nine)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>K/BB</p>
              <span className={styleTableData}>
                {displayValue(pitchingStats?.k_bb)}
              </span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>---</p>
              <span className={`${styleTableData} rounded-br-md`}>---</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
