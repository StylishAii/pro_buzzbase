"use client";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import HeaderMatchResultNext from "@app/components/header/HeaderMatchResultSave";
import {
  getGroupDetailUsers,
  updateGroupInfo,
} from "@app/services/groupService";
import { getCurrentUserId } from "@app/services/userService";
import { Avatar, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function GroupEdit({ params }: { params: { slug: string } }) {
  const groupId = Number(params.slug);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isGroupName, setIsGroupName] = useState(true);
  const [group, setGroup] = useState<{
    name: string;
    icon: { url: string | null };
  }>({
    name: "",
    icon: { url: null },
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (groupId) {
      fetchGroupDetails(groupId);
    }
    fetchData();
  }, [currentUserId]);

  const fetchGroupDetails = async (groupId: number) => {
    try {
      const data = await getGroupDetailUsers(groupId);
      setGroup({
        name: data.group.name,
        icon:
          data.group.icon && data.group.icon.url
            ? {
                url: `${process.env.NEXT_PUBLIC_API_URL}${data.group.icon.url}`,
              }
            : { url: null },
      });
    } catch (error) {
      console.error("グループの詳細を取得できませんでした。", error);
    }
  };

  const fetchData = async () => {
    const responseCurrentUserId = await getCurrentUserId();
    setCurrentUserId(responseCurrentUserId);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: any) => {
    if (event.target.name === "image") {
      const file = event.target.files[0];
      if (file) {
        const previewFileUrl = URL.createObjectURL(file);
        setGroup((prevState) => ({
          ...prevState,
          icon: { url: previewFileUrl },
        }));
      }
    } else {
      setGroup((prevState) => ({
        ...prevState,
        name: event.target.value,
      }));
    }
  };

  const setErrorsWithTimeout = (newErrors: React.SetStateAction<string[]>) => {
    setErrors(newErrors);
    setTimeout(() => {
      setErrors([]);
    }, 2000);
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = [];

    if (!group.name) {
      setIsGroupName(false);
      isValid = false;
      newErrors.push("グループ名を設定してください");
    } else {
      setIsGroupName(true);
    }

    if (!isValid) {
      setErrorsWithTimeout(newErrors);
    }

    return isValid;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setErrors([]);
    const formData = new FormData();
    formData.append("group[name]", group.name);
    if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
      formData.append("group[icon]", fileInputRef.current.files[0]);
    }
    try {
      const response = await updateGroupInfo(groupId, formData);
      router.push(`/groups/${response.id}/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="buzz-dark flex flex-col w-full min-h-screen">
        <HeaderMatchResultNext onMatchResultNext={handleSubmit} text={"更新"} />
        <div className="h-full bg-main">
          <main className="h-full max-w-[720px] mx-auto lg:m-[0_auto_0_28%]">
            <div className="px-4 py-14 relative lg:border-x-1 lg:border-b-1 lg:border-zinc-500 lg:px-6 lg:pb-6 lg:mb-10">
              <ErrorMessages errors={errors} />
              <h2 className="text-2xl font-bold mt-5">グループ情報編集</h2>
              <form>
                <div className="grid grid-cols-[72px_1fr] gap-x-6 items-start mt-6">
                  <div className="flex justify-center flex-col items-center">
                    <Avatar
                      src={
                        group.icon.url ||
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
                      color={isGroupName ? "primary" : "danger"}
                      size="lg"
                      onChange={handleChange}
                      value={group.name}
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
