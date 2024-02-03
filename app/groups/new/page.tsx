"use client";
import HeaderMatchResultNext from "@app/components/header/HeaderMatchResultSave";
import { createGroup } from "@app/services/groupService";
import { Avatar, Input } from "@nextui-org/react";
import { useRef, useState } from "react";

export default function GroupNew() {
  const [group, setGroup] = useState<{ name: string; icon: string | null }>({
    name: "",
    icon: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: any) => {
    if (event.target.name === "image") {
      const previewFileUrl =
        event.target.files && event.target.files[0]
          ? URL.createObjectURL(event.target.files[0])
          : null;
      setGroup((prevState) => ({
        ...prevState,
        icon: previewFileUrl,
      }));
    } else {
      setGroup((prevState) => ({
        ...prevState,
        name: event.target.value,
      }));
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("group[name]", group.name);
    if (group.icon && typeof group.icon === "string") {
      formData.append("group[icon]", group.icon);
    }
    try {
      await createGroup(formData);
      console.log(group);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="buzz-dark">
        <HeaderMatchResultNext onMatchResultNext={handleSubmit} text={"作成"} />
        <div className="h-full">
          <main className="h-full">
            <div className="px-4 py-14">
              <h2 className="text-xl font-bold mt-5">グループ設定</h2>
              <form>
                <div className="grid grid-cols-[72px_1fr] gap-x-6 items-start mt-6">
                  <div className="flex justify-center flex-col items-center">
                    <Avatar
                      src={
                        group.icon ||
                        `${process.env.NEXT_PUBLIC_API_URL}/images/group/group-default-yellow.svg`
                      }
                      size="lg"
                      isBordered
                      onClick={handleImageClick}
                      className="cursor-pointer"
                    />
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
                      className="text-xs text-yellow-500 mt-2 block"
                    >
                      アイコン設定
                    </button>
                  </div>
                  <div className="relative bottom-3">
                    <Input
                      type="text"
                      variant="underlined"
                      label="グループ名"
                      color="primary"
                      size="lg"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
