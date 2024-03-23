import { DeleteDocumentIcon } from "@app/components/icon/DeleteDocumentIcon";
import { MoreIcon } from "@app/components/icon/MoreIcon";
import LoadingSpinner from "@app/components/spinner/LoadingSpinner";
import { deleteBaseballNote } from "@app/services/baseballNoteService";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NoteMenu({ noteId }: { noteId: number }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDeleteNote = async () => {
    setIsLoading(true);
    try {
      await deleteBaseballNote(noteId);
      setTimeout(() => {
        router.push(`/note`);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly variant="ghost" className="p-0 w-9 h-9 min-w-9">
            <MoreIcon width="24" height="24" fill="#f4f4f4" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Note menu">
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            startContent={
              <DeleteDocumentIcon width="20" height="20" fill="#F31260" />
            }
            onPress={onOpen}
          >
            ノート削除
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        placement="center"
        className="w-11/12 ml-auto mr-auto"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody className="gap-y-2">
                <p className="text-base font-medium">
                  現在のノートを削除してもよろしいですか？
                </p>
              </ModalBody>
              <ModalFooter className="pt-3">
                <Button
                  className="text-white"
                  variant="light"
                  onPress={onClose}
                >
                  キャンセル
                </Button>
                <Button color="danger" radius="sm" onClick={handleDeleteNote}>
                  削除する
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
