"use client";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import HeaderMatchResultNext from "@app/components/header/HeaderMatchResultSave";
import { getCurrentUserId } from "@app/services/userService";
import {
  Checkbox,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const winOrLoss = [
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
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [localStorageGameResultId, setLocalStorageGameResultId] = useState<
    number | null
  >(null);
  const [errors, setErrors] = useState<string[]>([]);
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

  // 勝敗
  const handleWinOrLossChange = (value: any) => {};

  // 投球回数
  const createHandleInningsChange = () => {};
  const createHandleFractionsChange = () => {};

  // 投球数
  const handleNumberPitchesChange = () => {};

  // データ送信
  const handleSubmit = async (event: any) => {};
  return (
    <>
      <HeaderMatchResultNext onMatchResultNext={handleSubmit} text={"保存"}/>
      <main className="h-full">
        <div className="pb-32 relative">
          <ErrorMessages errors={errors} />
          <div className="pt-20 px-4">
            <h2 className="text-xl font-bold text-center">
              投手成績を入力しよう！
            </h2>
            <div className="flex items-center justify-center gap-x-2 mt-5">
              <p className="text-sm opacity-50">試合結果</p>
              <span className="opacity-50">→</span>
              <p className="text-sm opacity-50">打撃結果</p>
              <span className="opacity-50">→</span>
              <p className="text-sm">投手結果</p>
            </div>
            <div className="mt-6 py-5 px-6 bg-bg_sub rounded-xl">
              <form>
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
                  />
                  <Divider className="my-4" />
                  <div className="flex items-center justify-between">
                    <p>完投</p>
                    <Checkbox
                    // isSelected={isSelected}
                    // onValueChange={setIsSelected}
                    ></Checkbox>
                  </div>
                  <Divider className="my-4" />
                  {/* その他結果 */}
                  <div className="grid grid-cols-2 gap-y-5 gap-x-2 mt-7">
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
                      // onChange={handleRunsBattedInChange}
                    />
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="自責"
                      labelPlacement="outside-left"
                      placeholder="自責"
                      className="[&>div]:w-20"
                      defaultValue="0"
                      min={0}
                      // onChange={handleRunChange}
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
                      // onChange={handleErrorChange}
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
                      // onChange={handleErrorChange}
                    />
                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="三振"
                      labelPlacement="outside-left"
                      placeholder="三振"
                      className="[&>div]:w-20"
                      defaultValue="0"
                      min={0}
                      // onChange={handleErrorChange}
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
                      // onChange={handleErrorChange}
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
                      // onChange={handleErrorChange}
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
