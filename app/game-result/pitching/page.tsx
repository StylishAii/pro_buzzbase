"use client";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import HeaderResult from "@app/components/header/HeaderResult";
import { NextArrowIcon } from "@app/components/icon/NextArrowIcon";
import LoadingSpinner from "@app/components/spinner/LoadingSpinner";
import { useAuthContext } from "@app/contexts/useAuthContext";
import { updatePitchingResultId } from "@app/services/gameResultsService";
import {
  checkExistingPitchingResult,
  createPitchingResult,
  updatePitchingResult,
} from "@app/services/pitchingResultsService";
import { getCurrentUserId } from "@app/services/userService";
import {
  Button,
  Checkbox,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const winOrLoss = [
  { id: -1, value: "-" },
  { id: 0, value: "勝利投手" },
  { id: 1, value: "敗戦投手" },
];

const innings = [
  { id: 0, count: "0" },
  { id: 1, count: "1" },
  { id: 2, count: "2" },
  { id: 3, count: "3" },
  { id: 4, count: "4" },
  { id: 5, count: "5" },
  { id: 6, count: "6" },
  { id: 7, count: "7" },
  { id: 8, count: "8" },
  { id: 9, count: "9" },
  { id: 10, count: "10" },
  { id: 11, count: "11" },
  { id: 12, count: "12" },
];

const fractions = [
  { id: 0, count: "0/3" },
  { id: 1, count: "1/3" },
  { id: 2, count: "2/3" },
];

export default function PitchingRecord() {
  const [win, setWin] = useState(0);
  const [existingWin, setExistingWin] = useState(0);
  const [loss, setLoss] = useState(0);
  const [existingLoss, setExistingLoss] = useState(0);
  const [selectedInnings, setSelectedInnings] = useState(0);
  const [existingSelectedInnings, setExistingSelectedInnings] = useState(0);
  const [selectedFractions, setSelectedFractions] = useState(0);
  const [existingSelectedFractions, setExistingSelectedFractions] = useState(0);
  const [existingTotalInnings, setExistingTotalInnings] = useState(0);
  const [gotToTheDistance, setGotToTheDistance] = useState(false);
  const [existingGotToTheDistance, setExistingGotToTheDistance] =
    useState(false);
  const [numberOfPitches, setNumberOfPitches] = useState(0);
  const [existingNumberOfPitches, setExistingNumberOfPitches] = useState(0);
  const [holds, setHolds] = useState(0);
  const [existingHolds, setExistingHolds] = useState(0);
  const [saves, setSaves] = useState(0);
  const [existingSaves, setExistingSaves] = useState(0);
  const [runsAllowed, setRunsAllowed] = useState(0);
  const [existingRunsAllowed, setExistingRunsAllowed] = useState(0);
  const [earnedRuns, setEarnedRuns] = useState(0);
  const [existingEarnedRuns, setExistingEarnedRuns] = useState(0);
  const [hitsAllowed, setHitsAllowed] = useState(0);
  const [existingHitsAllowed, setExistingHitsAllowed] = useState(0);
  const [homeRuns, setHomeRuns] = useState(0);
  const [existingHomeRuns, setExistingHomeRuns] = useState(0);
  const [strikeouts, setStrikeouts] = useState(0);
  const [existingStrikeouts, setExistingStrikeouts] = useState(0);
  const [basesOnBalls, setBasesOnBalls] = useState(0);
  const [existingBasesOnBalls, setExistingBasesOnBalls] = useState(0);
  const [hitByPitches, setHitByPitches] = useState(0);
  const [existingHitByPitches, setExistingHitByPitches] = useState(0);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localStorageGameResultId, setLocalStorageGameResultId] = useState<
    number | null
  >(null);
  const [errors, setErrors] = useState<string[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (isLoggedIn === false) {
      return router.push("/signin");
    }
  }, [router]);

  const fetchData = async () => {
    try {
      const currentUserIdData = await getCurrentUserId();
      setCurrentUserId(currentUserIdData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // ローカルストレージからid取得
    const savedGameResultId = localStorage.getItem("gameResultId");
    if (savedGameResultId) {
      setLocalStorageGameResultId(JSON.parse(savedGameResultId));
      fetchExistingPitchingResult(JSON.parse(savedGameResultId));
    }
  }, [pathname]);

  useEffect(() => {
    const inningInteger = Math.floor(existingTotalInnings);
    let inningsFraction = existingTotalInnings % 1;
    inningsFraction = Number(inningsFraction.toFixed(2));

    if (inningInteger) {
      setExistingSelectedInnings(inningInteger);
    }
    if (inningsFraction) {
      let fractionId = 0;
      if (inningsFraction === 0.33) {
        fractionId = 1;
      } else if (inningsFraction === 0.66) {
        fractionId = 2;
      }
      setExistingSelectedFractions(fractionId);
    }
  }, [existingTotalInnings]);

  // 既に同じgame_result_idが存在する場合
  const fetchExistingPitchingResult = async (gameResultId: number) => {
    try {
      const currentUserId = await getCurrentUserId();
      const existingPitchingResultData = await checkExistingPitchingResult(
        gameResultId,
        currentUserId
      );
      setExistingNumberOfPitches(existingPitchingResultData.number_of_pitches);
      setExistingGotToTheDistance(
        existingPitchingResultData.got_to_the_distance
      );
      setExistingWin(existingPitchingResultData.win);
      setExistingTotalInnings(existingPitchingResultData.innings_pitched);
      setExistingLoss(existingPitchingResultData.loss);
      setExistingHolds(existingPitchingResultData.hold);
      setExistingSaves(existingPitchingResultData.saves);
      setExistingRunsAllowed(existingPitchingResultData.run_allowed);
      setExistingEarnedRuns(existingPitchingResultData.earned_run);
      setExistingHitsAllowed(existingPitchingResultData.hits_allowed);
      setExistingHomeRuns(existingPitchingResultData.home_runs_hit);
      setExistingStrikeouts(existingPitchingResultData.strikeouts);
      setExistingBasesOnBalls(existingPitchingResultData.base_on_balls);
      setExistingHitByPitches(existingPitchingResultData.hit_by_pitch);
    } catch (error) {
      console.error("Error fetching existing pitting result:", error);
    }
  };

  // 勝敗
  const handleWinOrLossChange = (value: any) => {
    const selectValue = Array.from(value)[0];
    if (selectValue === "0") {
      setWin(1);
      setExistingWin(1);
      setLoss(0);
      setExistingLoss(0);
    } else if (selectValue === "1") {
      setWin(0);
      setExistingWin(0);
      setLoss(1);
      setExistingLoss(1);
    } else if (selectValue === "-1") {
      setWin(0);
      setExistingWin(0);
      setLoss(0);
      setExistingLoss(0);
    }
  };

  // 投球回数
  const createHandleInningsChange = (value: any) => {
    const selectValue = Array.from(value)[0] as number;
    setSelectedInnings(selectValue);
    setExistingSelectedInnings(selectValue);
  };
  const createHandleFractionsChange = (value: any) => {
    const selectValue = Array.from(value)[0] as number;
    const fractionValue = selectValue == 0 ? 0 : selectValue == 1 ? 0.33 : 0.66;
    setSelectedFractions(fractionValue);
    setExistingSelectedFractions(selectValue);
  };

  // 投球数
  const handleNumberPitchesChange = (event: any) => {
    setNumberOfPitches(event.target.value);
    setExistingNumberOfPitches(event.target.value);
  };

  // ホールド数
  const handleHoldChange = (event: any) => {
    setHolds(event.target.value);
    setExistingHolds(event.target.value);
  };

  // セーブ数
  const handleSaveChange = (event: any) => {
    setSaves(event.target.value);
    setExistingSaves(event.target.value);
  };

  // 失点
  const handleRunAllowedChange = (event: any) => {
    setRunsAllowed(event.target.value);
    setExistingRunsAllowed(event.target.value);
  };

  // 自責点
  const handleEarnedRunChange = (event: any) => {
    setEarnedRuns(event.target.value);
    setExistingEarnedRuns(event.target.value);
  };

  // 被安打
  const handleHitsAllowedChange = (event: any) => {
    setHitsAllowed(event.target.value);
    setExistingHitsAllowed(event.target.value);
  };

  // 被本塁打
  const handleHomeRunsChange = (event: any) => {
    setHomeRuns(event.target.value);
    setExistingHomeRuns(event.target.value);
  };

  // 奪三振
  const handleStrikeoutsChange = (event: any) => {
    setStrikeouts(event.target.value);
    setExistingStrikeouts(event.target.value);
  };

  // 四球
  const handleBaseOnBallsChange = (event: any) => {
    setBasesOnBalls(event.target.value);
    setExistingBasesOnBalls(event.target.value);
  };

  // 死球
  const handleHitByPitcherChange = (event: any) => {
    setHitByPitches(event.target.value);
    setExistingHitByPitches(event.target.value);
  };

  // データ送信
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (
      localStorageGameResultId == null ||
      currentUserId == null ||
      isSubmitting
    ) {
      return;
    }
    setIsSubmitting(true);
    let changeExistingFractions =
      existingSelectedFractions == 0
        ? 0
        : existingSelectedFractions == 1
        ? 0.33
        : 0.66;
    const totalInnings = existingTotalInnings
      ? Number(existingSelectedInnings) + Number(changeExistingFractions)
      : Number(selectedInnings) + Number(selectedFractions);
    console.log(totalInnings);
    try {
      const pitchingResultData = {
        pitching_result: {
          game_result_id: localStorageGameResultId,
          user_id: currentUserId,
          win: existingWin ? existingWin : win,
          loss: existingLoss ? existingLoss : loss,
          hold: existingHolds ? existingHolds : holds,
          saves: existingSaves ? existingSaves : saves,
          innings_pitched: totalInnings,
          number_of_pitches: existingNumberOfPitches
            ? existingNumberOfPitches
            : numberOfPitches,
          got_to_the_distance: existingGotToTheDistance
            ? existingGotToTheDistance
            : gotToTheDistance,
          run_allowed: existingRunsAllowed ? existingRunsAllowed : runsAllowed,
          earned_run: existingEarnedRuns ? existingEarnedRuns : earnedRuns,
          hits_allowed: existingHitsAllowed ? existingHitsAllowed : hitsAllowed,
          home_runs_hit: existingHomeRuns ? existingHomeRuns : homeRuns,
          strikeouts: existingStrikeouts ? existingStrikeouts : strikeouts,
          base_on_balls: existingBasesOnBalls
            ? existingBasesOnBalls
            : basesOnBalls,
          hit_by_pitch: existingHitByPitches
            ? existingHitByPitches
            : hitByPitches,
        },
      };
      const existingPitchingResult = await checkExistingPitchingResult(
        pitchingResultData.pitching_result.game_result_id,
        pitchingResultData.pitching_result.user_id
      );
      if (existingPitchingResult) {
        await updatePitchingResult(
          existingPitchingResult.id,
          pitchingResultData
        );
      } else {
        const response = await createPitchingResult(pitchingResultData);
        if (
          typeof currentUserId !== "undefined" &&
          localStorageGameResultId !== null
        ) {
          const updatePitchingResultData = {
            game_result: {
              pitching_result_id: response.id,
            },
          };
          await updatePitchingResultId(
            localStorageGameResultId,
            updatePitchingResultData
          );
        }
      }
      router.push(`/game-result/summary/`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <HeaderResult />
      {isSubmitting && <LoadingSpinner />}
      <main className="h-full">
        <div className="pb-32 relative w-full max-w-[720px] mx-auto lg:m-[0_auto_0_28%]">
          <ErrorMessages errors={errors} />
          <div className="pt-12 px-4 lg:border-x-1 lg:border-b-1 lg:border-zinc-500 lg:px-6 lg:pb-6">
            <div className="flex items-center justify-center gap-x-2">
              <p className="text-xl font-medium opacity-40 lg:text-2xl">
                試合結果
              </p>
              <span className="opacity-40 lg:text-lg">→</span>
              <p className="text-xl font-medium opacity-40 lg:text-2xl">
                打撃結果
              </p>
              <span className="opacity-40 lg:text-lg">→</span>
              <p className="text-xl font-medium text-yellow-500 lg:text-2xl">
                投手結果
              </p>
            </div>
            <h2 className="text-base text-center mt-5 lg:text-lg">
              投手結果を入力しよう！
            </h2>

            <form>
              <div className="mt-6 py-5 px-6 bg-bg_sub rounded-xl">
                <>
                  {/* 勝敗 */}
                  <Select
                    variant="faded"
                    label="勝敗"
                    labelPlacement="outside-left"
                    size="md"
                    fullWidth={false}
                    placeholder="勝敗を選択"
                    onSelectionChange={handleWinOrLossChange}
                    className="grid justify-between items-center grid-cols-[auto_180px]"
                    selectedKeys={
                      existingWin === 1
                        ? ["0"]
                        : existingLoss === 1
                        ? ["1"]
                        : ["-1"]
                    }
                  >
                    {winOrLoss.map((result) => (
                      <SelectItem
                        key={result.id}
                        value={result.id.toString()}
                        textValue={result.value}
                        className="text-white"
                      >
                        {result.value}
                      </SelectItem>
                    ))}
                  </Select>
                  <Divider className="my-4" />
                  {/* 投球回数 */}
                  <div className="grid grid-cols-[auto_86px] gap-x-2">
                    <div className="[&>div]:grid [&>div]:grid-cols-[100px_82px] [&>div]:items-center [&>div]:justify-between">
                      <Select
                        size="md"
                        variant="faded"
                        label="投球回数"
                        labelPlacement="outside-left"
                        placeholder="7回"
                        aria-label="投球回数"
                        onSelectionChange={createHandleInningsChange}
                        selectedKeys={
                          existingSelectedInnings !== undefined
                            ? [existingSelectedInnings.toString()]
                            : []
                        }
                      >
                        {innings.map((inning) => (
                          <SelectItem key={inning.id} value={inning.id}>
                            {inning.count}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    <Select
                      size="md"
                      variant="faded"
                      labelPlacement="outside-left"
                      placeholder="1/3"
                      aria-label="投球回数"
                      onSelectionChange={createHandleFractionsChange}
                      className="block"
                      selectedKeys={
                        existingSelectedFractions !== undefined
                          ? existingSelectedFractions.toString()
                          : ""
                      }
                    >
                      {fractions.map((fraction) => (
                        <SelectItem key={fraction.id} value={fraction.id}>
                          {fraction.count}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <Divider className="my-4" />
                  {/* 投球数 */}
                  <Input
                    type="number"
                    size="md"
                    variant="bordered"
                    label="投球数"
                    labelPlacement="outside-left"
                    placeholder="0"
                    className="justify-between [&>div]:w-20"
                    defaultValue="0"
                    min={0}
                    onChange={handleNumberPitchesChange}
                    value={
                      existingNumberOfPitches !== undefined
                        ? existingNumberOfPitches.toString()
                        : "0"
                    }
                  />
                  <Divider className="my-4" />
                  <div className="flex items-center justify-between">
                    <p>完投</p>
                    <Checkbox
                      defaultChecked={
                        existingGotToTheDistance
                          ? existingGotToTheDistance
                          : gotToTheDistance
                      }
                      isSelected={
                        existingGotToTheDistance
                          ? existingGotToTheDistance
                          : gotToTheDistance
                      }
                      onValueChange={setGotToTheDistance}
                    ></Checkbox>
                  </div>
                  <Divider className="my-4" />
                  {/* その他結果 */}
                  <div className="grid grid-cols-2 gap-y-5 gap-x-2 mt-7">
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="ホールド"
                      labelPlacement="outside-left"
                      placeholder="ホールド"
                      className="[&>div]:w-20"
                      defaultValue="0"
                      min={0}
                      onChange={handleHoldChange}
                      value={
                        existingHolds !== undefined
                          ? existingHolds.toString()
                          : "0"
                      }
                    />
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="セーブ"
                      labelPlacement="outside-left"
                      placeholder="セーブ"
                      className="[&>div]:w-20"
                      defaultValue="0"
                      min={0}
                      onChange={handleSaveChange}
                      value={
                        existingSaves !== undefined
                          ? existingSaves.toString()
                          : "0"
                      }
                    />
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="失点"
                      labelPlacement="outside-left"
                      placeholder="失点"
                      className="[&>div]:w-20"
                      defaultValue="0"
                      min={0}
                      onChange={handleRunAllowedChange}
                      value={
                        existingRunsAllowed !== undefined
                          ? existingRunsAllowed.toString()
                          : "0"
                      }
                    />
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="自責点"
                      labelPlacement="outside-left"
                      placeholder="自責点
                      "
                      className="[&>div]:w-20"
                      defaultValue="0"
                      min={0}
                      onChange={handleEarnedRunChange}
                      value={
                        existingEarnedRuns !== undefined
                          ? existingEarnedRuns.toString()
                          : "0"
                      }
                    />
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="被安打"
                      labelPlacement="outside-left"
                      placeholder="被安打"
                      className="[&>div]:w-20"
                      defaultValue="0"
                      min={0}
                      onChange={handleHitsAllowedChange}
                      value={
                        existingHitsAllowed !== undefined
                          ? existingHitsAllowed.toString()
                          : "0"
                      }
                    />
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="被本塁打"
                      labelPlacement="outside-left"
                      placeholder="被本塁打"
                      className="[&>div]:w-20"
                      defaultValue="0"
                      min={0}
                      onChange={handleHomeRunsChange}
                      value={
                        existingHomeRuns !== undefined
                          ? existingHomeRuns.toString()
                          : "0"
                      }
                    />
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="奪三振"
                      labelPlacement="outside-left"
                      placeholder="奪三振"
                      className="[&>div]:w-20"
                      defaultValue="0"
                      min={0}
                      onChange={handleStrikeoutsChange}
                      value={
                        existingStrikeouts !== undefined
                          ? existingStrikeouts.toString()
                          : "0"
                      }
                    />
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="四球"
                      labelPlacement="outside-left"
                      placeholder="四球"
                      className="[&>div]:w-20"
                      defaultValue="0"
                      min={0}
                      onChange={handleBaseOnBallsChange}
                      value={
                        existingBasesOnBalls !== undefined
                          ? existingBasesOnBalls.toString()
                          : "0"
                      }
                    />
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="死球"
                      labelPlacement="outside-left"
                      placeholder="死球"
                      className="[&>div]:w-20"
                      defaultValue="0"
                      min={0}
                      onChange={handleHitByPitcherChange}
                      value={
                        existingHitByPitches !== undefined
                          ? existingHitByPitches.toString()
                          : "0"
                      }
                    />
                  </div>
                </>
              </div>
              <div className="mt-8">
                <Button
                  color="primary"
                  size="md"
                  radius="sm"
                  className="ml-auto mr-0 px-6 font-bold text-base flex items-center"
                  onClick={handleSubmit}
                  endContent={<NextArrowIcon stroke="#F4F4F4" />}
                >
                  試合結果まとめ
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
