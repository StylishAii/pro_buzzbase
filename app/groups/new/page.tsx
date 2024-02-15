"use client";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import HeaderMatchResultNext from "@app/components/header/HeaderMatchResultSave";
import { createGroup } from "@app/services/groupService";
import { getCurrentUserId, getFollowingUser } from "@app/services/userService";
import { Avatar, Checkbox, Input, User } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function GroupNew() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [following, setFollowing] = useState<FollowingUser[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isGroupName, setIsGroupName] = useState(true);
  const [isGroupUsers, setIsGroupUsers] = useState(true);
  const [group, setGroup] = useState<{ name: string; icon: string | null }>({
    name: "",
    icon: null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetchData();
    if (currentUserId) {
      fetchFollowingUser(currentUserId);
    }
  }, [currentUserId]);

  const fetchData = async () => {
    const responseCurrentUserId = await getCurrentUserId();
    setCurrentUserId(responseCurrentUserId);
  };

  const fetchFollowingUser = async (userId: number) => {
    try {
      const response = await getFollowingUser(userId);
      setFollowing(response);
    } catch (error) {
      console.log("フォロー中のユーザーはいません", error);
    }
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
          icon: previewFileUrl,
        }));
      }
    } else {
      setGroup((prevState) => ({
        ...prevState,
        name: event.target.value,
      }));
    }
  };

  const handleCheckboxChange = (userId: number, isChecked: boolean) => {
    setSelectedUserIds((prevSelectedUserIds) => {
      if (isChecked) {
        return [...prevSelectedUserIds, userId];
      } else {
        return prevSelectedUserIds.filter((id) => id !== userId);
      }
    });
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

    if (selectedUserIds.length === 0) {
      setIsGroupUsers(false);
      isValid = false;
      newErrors.push("メンバーを選択してください");
    } else {
      setIsGroupUsers(true);
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
    selectedUserIds.forEach((userId) => {
      formData.append("invite_user_ids[]", userId.toString());
    });
    try {
      const response = await createGroup(formData);
      router.push(`/groups/${response.id}/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="buzz-dark">
        <HeaderMatchResultNext onMatchResultNext={handleSubmit} text={"作成"} />
        <div className="h-full bg-main">
          <main className="h-full max-w-[720px] mx-auto lg:m-[0_auto_0_28%]">
            <div className="px-4 py-14 relative lg:border-x-1 lg:border-b-1 lg:border-zinc-500 lg:px-6 lg:pb-6 lg:mb-10">
              <ErrorMessages errors={errors} />
              <h2 className="text-2xl font-bold mt-5">グループ設定</h2>
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
                      color={isGroupName ? "primary" : "danger"}
                      size="lg"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <p className="pt-12 text-lg font-bold">メンバーを選択</p>
                <div className="pt-4 pb-24 grid gap-y-5 bg-main lg:pb-4">
                  {following.map((follow) => (
                    <div
                      key={follow.id}
                      className="flex justify-between items-center"
                    >
                      <User
                        name={follow.name}
                        description={follow.user_id}
                        avatarProps={{
                          src: `${process.env.NEXT_PUBLIC_API_URL}${follow.image.url}`,
                        }}
                      />
                      <Checkbox
                        size="lg"
                        className="p-0"
                        onChange={(e) =>
                          handleCheckboxChange(follow.id, e.target.checked)
                        }
                      ></Checkbox>
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
