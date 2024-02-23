import { GroupIcon } from "@app/components/icon/GroupIcon";
import {
  acceptGroupInvitation,
  declinedGroupInvitation,
} from "@app/services/groupInvitationsService";
import { deleteNotification } from "@app/services/notificationsService";
import {
  Avatar,
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NotificationGroupProps {
  notice: Notifications;
}

export default function NotificationGroup({ notice }: NotificationGroupProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

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
      window.location.reload();
    } catch (error) {}
  };

  const handleOpen = () => {
    onOpen();
  };
  return (
    <>
      <div className="grid grid-cols-[28px_1fr] gap-x-3">
        <GroupIcon fill="#f4f4f4" width="28" height="28" />
        <div className="flex flex-col items-start gap-y-1 pt-1">
          <Link href={`/mypage/${notice.actor_user_id}`}>
            <Avatar
              src={
                process.env.NODE_ENV === "production"
                  ? `${notice.actor_icon.url}`
                  : `${process.env.NEXT_PUBLIC_API_URL}${notice.actor_icon.url}`
              }
              size="sm"
              isBordered
              className="min-w-[28px] max-w-[28px] min-h-[28px] max-h-[28px]"
            />
          </Link>
          <p className="text-sm text-zinc-400 mt-1">
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
                handleAcceptGroupInvitation(notice.event_id, notice.id)
              }
            >
              参加する
            </Button>
            <Button size="sm" color="danger" onPress={() => handleOpen()}>
              拒否する
            </Button>
            <Modal
              size="lg"
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
    </>
  );
}
