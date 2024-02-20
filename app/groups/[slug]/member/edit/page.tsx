"use client";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import HeaderMatchResultNext from "@app/components/header/HeaderMatchResultSave";
import { getGroupDetailUsers, updateGroup } from "@app/services/groupService";
import { Avatar, Checkbox, Input, User } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GroupMember({ params }: { params: { slug: string } }) {
  const groupId = Number(params.slug);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isGroupUsers, setIsGroupUsers] = useState(true);
  const [groupMember, setGroupMember] = useState<AcceptedUsers[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (groupId) {
      fetchGroupDetails(groupId);
    }
  }, []);

  const fetchGroupDetails = async (groupId: number) => {
    try {
      const data = await getGroupDetailUsers(groupId);
      setGroupMember(data.accepted_users);
      const acceptedUserIds = data.accepted_users.map((user: any) => user.id);
      setSelectedUserIds(acceptedUserIds);
    } catch (error) {
      console.error("グループメンバーを取得できませんでした。", error);
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
    selectedUserIds.forEach((userId) => {
      formData.append("invite_user_ids[]", userId.toString());
    });
    try {
      const response = await updateGroup(groupId, formData);
      router.push(`/groups/${response.id}/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="buzz-dark">
        <HeaderMatchResultNext
          onMatchResultNext={handleSubmit}
          text={"メンバー退会"}
        />
        <div className="h-full bg-main">
          <main className="h-full max-w-[720px] mx-auto lg:m-[0_auto_0_28%]">
            <div className="px-4 py-14 relative lg:border-x-1 lg:border-b-1 lg:border-zinc-500 lg:px-6 lg:pb-6 lg:mb-10">
              <ErrorMessages errors={errors} />
              <h2 className="text-2xl font-bold mt-5">メンバー一覧</h2>
              <span className="text-xs text-red-500">
                メンバー退会は、チェックを解除し「メンバー退会ボタン」をクリックすると退会されます。
              </span>
              <form>
                <div className="pt-4 pb-24 grid gap-y-5 bg-main lg:pb-4">
                  {groupMember.map((member) => (
                    <div
                      key={member.id}
                      className="flex justify-between items-center"
                    >
                      <User
                        name={member.name}
                        description={member.user_id}
                        avatarProps={{
                          src:
                            process.env.NODE_ENV === "production"
                              ? member.image.url
                              : `${process.env.NEXT_PUBLIC_API_URL}${member.image.url}`,
                        }}
                      />
                      <Checkbox
                        size="lg"
                        className="p-0"
                        defaultSelected={selectedUserIds.includes(member.id)}
                        onChange={(e) =>
                          handleCheckboxChange(member.id, e.target.checked)
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
