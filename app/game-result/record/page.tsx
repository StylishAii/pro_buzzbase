"use client";
import {
  Autocomplete,
  AutocompleteItem,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const testTournamentData = [
  { id: 1, name: "甲子園" },
  { id: 2, name: "甲子園山梨県予選" },
  { id: 3, name: "春の山梨県大会" },
  { id: 4, name: "新東京大学リーグ2016春" },
];

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

const defensivePositions = [
  { id: 1, position: "投手" },
  { id: 2, position: "捕手" },
  { id: 3, position: "一塁手" },
  { id: 4, position: "二塁手" },
  { id: 5, position: "三塁手" },
  { id: 6, position: "遊撃手" },
  { id: 7, position: "左翼手" },
  { id: 8, position: "中堅手" },
  { id: 9, position: "右翼手" },
  { id: 10, position: "指名打者" },
];

export default function GameRecord() {
  const [size, setSize] = useState(window.innerWidth <= 400 ? "sm" : "md");

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth <= 400 ? "sm" : "md");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div>
        <div className="pt-20 px-4">
          <h2 className="text-xl font-bold text-center">
            試合結果を入力しよう！
          </h2>
          <div className="flex items-center justify-center gap-x-2 mt-5">
            <p className="text-sm">試合結果</p>
            <span className="opacity-50">→</span>
            <p className="text-sm opacity-50">打撃結果</p>
            <span className="opacity-50">→</span>
            <p className="text-sm opacity-50">投手結果</p>
          </div>
          <div className="mt-6 py-5 px-6 bg-bg_sub rounded-xl">
            <form>
              <Input
                isRequired
                type="date"
                size="md"
                variant="bordered"
                label="試合日時"
                labelPlacement="outside-left"
                className="flex justify-between items-center"
              />
              <Divider className="my-4" />
              <RadioGroup
                isRequired
                label="試合種類"
                orientation="horizontal"
                defaultValue="regular"
                color="primary"
                size="sm"
                className="text-sm flex justify-between items-center flex-row"
              >
                <Radio value="regular">公式戦</Radio>
                <Radio value="open">オープン戦</Radio>
              </RadioGroup>
              <Divider className="my-4" />
              <Autocomplete
                allowsCustomValue
                label="大会名"
                variant="bordered"
                placeholder="大会名を入力！"
                labelPlacement="outside-left"
                className="[&>div]:justify-between"
                size={size}
              >
                {testTournamentData.map((data) => (
                  <AutocompleteItem key={data.id} value={data.name}>
                    {data.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Divider className="my-4" />
              <Autocomplete
                isRequired
                allowsCustomValue
                label="自チーム"
                variant="bordered"
                placeholder="自分のチーム名を入力！"
                labelPlacement="outside-left"
                className="[&>div]:justify-between"
                size={size}
              >
                {testTournamentData.map((data) => (
                  <AutocompleteItem key={data.id} value={data.name}>
                    {data.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Divider className="my-4" />
              <Autocomplete
                isRequired
                allowsCustomValue
                label="相手チーム"
                variant="bordered"
                placeholder="相手のチーム名を入力！"
                labelPlacement="outside-left"
                className="[&>div]:justify-between"
                size={size}
              >
                {testTournamentData.map((data) => (
                  <AutocompleteItem key={data.id} value={data.name}>
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
                  />
                </div>
              </div>
              <Divider className="my-4" />
              <Select
                isRequired
                variant="bordered"
                label="打順"
                labelPlacement="outside-left"
                size="md"
                fullWidth={false}
                className="grid justify-between items-center grid-cols-[auto_78px]"
              >
                {battingOrder.map((order) => (
                  <SelectItem key={order.id} value={order.id.toString()}>
                    {order.turn}
                  </SelectItem>
                ))}
              </Select>
              <Divider className="my-4" />
              <Select
                isRequired
                variant="bordered"
                label="守備位置"
                labelPlacement="outside-left"
                size="md"
                fullWidth={false}
                className="grid justify-between items-center grid-cols-[auto_110px]"
              >
                {defensivePositions.map((position) => (
                  <SelectItem key={position.id} value={position.id.toString()}>
                    {position.position}
                  </SelectItem>
                ))}
              </Select>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
