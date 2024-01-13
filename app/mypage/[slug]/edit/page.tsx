"use client";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import HeaderSave from "@app/components/header/HeaderSave";
import SaveSpinner from "@app/components/spinner/SavingSpinner";
import { getBaseballCategory } from "@app/services/baseballCategoryService";
import {
  getPositions,
  updateUserPositions,
} from "@app/services/positionService";
import { getPrefectures } from "@app/services/prefectureService";
import {
  createOrUpdateTeam,
  getTeams,
  updateUserTeam,
} from "@app/services/teamsService";
import { getUserData, updateProfile } from "@app/services/userService";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { Key } from "@react-types/shared";
import { useRouter } from "next/navigation";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
  id: number;
  name: string;
};

export default function ProfileEdit() {
  const [profile, setProfile] = useState<{
    name: string;
    image: string | null;
    introduction: string;
    user_id: string;
    id: string;
  }>({
    name: "",
    image: null,
    introduction: "",
    user_id: "",
    id: "",
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
  const [selectedPrefectureId, setSelectedPrefectureId] = useState();
  const router = useRouter();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // ユーザーデータ取得
  useEffect(() => {
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
      } catch (error: any) {
        setErrors(error);
      }
    };
    fetchData();
  }, []);

  // disabled制御
  useEffect(() => {
    setIsDisabled(teamName.length === 0);
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
    }, 5000);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isInvalid) {
      setErrorsWithTimeout(["名前が未入力、または無効です。"]);
      return;
    }
    const formData = new FormData();
    formData.append("user[name]", profile.name);
    formData.append("user[introduction]", profile.introduction);
    const file = fileInputRef.current?.files?.[0];
    if (profile.image && profile.image.startsWith("blob:") && file) {
      formData.append("user[image]", file);
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
      // チーム保存
      const team = await createOrUpdateTeam({
        team: {
          name: teamName,
          category_id: selectedCategoryId,
          prefecture_id: selectedPrefectureId,
        },
      });
      await updateUserTeam({
        user_team: {
          team_id: team.data.id,
          user_id: profile.id,
        },
      });
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

  const handleBaseballCategoryChange = (value: string) => {
    const trimmedValue = value.split("|")[0];
    setBaseballCategoryValue(trimmedValue);
  };

  const handleBaseballCategoryIdChange = (value: number) => {
    setSelectedCategoryId(value);
  };

  const handlePrefectureChange = (event: { target: { value: any } }) => {
    setSelectedPrefectureId(event.target.value);
  };

  return (
    <div className="buzz-dark">
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
                  color="primary"
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
                  defaultItems={teams}
                  onInputChange={(value) => setTeamName(value)}
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
                  color="primary"
                  className="pt-2"
                  isDisabled={isDisabled}
                  onChange={handlePrefectureChange}
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
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
