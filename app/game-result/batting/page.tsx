"use client";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import PlusButton from "@app/components/button/PlusButton";
import HeaderMatchResultNext from "@app/components/header/HeaderMatchResultSave";
import { DeleteIcon } from "@app/components/icon/DeleteIcon";
import {
  checkExistingBattingAverage,
  createBattingAverage,
  updateBattingAverage,
} from "@app/services/battingAveragesService";
import { getCurrentUserId } from "@app/services/userService";
import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  { id: 17, result: "併殺打" },
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
  併殺打: "併",
};

export default function BattingRecord() {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [runsBattedIn, setRunsBattedIn] = useState(0);
  const [run, setRun] = useState(0);
  const [defensiveError, setDefensiveError] = useState(0);
  const [stealingBase, setStealingBase] = useState(0);
  const [caughtStealing, setCaughtStealing] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLocalStorageId, setIsLocalStorageId] = useState(true);
  const [battingBoxes, setBattingBoxes] = useState<
    Array<{ position: number; result: number; text: string }>
  >([
    {
      position: 0,
      result: 0,
      text: battingResultsPositions[0].direction + battingResultsList[0].result,
    },
  ]);
  const [localStorageGameResultId, setLocalStorageGameResultId] = useState<
    number | null
  >(null);
  const router = useRouter();
  const pathname = usePathname();

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
    }
  }, [pathname]);

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
  const handleRunsBattedInChange = (e: any) =>
    setRunsBattedIn(Number(e.target.value));

  // 得点
  const handleRunChange = (e: any) => setRun(Number(e.target.value));

  // 失策
  const handleErrorChange = (e: any) =>
    setDefensiveError(Number(e.target.value));

  // 盗塁
  const handleStealingBaseChange = (e: any) =>
    setStealingBase(Number(e.target.value));

  // 盗塁死
  const handleCaughtStealingChange = (e: any) =>
    setCaughtStealing(Number(e.target.value));

  // 打球方向
  const createHandlePositionChange = (index: number) => (keys: any) => {
    const newPosition = Number(keys.values().next().value);
    updateBattingBox(index, newPosition, battingBoxes[index].result);
  };

  // 打球結果
  const createHandleResultChange = (index: number) => (keys: any) => {
    const newResult = Number(keys.values().next().value);
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
    if (!validateForm()) {
      return;
    }
    setErrors([]);
    console.log(currentUserId);
    console.log(localStorageGameResultId);
    const battingAverageData = {
      batting_average: {
        game_result_id: localStorageGameResultId,
        user_id: currentUserId,
        runs_batted_in: runsBattedIn,
        run: run,
        error: defensiveError,
        stealing_base: stealingBase,
        caught_stealing: caughtStealing,
      },
    };
    console.log(battingBoxes);
    console.log(battingAverageData);
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
        await createBattingAverage(battingAverageData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <HeaderMatchResultNext onMatchResultNext={handleSubmit} />
      <main className="h-full">
        <div className="pb-32 relative">
          <ErrorMessages errors={errors} />
          <div className="pt-20 px-4">
            <h2 className="text-xl font-bold text-center">
              打撃成績を入力しよう！
            </h2>
            <div className="flex items-center justify-center gap-x-2 mt-5">
              <p className="text-sm opacity-50">試合結果</p>
              <span className="opacity-50">→</span>
              <p className="text-sm">打撃結果</p>
              <span className="opacity-50">→</span>
              <p className="text-sm opacity-50">投手結果</p>
            </div>
            <div className="mt-6 py-5 px-6 bg-bg_sub rounded-xl">
              <form>
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
                      defaultValue="0"
                      // color={isMyTeamScoreValid ? "default" : "danger"}
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
                      defaultValue="0"
                      // color={isMyTeamScoreValid ? "default" : "danger"}
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
                      defaultValue="0"
                      // color={isMyTeamScoreValid ? "default" : "danger"}
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
                      defaultValue="0"
                      // color={isMyTeamScoreValid ? "default" : "danger"}
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
                      defaultValue="0"
                      // color={isMyTeamScoreValid ? "default" : "danger"}
                      min={0}
                      onChange={handleCaughtStealingChange}
                    />
                  </div>
                </>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
