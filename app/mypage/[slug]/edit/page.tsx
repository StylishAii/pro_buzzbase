"use client";
import HeaderSave from "@app/components/header/HeaderSave";
import MyPageLayout from "@app/mypage/[slug]/layout";
import { getUserData, updateProfile } from "@app/services/userService";
import { Avatar, Input, Textarea } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

export default function ProfileEdit() {
  const [profile, setProfile] = useState<{
    name: string;
    image: string | null;
    introduction: string;
  }>({
    name: "",
    image: null,
    introduction: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user[name]", profile.name);
    formData.append("user[introduction]", profile.introduction);
    const file = fileInputRef.current?.files?.[0];
    if (profile.image && profile.image.startsWith("blob:") && file) {
      formData.append("user[image]", file);
    }
    try {
      await updateProfile(formData);
      console.log("成功");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MyPageLayout pageType="edit">
        <HeaderSave onProfileUpdate={handleSubmit} />
        <div className="pt-12">
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
              />
              <Textarea
                name="introduction"
                variant="underlined"
                label="自己紹介"
                labelPlacement="outside"
                placeholder="自己紹介文を書いてみよう！（100文字以内）"
                value={profile.introduction}
                onChange={handleChange}
              />
            </form>
          </div>
        </div>
      </MyPageLayout>
    </>
  );
}
