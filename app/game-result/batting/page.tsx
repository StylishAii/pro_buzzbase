"use client";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import PlusButton from "@app/components/button/PlusButton";
import HeaderResult from "@app/components/header/HeaderResult";
import { DeleteIcon } from "@app/components/icon/DeleteIcon";
import { NextArrowIcon } from "@app/components/icon/NextArrowIcon";
import LoadingSpinner from "@app/components/spinner/LoadingSpinner";
import { useAuthContext } from "@app/contexts/useAuthContext";
import {
  checkExistingBattingAverage,
  createBattingAverage,
  updateBattingAverage,
} from "@app/services/battingAveragesService";
import { updateBattingAverageId } from "@app/services/gameResultsService";
import {
  checkExistingPlateAppearance,
  createPlateAppearance,
  getCurrentPlateAppearance,
  updatePlateAppearance,
} from "@app/services/plateAppearanceService";
import { getCurrentUserId } from "@app/services/userService";
import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const battingResultsPositions = [
  { id: 0, direction: "-" },
  { id: 1, direction: "投" },
  { id: 2, direction: "捕" },
  { id: 3, direction: "一" },
  { id: 4, direction: "二" },
  { id: 5, direction: "三" },
  { id: 6, direction: "遊" },
  { id: 7, direction: "左" },
  { id: 8, direction: "中" },
  { id: 9, direction: "右" },
];

const battingResultsList = [
  { id: 0, result: "-" },
  { id: 1, result: "ゴロ" },
  { id: 2, result: "フライ" },
  { id: 3, result: "ファールフライ" },
  { id: 4, result: "ライナー" },
  { id: 5, result: "エラー" },
  { id: 6, result: "フィルダースチョイス" },
  { id: 7, result: "ヒット" },
  { id: 8, result: "二塁打" },
  { id: 9, result: "三塁打" },
  { id: 10, result: "本塁打" },
  { id: 11, result: "犠打/犠飛" },
  { id: 12, result: "三振" },
  { id: 13, result: "振り逃げ" },
  { id: 14, result: "四球" },
  { id: 15, result: "死球" },
  { id: 16, result: "打撃妨害" },
  { id: 17, result: "走塁妨害" },
  { id: 18, result: "併殺打" },
];

const resultShortForms: Record<string, string> = {
  ゴロ: "ゴ",
  フライ: "飛",
  ファールフライ: "邪飛",
  ライナー: "直",
  エラー: "失",
  フィルダースチョイス: "野選",
  ヒット: "安",
  二塁打: "二",
  三塁打: "三",
  本塁打: "本",
  "犠打/犠飛": "犠",
  振り逃げ: "振逃",
  打撃妨害: "打妨",
  走塁妨害: "走妨",
  併殺打: "併",
};

type BattingBox = {
  position: number;
  result: number;
  text: string;
};

// 打撃成績計算
const useBattingStatistics = (battingBoxes: BattingBox[]) => {
  const calculateStatistics = () => {
    let totalBases = 0;
    let strikeOuts = 0;
    let baseOnBalls = 0;
    let hitByPitch = 0;
    let sacrificeHit = 0;

    const validBoxes = battingBoxes.filter(
      (box) => box.position !== 0 || box.result !== 0
    );
    const excludedResults = [14, 15, 11, 16, 17];
    const excludedCount = battingBoxes.filter((box) =>
      excludedResults.includes(box.result)
    ).length;

    const timesAtBat = validBoxes.length;
    const atBats = timesAtBat - excludedCount;
    const hit = battingBoxes.filter((box) => box.result === 7).length;
    const twoBaseHit = battingBoxes.filter((box) => box.result === 8).length;
    const threeBaseHit = battingBoxes.filter((box) => box.result === 9).length;
    const homeRun = battingBoxes.filter((box) => box.result === 10).length;

    battingBoxes.forEach((box) => {
      if (box.result === 7) totalBases += 1;
      if (box.result === 8) totalBases += 2;
      if (box.result === 9) totalBases += 3;
      if (box.result === 10) totalBases += 4;

      if (box.result === 12 || box.result === 13) strikeOuts += 1;
      if (box.result === 14) baseOnBalls += 1;
      if (box.result === 15) hitByPitch += 1;
      if (box.result === 11) sacrificeHit += 1;
    });

    return {
      timesAtBat,
      atBats,
      hit,
      twoBaseHit,
      threeBaseHit,
      homeRun,
      totalBases,
      strikeOuts,
      baseOnBalls,
      hitByPitch,
      sacrificeHit,
    };
  };
  return useMemo(calculateStatistics, [battingBoxes]);
};

export default function BattingRecord() {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [runsBattedIn, setRunsBattedIn] = useState(0);
  const [existingRunsBattedIn, setExistingRunsBattedIn] = useState(0);
  const [run, setRun] = useState(0);
  const [existingRun, setExistingRun] = useState(0);
  const [defensiveError, setDefensiveError] = useState(0);
  const [existingDefensiveError, setExistingDefensiveError] = useState(0);
  const [stealingBase, setStealingBase] = useState(0);
  const [existingStealingBase, setExistingStealingBase] = useState(0);
  const [caughtStealing, setCaughtStealing] = useState(0);
  const [existingCaughtStealing, setExistingCaughtStealing] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLocalStorageId, setIsLocalStorageId] = useState(true);
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
  const [selectedResults, setSelectedResults] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [battingBoxes, setBattingBoxes] = useState<
    Array<{ position: number; result: number; text: string }>
  >([
    {
      position: 0,
      result: 0,
      text: battingResultsPositions[0].direction + battingResultsList[0].result,
    },
  ]);
  const [existingBattingBoxes, setExistingBattingBoxes] = useState<
    Array<{
      positionId: number;
      positionName: string;
      resultId: number;
      resultName: string;
      text: string;
    }>
  >([
    {
      positionId: 0,
      positionName: "",
      resultId: 0,
      resultName: "",
      text: battingResultsPositions[0].direction + battingResultsList[0].result,
    },
  ]);
  const [localStorageGameResultId, setLocalStorageGameResultId] = useState<
    number | null
  >(null);
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

  const {
    timesAtBat,
    atBats,
    hit,
    twoBaseHit,
    threeBaseHit,
    homeRun,
    totalBases,
    strikeOuts,
    baseOnBalls,
    hitByPitch,
    sacrificeHit,
  } = useBattingStatistics(battingBoxes);

  useEffect(() => {
    fetchData();
    // ローカルストレージからid取得
    const savedGameResultId = localStorage.getItem("gameResultId");
    if (savedGameResultId) {
      setLocalStorageGameResultId(JSON.parse(savedGameResultId));
      fetchExistingBattingAverage(JSON.parse(savedGameResultId));
      fetchExistingPlateAppearance(JSON.parse(savedGameResultId));
    }
  }, [pathname]);

  useEffect(() => {
    if (
      existingBattingBoxes.length > 0 &&
      existingBattingBoxes[0].positionId !== 0
    ) {
      const updatedBattingBoxes = existingBattingBoxes.map((box) => {
        return {
          position: box.positionId,
          result: box.resultId,
          text: box.text,
        };
      });
      setBattingBoxes(updatedBattingBoxes);
    }
  }, [existingBattingBoxes]);

  // 既に同じgame_result_idが存在する場合
  const fetchExistingBattingAverage = async (gameResultId: number) => {
    try {
      const currentUserId = await getCurrentUserId();
      const existingBattingAverage = await checkExistingBattingAverage(
        gameResultId,
        currentUserId
      );
      setExistingRunsBattedIn(existingBattingAverage.runs_batted_in);
      setExistingRun(existingBattingAverage.run);
      setExistingDefensiveError(existingBattingAverage.error);
      setExistingStealingBase(existingBattingAverage.stealing_base);
      setExistingCaughtStealing(existingBattingAverage.caught_stealing);
    } catch (error) {
      console.log(`Error fetch existing batting average:`, error);
    }
  };

  const fetchExistingPlateAppearance = async (gameResultId: number) => {
    try {
      const existingPlateAppearances = await getCurrentPlateAppearance(
        gameResultId
      );
      if (existingPlateAppearances.length > 0) {
        const newBattingBoxes = existingPlateAppearances.map((plate: any) => {
          const positionId =
            battingResultsPositions.find(
              (p) => p.id === plate.batting_position_id
            )?.id || null;
          const positionName =
            battingResultsPositions.find(
              (p) => p.id === plate.batting_position_id
            )?.direction || "";
          const resultId =
            battingResultsList.find((p) => p.id === plate.plate_result_id)
              ?.id || null;
          const resultName =
            battingResultsList.find((p) => p.id === plate.plate_result_id)
              ?.result || "";
          const shortFormResult = resultShortForms[resultName] || resultName;
          const text = `${positionName}${shortFormResult}`;

          return {
            positionId,
            positionName,
            resultId,
            resultName,
            text,
          };
        });
        setExistingBattingBoxes(newBattingBoxes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 打席追加
  const addBox = () => {
    setBattingBoxes([
      ...battingBoxes,
      {
        position: 0,
        result: 0,
        text:
          battingResultsPositions[0].direction + battingResultsList[0].result,
      },
    ]);
  };

  // 打席削除
  const handleDeleteBox = (index: number) => {
    const newBoxes = battingBoxes.filter((_, boxIndex) => boxIndex !== index);
    setBattingBoxes(newBoxes);
  };

  // 打点
  const handleRunsBattedInChange = (e: any) => {
    setExistingRunsBattedIn(Number(e.target.value));
    setRunsBattedIn(Number(e.target.value));
  };

  // 得点
  const handleRunChange = (e: any) => {
    setExistingRun(Number(e.target.value));
    setRun(Number(e.target.value));
  };

  // 失策
  const handleErrorChange = (e: any) => {
    setExistingDefensiveError(Number(e.target.value));
    setDefensiveError(Number(e.target.value));
  };

  // 盗塁
  const handleStealingBaseChange = (e: any) => {
    setExistingStealingBase(Number(e.target.value));
    setStealingBase(Number(e.target.value));
  };

  // 盗塁死
  const handleCaughtStealingChange = (e: any) => {
    setExistingCaughtStealing(Number(e.target.value));
    setCaughtStealing(Number(e.target.value));
  };

  // 打球方向
  const createHandlePositionChange = (index: number) => (keys: any) => {
    const newPosition = Number(keys.values().next().value);
    setSelectedPositions([newPosition]);
    updateBattingBox(index, newPosition, battingBoxes[index].result);
  };

  // 打球結果
  const createHandleResultChange = (index: number) => (keys: any) => {
    const newResult = Number(keys.values().next().value);
    setSelectedResults([newResult]);
    updateBattingBox(index, battingBoxes[index].position, newResult);
  };

  // 打席結果
  const updateBattingBox = (
    index: number,
    positionIndex: number,
    resultIndex: number
  ) => {
    const updatedBoxes = battingBoxes.map((box, i) => {
      if (i === index) {
        const positionText =
          battingResultsPositions.find((p) => p.id === positionIndex)
            ?.direction || "";
        const resultText =
          battingResultsList.find((r) => r.id === resultIndex)?.result || "";
        const shortFormResult = resultShortForms[resultText] || resultText;
        return {
          position: positionIndex,
          result: resultIndex,
          text: `${positionText}${shortFormResult}`,
        };
      }
      return box;
    });
    setBattingBoxes(updatedBoxes);
  };

  // バリデーション
  const setErrorsWithTimeout = (newErrors: React.SetStateAction<string[]>) => {
    setErrors(newErrors);
    setTimeout(() => {
      setErrors([]);
    }, 3000);
  };
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

    if (!isValid) {
      setErrorsWithTimeout(newErrors);
    }

    return isValid;
  };

  // データ送信
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!validateForm() || isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setErrors([]);
    if (localStorageGameResultId == null || currentUserId == null) {
      return;
    }
    const battingAverageData = {
      batting_average: {
        game_result_id: localStorageGameResultId,
        user_id: currentUserId,
        // plate_appearances: ,
        times_at_bat: timesAtBat, // 打席数
        at_bats: atBats,
        hit: hit, // 安打数
        two_base_hit: twoBaseHit, // 2塁打数
        three_base_hit: threeBaseHit, // 3塁打数
        home_run: homeRun, // 本塁打数
        total_bases: totalBases, // 塁打数
        runs_batted_in: existingRunsBattedIn
          ? existingRunsBattedIn
          : runsBattedIn,
        run: existingRun ? existingRun : run,
        strike_out: strikeOuts, // 三振数
        base_on_balls: baseOnBalls, //四球
        hit_by_pitch: hitByPitch, // 死球
        sacrifice_hit: sacrificeHit, //犠打
        error: existingDefensiveError ? existingDefensiveError : defensiveError,
        stealing_base: existingStealingBase
          ? existingStealingBase
          : stealingBase,
        caught_stealing: existingCaughtStealing
          ? existingCaughtStealing
          : caughtStealing,
      },
    };
    const filteredBattingBoxes = battingBoxes.filter((box) => box.result !== 0);
    for (let i = 0; i < filteredBattingBoxes.length; i++) {
      const battingBox = battingBoxes[i];
      if (battingBox.text.replace("-", "") === "") continue;
      const plateAppearanceData = {
        plate_appearance: {
          game_result_id: localStorageGameResultId,
          user_id: currentUserId,
          batter_box_number: i + 1,
          batting_result: battingBox.text.replace("-", ""),
          batting_position_id: battingBox.position,
          plate_result_id: battingBox.result,
        },
      };
      // 打席ごと
      try {
        const existingPlateAppearance = await checkExistingPlateAppearance(
          plateAppearanceData.plate_appearance.game_result_id,
          plateAppearanceData.plate_appearance.user_id,
          plateAppearanceData.plate_appearance.batter_box_number
        );
        if (existingPlateAppearance) {
          await updatePlateAppearance(
            existingPlateAppearance.id,
            plateAppearanceData
          );
        } else {
          await createPlateAppearance(plateAppearanceData);
          console.log(plateAppearanceData);
        }
      } catch (error) {
        console.log(`plate error :${error}`);
      }
    }
    // 打撃トータル
    try {
      const existingBattingAverage = await checkExistingBattingAverage(
        battingAverageData.batting_average.game_result_id,
        currentUserId
      );
      if (existingBattingAverage) {
        await updateBattingAverage(
          existingBattingAverage.id,
          battingAverageData
        );
      } else {
        const response = await createBattingAverage(battingAverageData);
        if (
          typeof currentUserId !== "undefined" &&
          localStorageGameResultId !== null
        ) {
          const updateGameResultData = {
            game_result: {
              batting_average_id: response.id,
            },
          };
          await updateBattingAverageId(
            localStorageGameResultId,
            updateGameResultData
          );
        }
      }
      router.push(`/game-result/pitching/`);
    } catch (error) {
      console.log(`batting average ${error}`);
    }
  };
  return (
    <>
      <HeaderResult />
      {isSubmitting && <LoadingSpinner />}
      <main className="h-full ">
        <div className="pb-32 relative w-full max-w-[720px] mx-auto lg:m-[0_auto_0_28%]">
          <ErrorMessages errors={errors} />
          <div className="pt-12 px-4 lg:border-x-1 lg:border-b-1 lg:border-zinc-500 lg:px-6 lg:pb-6">
            <div className="flex items-center justify-center gap-x-2">
              <p className="text-xl font-medium opacity-40 lg:text-2xl">
                試合結果
              </p>
              <span className="opacity-40 lg:text-lg">→</span>
              <p className="text-xl font-medium text-yellow-500 lg:text-2xl">
                打撃結果
              </p>
              <span className="opacity-40 lg:text-lg">→</span>
              <p className="text-xl font-medium opacity-40 lg:text-2xl">
                投手結果
              </p>
            </div>
            <h2 className="text-base text-center mt-5 lg:text-lg">
              打撃結果を入力しよう！
            </h2>

            <form>
              <div className="mt-6 py-5 px-6 bg-bg_sub rounded-xl">
                <>
                  {/* 打席 */}
                  <div className="grid gap-y-3">
                    {battingBoxes.map((box, index) => (
                      <div
                        key={index}
                        className="bg-main p-3 rounded-lg border-1 border-zinc-700"
                      >
                        <p className="text-lg font-bold mb-1">
                          第{index + 1}打席
                        </p>
                        <div className="grid grid-cols-[72px_auto] gap-x-2">
                          <Select
                            size="sm"
                            variant="underlined"
                            labelPlacement="outside-left"
                            placeholder="方向"
                            aria-label="打球方向"
                            onSelectionChange={createHandlePositionChange(
                              index
                            )}
                            selectedKeys={
                              box.position !== null
                                ? [box.position.toString()]
                                : []
                            }
                          >
                            {battingResultsPositions.map((position) => (
                              <SelectItem key={position.id} value={position.id}>
                                {position.direction}
                              </SelectItem>
                            ))}
                          </Select>
                          <Select
                            size="sm"
                            variant="underlined"
                            labelPlacement="outside-left"
                            label=""
                            placeholder="打球結果"
                            aria-label="打球結果"
                            value={box.result}
                            onSelectionChange={createHandleResultChange(index)}
                            selectedKeys={
                              box.result !== null ? [box.result.toString()] : []
                            }
                          >
                            {battingResultsList.map((result) => (
                              <SelectItem key={result.id} value={result.id}>
                                {result.result}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                        <div className="flex items-end">
                          <div className="font-bold w-fit ml-auto mr-0 mt-2 pb-1 border-b-2 border-yellow-600">
                            {box.text}
                          </div>
                          <Button
                            className="p-0 w-auto min-w-max h-auto border-none block bg-transparent ml-6"
                            color="primary"
                            variant="faded"
                            size="sm"
                            isIconOnly
                            onClick={() => handleDeleteBox(index)}
                            endContent={
                              <DeleteIcon
                                width="24"
                                height="24"
                                fill="#d0d0d0"
                                stroke="fff"
                              />
                            }
                          ></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <PlusButton
                    className="mt-4 ml-auto mr-0 block rounded-large"
                    type="button"
                    onClick={addBox}
                  />
                  <Divider className="mt-8 mb-4" />
                  {/* その他結果 */}
                  <div className="grid grid-cols-2 gap-y-5 gap-x-2 mt-7">
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="打点"
                      labelPlacement="outside-left"
                      placeholder="打点"
                      className="[&>div]:w-20"
                      value={
                        existingRunsBattedIn !== undefined
                          ? existingRunsBattedIn.toString()
                          : "0"
                      }
                      min={0}
                      onChange={handleRunsBattedInChange}
                    />
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="得点"
                      labelPlacement="outside-left"
                      placeholder="得点"
                      className="[&>div]:w-20"
                      value={
                        existingRun !== undefined ? existingRun.toString() : "0"
                      }
                      min={0}
                      onChange={handleRunChange}
                    />
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="失策"
                      labelPlacement="outside-left"
                      placeholder="失策"
                      className="[&>div]:w-20"
                      value={
                        existingDefensiveError !== undefined
                          ? existingDefensiveError.toString()
                          : "0"
                      }
                      min={0}
                      onChange={handleErrorChange}
                    />
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="盗塁"
                      labelPlacement="outside-left"
                      placeholder="盗塁"
                      className="[&>div]:w-20"
                      value={
                        existingStealingBase !== undefined
                          ? existingStealingBase.toString()
                          : "0"
                      }
                      min={0}
                      onChange={handleStealingBaseChange}
                    />
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="盗塁死"
                      labelPlacement="outside-left"
                      placeholder="盗塁死"
                      className="[&>div]:w-20"
                      value={
                        existingCaughtStealing !== undefined
                          ? existingCaughtStealing.toString()
                          : "0"
                      }
                      min={0}
                      onChange={handleCaughtStealingChange}
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
                  isDisabled={isSubmitting}
                >
                  投手結果
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
