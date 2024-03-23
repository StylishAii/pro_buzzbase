"use client";
import NoteListItem from "@app/components/note/NoteListItem";
import getBaseballNotes from "@app/hooks/note/getBaseballNotes";
import { Card, Spinner } from "@nextui-org/react";

export default function NoteListComponent() {
  const { notes, isLoading, isError } = getBaseballNotes();
  if (isLoading) {
    return (
      <div className="flex justify-center pb-6 pt-14">
        <Spinner color="primary" />
      </div>
    );
  }
  if (isError) {
    return (
      <p className="text-sm text-zinc-400 text-center">
        野球ノートの読み込みに失敗しました。
      </p>
    );
  }

  return (
    <>
      <div>
        <Card className="pt-6 pb-4 px-6">
          {notes.length > 0 ? (
            notes.map((note: getNoteProps) => (
              <div key={note.id} className="mb-4">
                {note.date && <NoteListItem note={note} />}
              </div>
            ))
          ) : (
            <p className="text-sm text-zinc-400 text-center">
              まだ野球ノートが作成されていません。
            </p>
          )}
        </Card>
      </div>
    </>
  );
}
