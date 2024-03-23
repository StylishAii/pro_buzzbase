import { Divider } from "@nextui-org/react";
import Link from "next/link";

interface NoteListItemProps {
  note: getNoteProps;
}

export default function NoteListItem({ note }: NoteListItemProps) {
  return (
    <div key={note.id}>
      <Link href={`/note/${note.id}`} className="block pt-4">
        <div>
          <p className="text-base font-bold truncate">{note.title}</p>
          <div className="flex gap-x-2 mt-0.5">
            <p className="text-sm text-zinc-400 whitespace-nowrap">
              {new Date(note.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-zinc-400 truncate">{note.memo}</p>
          </div>
        </div>
        <Divider className="mt-4" />
      </Link>
    </div>
  );
}
