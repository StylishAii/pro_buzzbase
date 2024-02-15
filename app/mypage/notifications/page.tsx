"use client";
import Header from "@app/components/header/Header";
import { GroupIcon } from "@app/components/icon/GroupIcon";
import LoadingSpinner from "@app/components/spinner/LoadingSpinner";
import { useAuthContext } from "@app/contexts/useAuthContext";
import {
  acceptGroupInvitation,
  declinedGroupInvitation,
} from "@app/services/groupInvitationsService";
import {
  deleteNotification,
  getNotifications,
  readNotification,
} from "@app/services/notificationsService";
import {
  getCurrentUserId,
  getCurrentUsersUserId,
} from "@app/services/userService";
import {
  Avatar,
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState<
    Notifications[] | undefined
  >(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();
  useEffect(() => {
    if (isLoggedIn === false) {
      return router.push("/signin");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    fetchDate();
  }, []);

  const fetchDate = async () => {
    try {
      const currentUserId = await getCurrentUserId();
      const currentUserUserId = await getCurrentUsersUserId(currentUserId);
      const response = await getNotifications(currentUserUserId);
      setNotifications(response);
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        router.push("/404");
      } else {
        console.error(error);
      }
    }
  };

  const handleAcceptGroupInvitation = async (groupId: number, id: number) => {
    try {
      await acceptGroupInvitation(groupId);
      await deleteNotification(id);
      router.push(`/groups/${groupId}`);
    } catch (error) {}
  };

  const handleDeclinedGroupInvitation = async (groupId: number, id: number) => {
    try {
      await declinedGroupInvitation(groupId);
      await deleteNotification(id);
      onClose();
    } catch (error) {}
  };

  const handleRead = async (id: number) => {
    try {
      await readNotification(id);
    } catch (error) {}
  };

  const handleOpen = () => {
    onOpen();
  };

  if (!notifications) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="buzz-dark flex flex-col w-full min-h-screen">
        <Header />
        <div className="h-full bg-main">
          <main className="h-full max-w-[720px] mx-auto w-full lg:m-[0_auto_0_28%]">
            <div className="px-4 py-20 lg:border-x-1 lg:border-b-1 lg:border-zinc-500 lg:px-6 lg:pb-6">
              <h2 className="text-2xl font-bold">通知</h2>
              <div className="py-5 pb-24 grid gap-y-5 bg-main lg:pb-6">
                {notifications.length > 0 ? (
                  notifications?.map((notice) => (
                    <div key={notice.id}>
                      {notice.event_type === "group_invitation" &&
                      notice.group_invitation === "pending" ? (
                        <>
                          <div className="grid grid-cols-[28px_1fr] gap-x-3">
                            <GroupIcon fill="#f4f4f4" width="28" height="28" />
                            <div className="flex flex-col items-start gap-y-1 pt-1">
                              <Link href={`/mypage/${notice.actor_user_id}`}>
                                <Avatar
                                  src={`${process.env.NEXT_PUBLIC_API_URL}${notice.actor_icon.url}`}
                                  size="sm"
                                  isBordered
                                  className="min-w-[28px] max-w-[28px] min-h-[28px] max-h-[28px]"
                                />
                              </Link>
                              <p className="text-sm text-zinc-400">
                                <Link
                                  href={`/mypage/${notice.actor_user_id}`}
                                  className="text-base text-white font-bold"
                                >
                                  {notice.actor_name}
                                </Link>
                                さんから
                                <span className="text-base text-white font-bold">
                                  {notice.group_name}
                                </span>
                                グループへ招待されました
                              </p>
                              <div className="flex justify-start gap-x-5 w-full mt-2">
                                <Button
                                  size="sm"
                                  color="primary"
                                  onClick={() =>
                                    handleAcceptGroupInvitation(
                                      notice.event_id,
                                      notice.id
                                    )
                                  }
                                >
                                  参加する
                                </Button>
                                <Button
                                  size="sm"
                                  color="danger"
                                  onPress={() => handleOpen()}
                                >
                                  拒否する
                                </Button>
                                <Modal
                                  size="sm"
                                  isOpen={isOpen}
                                  onClose={onClose}
                                  placement="center"
                                  className="w-11/12"
                                >
                                  <ModalContent>
                                    {(onClose) => (
                                      <>
                                        <ModalHeader className="flex gap-1 text-base text-white pb-0">
                                          本当に 「{notice.group_name}」
                                          への招待を拒否してもよろしいですか？
                                        </ModalHeader>
                                        <ModalFooter>
                                          <Button
                                            variant="light"
                                            onPress={onClose}
                                            className="text-white"
                                          >
                                            キャンセル
                                          </Button>
                                          <Button
                                            color="danger"
                                            onPress={() =>
                                              handleDeclinedGroupInvitation(
                                                notice.event_id,
                                                notice.id
                                              )
                                            }
                                          >
                                            拒否する
                                          </Button>
                                        </ModalFooter>
                                      </>
                                    )}
                                  </ModalContent>
                                </Modal>
                              </div>
                            </div>
                          </div>
                          <Divider className="mt-3" />
                        </>
                      ) : notice.event_type === "followed" ? (
                        <>
                          <div
                            className={`grid grid-cols-[28px_1fr] gap-x-3 ${
                              notice.read_at ? "opacity-30" : ""
                            }`}
                          >
                            <Link
                              href={`/mypage/${notice.actor_user_id}`}
                              onClick={() => handleRead(notice.id)}
                            >
                              <Avatar
                                src={`${process.env.NEXT_PUBLIC_API_URL}${notice.actor_icon.url}`}
                                size="sm"
                                isBordered
                                className="min-w-[28px] max-w-[28px] min-h-[28px] max-h-[28px]"
                              />
                            </Link>
                            <div className="flex flex-col items-start gap-y-1">
                              <p className="text-sm text-zinc-400">
                                <Link
                                  href={`/mypage/${notice.actor_user_id}`}
                                  className="text-base text-white font-bold"
                                  onClick={() => handleRead(notice.id)}
                                >
                                  {notice.actor_name}
                                </Link>
                                さんから
                                <span className="text-base text-white font-bold">
                                  {notice.group_name}
                                </span>
                                フォローされました
                              </p>
                            </div>
                          </div>
                          <Divider className="mt-3" />
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))
                ) : (
                  <>
                    <p className="text-zinc-400 text-center pt-2 text-sm">通知はありません</p>
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
