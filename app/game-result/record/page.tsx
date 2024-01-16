"use client";
import { getPositions } from "@app/services/positionService";
import { getTeams } from "@app/services/teamsService";
import { getUserData } from "@app/services/userService";
import {
  Autocomplete,
  AutocompleteItem,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { SetStateAction, useEffect, useState } from "react";

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
  user_id: string;
  url: string;
  introduction: string;
  positions: Position[];
  team_id: number;
};

export default function GameRecord() {
  const [userDate, setUserDate] = useState<userData | null>(null);
  const [myTeam, setMyTeam] = useState("");
  const [teamsDate, setTeamsData] = useState<Team[]>([]);
  const [positionData, setPositionData] = useState<Position[]>([]);
  const [myPosition, setMyPosition] = useState("");

  const fetchData = async () => {
    try {
      const currentUserData = await getUserData();
      setUserDate(currentUserData);
      const userTeamId = currentUserData.team_id;
      const getTeamsList = await getTeams();
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
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // 守備位置設定
    if (userDate && positionData.length > 0) {
      const userPositionFirstId = userDate.positions[0].id;
      const userPosition = positionData.find(
        (position) => position.id === userPositionFirstId
      );
      console.log(userPosition);
      if (userPosition) {
        setMyPosition(userPosition.id.toString());
      }
    }
  }, [userDate, positionData]);

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
    setGameDate(event.target.value);
  };

  return (
    <>
      <div className="pb-32">
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
                label="試合日付"
                labelPlacement="outside-left"
                className="flex justify-between items-center"
                value={gameDate}
                onChange={handleDateChange}
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
                placeholder="大会名を入力"
                labelPlacement="outside-left"
                className="[&>div]:justify-between"
                size="md"
              >
                {testTournamentData.map((data) => (
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
                value={myTeam}
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
              >
                {teamsDate.map((data) => (
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
                selectedKeys={myPosition}
                className="grid justify-between items-center grid-cols-[auto_110px]"
              >
                {positionData.map((position) => (
                  <SelectItem
                    key={position.id}
                    value={position.id.toString()}
                    textValue={position.name}
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
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
