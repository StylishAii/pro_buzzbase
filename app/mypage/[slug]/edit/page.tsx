"use client";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import PlusButton from "@app/components/button/PlusButton";
import HeaderSave from "@app/components/header/HeaderSave";
import { DeleteIcon } from "@app/components/icon/DeleteIcon";
import SaveSpinner from "@app/components/spinner/SavingSpinner";
import {
  createAward,
  deleteAward,
  getUserAwards,
  updatePutAward,
} from "@app/services/awardsService";
import { getBaseballCategory } from "@app/services/baseballCategoryService";
import {
  getPositions,
  updateUserPositions,
} from "@app/services/positionService";
import { getPrefectures } from "@app/services/prefectureService";
import {
  createOrUpdateTeam,
  getTeams,
  updateTeam,
} from "@app/services/teamsService";
import { getUserData, updateProfile } from "@app/services/userService";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Position = {
  userId: string;
  position_id: number;
  id: string;
  name: string[];
};

type Prefecture = {
  id: number;
  name: string;
  hiragana: string;
  katakana: string;
  alphabet: string;
};

type BaseballCategory = {
  id: number;
  name: string;
  hiragana: string;
  katakana: string;
  alphabet: string;
};

type Teams = {
  prefecture_id: number;
  category_id: number;
  id: number;
  name: string;
};

export default function ProfileEdit() {
  const [profile, setProfile] = useState<{
    name: string;
    image: string | null;
    introduction: string;
    user_id: string | number;
    id: number;
  }>({
    name: "",
    image: null,
    introduction: "",
    user_id: "",
    id: 0,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [save, setSave] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedPositionIds, setSelectedPositionIds] = useState<string[]>([]);
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [baseballCategories, setBaseballCategories] = useState<
    BaseballCategory[]
  >([]);
  const [baseballCategoryValue, setBaseballCategoryValue] = useState("");
  const [teams, setTeams] = useState<Teams[] | undefined>(undefined);
  const [teamName, setTeamName] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >();
  const [selectedPrefectureId, setSelectedPrefectureId] = useState<
    number | undefined
  >(undefined);
  const [selectedTeamId, setSelectedTeamId] = useState<number | undefined>(
    undefined
  );
  const [deletedAwards, setDeletedAwards] = useState<number[]>([]);
  const [awards, setAwards] = useState<UserAwards[]>([]);
  const [updatedAwards, setUpdatedAwards] = useState<UserAwards[]>([]);
  const router = useRouter();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // ユーザーデータ取得
  const fetchData = async () => {
    try {
      const data = await getUserData();
      setProfile({
        name: data.name,
        image: data.image.url,
        introduction: data.introduction || "",
        user_id: data.user_id,
        id: data.id,
      });

      // ポジション一覧取得
      const positionsData = await getPositions();
      setPositions(positionsData);

      // チーム都道府県一覧取得
      const prefectureData = await getPrefectures();
      setPrefectures(prefectureData);

      // 野球カテゴリ一覧取得
      const baseballCategoryData = await getBaseballCategory();
      setBaseballCategories(baseballCategoryData);

      // チーム一覧取得
      const teamsData = await getTeams();
      setTeams(teamsData);

      const positionIds = data.positions.map((position: any) =>
        position.id.toString()
      );
      setSelectedPositionIds(positionIds);

      // チーム初期値設定
      if (data.team_id) {
        const userTeam = teamsData.find(
          (team: { id: any }) => team.id === data.team_id
        );
        if (userTeam) {
          setTeamName(userTeam.name);
          setSelectedTeamId(userTeam.id);
          setSelectedCategoryId(userTeam.category_id);
          setSelectedPrefectureId(userTeam.prefecture_id);
          const category = baseballCategoryData.find(
            (category: { id: number }) => category.id === userTeam.category_id
          );
          if (category) {
            setBaseballCategoryValue(category.name);
          }
        }
      }

      // 受賞歴初期値
      const userAwards = await getUserAwards(data.id);
      if (userAwards.length > 0) {
        setAwards(userAwards);
      } else {
        setAwards([{ id: Date.now(), title: "" }]);
      }
    } catch (error: any) {
      setErrors(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // disabled制御
  useEffect(() => {
    setIsDisabled(!teamName || teamName.length === 0);
  }, [teamName]);

  // ポジション選択
  const handleSelectChange = (keys: any) => {
    setSelectedPositionIds(Array.from(keys).map(String));
  };

  const handleChange = (e: any) => {
    if (e.target.name === "image") {
      const previewFileUrl =
        e.target.files && e.target.files[0]
          ? URL.createObjectURL(e.target.files[0])
          : null;
      setProfile((prevState) => ({
        ...prevState,
        image: previewFileUrl,
      }));
    } else {
      setProfile((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const setErrorsWithTimeout = (newErrors: React.SetStateAction<string[]>) => {
    setErrors(newErrors);
    setTimeout(() => {
      setErrors([]);
    }, 2000);
  };

  // データ送信
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isInvalid) {
      setErrorsWithTimeout(["名前が未入力、または無効です。"]);
      return;
    }
    // チーム設定バリデーション
    if (
      !teamName &&
      selectedTeamId === undefined &&
      (selectedCategoryId || selectedPrefectureId)
    ) {
      setErrorsWithTimeout(["チーム名が未入力です。"]);
      return;
    }
    if (teamName && (!selectedCategoryId || !selectedPrefectureId)) {
      setErrorsWithTimeout([
        "所属カテゴリーと所属地域の両方を入力してください。",
      ]);
      return;
    }

    const formData = new FormData();
    formData.append("user[name]", profile.name);
    formData.append("user[introduction]", profile.introduction);
    formData.append("user[user_id]", profile.user_id.toString());
    const file = fileInputRef.current?.files?.[0];
    if (profile.image && profile.image.startsWith("blob:") && file) {
      formData.append("user[image]", file);
    }

    let teamId = selectedTeamId;
    // チーム保存
    if (teamName.trim() !== "") {
      const teamData = {
        team: {
          name: teamName,
          category_id: selectedCategoryId,
          prefecture_id: selectedPrefectureId,
        },
      };
      if (selectedTeamId) {
        await updateTeam(selectedTeamId, teamData);
      } else {
        const team = await createOrUpdateTeam(teamData);
        if (team && team.data) {
          teamId = team.data.id;
        }
      }
    }

    if (teamId) {
      formData.append("user[team_id]", teamId.toString());
    } else {
      formData.append("user[team_id]", "");
    }

    setErrors([]);
    try {
      await updateProfile(formData);
      setSave(true);
      // ポジション保存
      await updateUserPositions({
        userId: profile.id,
        positionIds: selectedPositionIds.map((id) => parseInt(id)),
      });

      // 受賞歴保存
      if (awards.length > 0) {
        for (const award of awards) {
          try {
            if (award.id && award.id.toString().length < 13) {
              await updatePutAward(profile.id, award.id, {
                title: award.title,
              });
            } else {
              const awardData: AwardData = {
                award: {
                  title: award.title,
                  userId: profile.id.toString(),
                },
              };
              await createAward(awardData);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }

      // 受賞削除
      for (const awardId of deletedAwards) {
        try {
          await deleteAward(profile.id, awardId);
        } catch (error) {
          console.log(error);
        }
      }

      setTimeout(() => {
        router.push(`/mypage/${profile.user_id}`);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  // バリデーション
  const validateUserName = useCallback(
    (name: string) =>
      /^[0-9A-Za-z\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF]+$/.test(
        name
      ),
    []
  );

  const isInvalid = useMemo(() => {
    return profile.name === "" || !validateUserName(profile.name);
  }, [profile.name, validateUserName]);

  // カテゴリーをフィルタリング
  const handleBaseballCategoryChange = (value: string) => {
    const trimmedValue = value.split("|")[0];
    setBaseballCategoryValue(trimmedValue);
  };

  // category_id set
  const handleBaseballCategoryIdChange = (value: number) => {
    const category = baseballCategories.find((c) => c.id === value);
    if (category) {
      setSelectedCategoryId(category.id);
      setBaseballCategoryValue(category.name);
    }
  };

  // prefecture_id set
  const handlePrefectureChange = (event: { target: { value: any } }) => {
    setSelectedPrefectureId(event.target.value);
  };

  // 既にdbに保存されているチーム名選択時の処理
  const handleTeamSelectionChange = async (teamId: number) => {
    const selectedTeam = teams?.find((team) => team.id === teamId);
    if (selectedTeam) {
      setTeamName(selectedTeam.name);
      setSelectedTeamId(selectedTeam.id);
      const category = baseballCategories.find(
        (category) => category.id === selectedTeam.category_id
      );
      const prefecture = prefectures.find(
        (prefecture) => prefecture.id === selectedTeam.prefecture_id
      );
      if (category) {
        setBaseballCategoryValue(category.name);
        setSelectedCategoryId(category.id);
      }
      if (prefecture) {
        setSelectedPrefectureId(prefecture.id);
      }
    } else {
      setTeamName("");
      setSelectedTeamId(undefined);
    }
  };

  // 受賞歴追加
  const handleAwardChange = (index: number, value: string) => {
    const newAwards = awards.map((award, idx) => {
      if (idx === index) {
        return award.id
          ? { id: award.id, title: value }
          : { id: Date.now(), title: value };
      }
      return award;
    });
    setAwards(newAwards);
    if (awards[index].id) {
      const updatedAward = { id: awards[index].id, title: value };
      setUpdatedAwards((prevAwards) => [...prevAwards, updatedAward]);
    }
  };

  const addAward = () => {
    setAwards([...awards, { id: Date.now(), title: "" }]);
  };
  // 受賞削除
  const handleDeleteAward = async (awardId: number, index: number) => {
    try {
      setDeletedAwards([...deletedAwards, awardId]);
      const newAwards = awards.filter((_, idx) => idx !== index);
      setAwards(newAwards);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="buzz-dark bg-main pb-24">
      <HeaderSave onProfileUpdate={handleSubmit} />
      <div className="h-full buzz-dark">
        <main className="h-full">
          <div className="pt-12 relative">
            <ErrorMessages errors={errors} />
            <SaveSpinner saved={save} />
            <div className="px-4 py-10">
              <h2 className="text-xl font-bold text-center">
                プロフィール編集
              </h2>
              <form>
                {profile.image && (
                  <Avatar
                    size="lg"
                    isBordered
                    src={
                      profile.image.startsWith("blob:")
                        ? profile.image
                        : `${process.env.NEXT_PUBLIC_API_URL}${profile.image}`
                    }
                    onClick={handleImageClick}
                    className="cursor-pointer mx-auto mt-6"
                  />
                )}
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="text-sm text-center text-yellow-500 mt-2 mx-auto mb-4 block"
                >
                  画像を編集
                </button>
                <Input
                  type="text"
                  name="name"
                  variant="underlined"
                  label="名前"
                  value={profile.name}
                  onChange={handleChange}
                  isInvalid={isInvalid}
                  color={isInvalid ? "danger" : "primary"}
                  errorMessage={
                    isInvalid
                      ? "半角英数字、ハイフン(-)、アンダーバー(_)のみ使用可能です"
                      : ""
                  }
                  isRequired
                  className="mb-5"
                />
                <Textarea
                  name="introduction"
                  variant="underlined"
                  label="自己紹介"
                  labelPlacement="outside"
                  placeholder="自己紹介文を書いてみよう！（100文字以内）"
                  value={profile.introduction}
                  onChange={handleChange}
                  color="primary"
                  maxLength={100}
                  className="mb-2"
                />
                {/* ポジション */}
                <Select
                  variant="underlined"
                  label="ポジション（複数選択可）"
                  color="default"
                  selectionMode="multiple"
                  selectedKeys={selectedPositionIds}
                  onSelectionChange={handleSelectChange}
                  className=""
                >
                  {positions.map((position) => (
                    <SelectItem
                      key={position.id}
                      value={position.id}
                      textValue={position.name.toString()}
                    >
                      {position.name}
                    </SelectItem>
                  ))}
                </Select>
                {/* チーム */}
                <p className="text-lg font-bold mt-8">チーム設定</p>
                <Autocomplete
                  allowsCustomValue
                  label="チーム名"
                  variant="underlined"
                  color="primary"
                  className="pt-0.5"
                  inputValue={teamName}
                  defaultItems={teams}
                  onInputChange={(value) => setTeamName(value)}
                  onSelectionChange={(value) => {
                    handleTeamSelectionChange(Number(value));
                  }}
                  selectedKey={
                    selectedTeamId !== undefined
                      ? selectedTeamId.toString()
                      : null
                  }
                >
                  {teams
                    ? teams.map((team) => (
                        <AutocompleteItem
                          key={team.id}
                          value={team.id}
                          textValue={team.name}
                        >
                          {team.name}
                        </AutocompleteItem>
                      ))
                    : []}
                </Autocomplete>
                <Autocomplete
                  variant="underlined"
                  label="所属カテゴリー（年代 / リーグ / 連盟）"
                  color="primary"
                  className="pt-2"
                  inputValue={baseballCategoryValue}
                  onInputChange={handleBaseballCategoryChange}
                  isDisabled={isDisabled}
                  onSelectionChange={(value) =>
                    handleBaseballCategoryIdChange(Number(value))
                  }
                  selectedKey={
                    selectedCategoryId !== undefined
                      ? selectedCategoryId.toString()
                      : null
                  }
                >
                  {baseballCategories.map((baseballCategory) => (
                    <AutocompleteItem
                      key={baseballCategory.id}
                      value={baseballCategory.id}
                      textValue={`${baseballCategory.name}| ${baseballCategory.hiragana} ${baseballCategory.katakana} ${baseballCategory.alphabet}`}
                    >
                      {baseballCategory.name}
                      <span className="hidden">{`(${baseballCategory.hiragana},${baseballCategory.katakana},${baseballCategory.alphabet})`}</span>
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                <Select
                  variant="underlined"
                  label="所属地域（都道府県）"
                  color="default"
                  className="pt-2"
                  isDisabled={isDisabled}
                  onChange={handlePrefectureChange}
                  selectedKeys={
                    selectedPrefectureId !== undefined
                      ? [selectedPrefectureId.toString()]
                      : []
                  }
                >
                  {prefectures.map((prefecture) => (
                    <SelectItem
                      key={prefecture.id}
                      value={prefecture.id.toString()}
                      textValue={prefecture.name}
                    >
                      {prefecture.name}
                    </SelectItem>
                  ))}
                </Select>
                {/* 受賞歴 */}
                <p className="text-lg font-bold mt-8">受賞歴</p>
                {awards.map((award, index) => (
                  <Input
                    key={index}
                    type="text"
                    variant="underlined"
                    label="受賞（チーム成績・個人タイトル）"
                    placeholder="投手 ベストナイン賞（東京六大学 2023 秋）"
                    value={award.title}
                    onChange={(e) => handleAwardChange(index, e.target.value)}
                    color={isInvalid ? "danger" : "primary"}
                    className="mt-1"
                    endContent={
                      <>
                        <Button
                          className="p-0 w-auto min-w-max h-auto border-none block bg-transparent"
                          color="primary"
                          variant="faded"
                          size="sm"
                          isIconOnly
                          onClick={() => handleDeleteAward(award.id, index)}
                          endContent={
                            <DeleteIcon
                              width="24"
                              height="24"
                              fill="#d0d0d0"
                              stroke="fff"
                            />
                          }
                        ></Button>
                      </>
                    }
                  />
                ))}
                <PlusButton
                  className="mt-2 ml-auto mr-1 "
                  type="button"
                  onClick={addAward}
                />
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
