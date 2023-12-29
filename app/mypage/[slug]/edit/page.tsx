"use client";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import HeaderSave from "@app/components/header/HeaderSave";
import SaveSpinner from "@app/components/spinner/SavingSpinner";
import MyPageLayout from "@app/mypage/[slug]/layout";
import { getUserData, updateProfile } from "@app/services/userService";
import { Avatar, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function ProfileEdit() {
  const [profile, setProfile] = useState<{
    name: string;
    image: string | null;
    introduction: string;
    user_id: string;
  }>({
    name: "",
    image: null,
    introduction: "",
    user_id: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [save, setSave] = useState(false);
  const router = useRouter();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setProfile({
        name: data.name,
        image: data.image.url,
        introduction: data.introduction || "",
        user_id: data.user_id,
      });
    };
    fetchData();
  }, []);

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

  return (
    <>
      <MyPageLayout pageType="edit">
        <HeaderSave onProfileUpdate={handleSubmit} />
        <div className="pt-12 relative">
          <ErrorMessages errors={errors} />
          <SaveSpinner saved={save} />
          <div>
            <h2>プロフィール編集</h2>
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
                  className="cursor-pointer"
                />
              )}
              <input
                type="file"
                name="image"
                onChange={handleChange}
                ref={fileInputRef}
                className="hidden"
              />
              <button type="button" onClick={handleImageClick}>
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
              />
            </form>
          </div>
        </div>
      </MyPageLayout>
    </>
  );
}
