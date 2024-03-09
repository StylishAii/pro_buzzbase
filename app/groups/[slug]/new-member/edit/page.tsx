"use client";
import HeaderMatchResultNext from "@app/components/header/HeaderMatchResultSave";
import LoadingSpinner from "@app/components/spinner/LoadingSpinner";
import {
  createInviteMembers,
  getGroupDetailUsers,
} from "@app/services/groupService";
import { getCurrentUserId, getFollowingUser } from "@app/services/userService";
import { Checkbox, User } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GroupMemberAdd({
  params,
}: {
  params: { slug: string };
}) {
  const groupId = Number(params.slug);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [following, setFollowing] = useState<FollowingUser[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [groupMemberIds, setGroupMemberIds] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const userId = await getCurrentUserId();
      setCurrentUserId(userId);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const data = await getGroupDetailUsers(groupId);
        const acceptedUserIds = data.accepted_users.map((user: any) => user.id);
        setGroupMemberIds(acceptedUserIds);
      } catch (error) {
        console.error("グループの詳細を取得できませんでした。", error);
      }
    };
    if (groupId) {
      fetchGroupDetails();
    }
  }, [groupId]);

  useEffect(() => {
    const fetchFollowing = async () => {
      if (currentUserId && groupMemberIds.length > 0) {
        try {
          const response = await getFollowingUser(currentUserId);
          const filteredFollowing = response.filter(
            (follow: FollowingUser) => !groupMemberIds.includes(follow.id)
          );
          setFollowing(filteredFollowing);
        } catch (error) {
          console.log("フォロー中のユーザーはいません", error);
        }
      }
    };
    fetchFollowing();
  }, [currentUserId, groupMemberIds]);

  const handleCheckboxChange = (userId: number, isChecked: boolean) => {
    setSelectedUserIds((prevSelectedUserIds) => {
      if (isChecked) {
        return [...prevSelectedUserIds, userId];
      } else {
        return prevSelectedUserIds.filter((id) => id !== userId);
      }
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    selectedUserIds.forEach((userId) => {
      formData.append("invite_user_ids[]", userId.toString());
    });
    try {
      const response = await createInviteMembers(groupId, formData);
      router.push(`/groups/${groupId}/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="buzz-dark flex flex-col w-full min-h-screen">
        {isSubmitting && <LoadingSpinner />}
        <HeaderMatchResultNext
          onMatchResultNext={handleSubmit}
          disabled={isSubmitting}
          text={"招待"}
        />
        <div className="h-full bg-main">
          <main className="h-full max-w-[720px] mx-auto lg:m-[0_auto_0_28%]">
            <div className="px-4 py-14 relative lg:border-x-1 lg:border-b-1 lg:border-zinc-500 lg:px-6 lg:pb-6 lg:mb-10">
              <h2 className="text-2xl font-bold mt-5">メンバー招待</h2>
              <span className="text-xs text-zinc-400 block mt-1 leading-4">
                チェックしたユーザーへ、グループ招待通知を送信します。
                <br />
                （フォローしているユーザーのみ招待可能）
              </span>
              <form>
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
                          src:
                            process.env.NODE_ENV === "production"
                              ? follow.image.url
                              : `${process.env.NEXT_PUBLIC_API_URL}${follow.image.url}`,
                        }}
                      />
                      <Checkbox
                        size="lg"
                        className="p-0"
                        defaultSelected={selectedUserIds.includes(follow.id)}
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
