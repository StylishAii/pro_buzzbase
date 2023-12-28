"use client";
import { getUserData, updateUser } from "@app/services/userService";
import { Avatar } from "@nextui-org/react";
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
        introduction: data.introduction,
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

  // const handleUpdate = async () => {
  //   try {
  //     await updateUser(profile);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
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
          </form>
        </div>
      </div>
    </>
  );
}
