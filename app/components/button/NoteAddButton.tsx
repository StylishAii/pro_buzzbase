"use client";
import { NoteAddIcon } from "@app/components/icon/NoteAddIcon";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function NoteAddButton() {
  const router = useRouter();
  return (
    <>
      <Button
        isIconOnly
        color="primary"
        variant="bordered"
        aria-label="Add Baseball Note"
        size="lg"
        className="fixed bottom-20 right-4 z-100"
        onClick={() => router.push("/note/new")}
      >
        <NoteAddIcon fill="#C4841D" width="56" height="56" />
      </Button>
    </>
  );
}
