"use client";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import HeaderNote from "@app/components/header/HeaderNote";
import NoteEditor from "@app/components/note/NoteEditor";
import LoadingSpinner from "@app/components/spinner/LoadingSpinner";
import showBaseballNote from "@app/hooks/note/showBaseballNote";
import { updateBaseballNote } from "@app/services/baseballNoteService";
import { Input, Skeleton } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mutate } from "swr";

export default function NoteDetail({ params }: { params: { slulg: string } }) {
  const noteId = Number(params.slulg);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();
  const [initialValues, setInitialValues] = useState({
    date: "",
    title: "",
    memo: "",
  });

  const { note, isLoading, isError } = showBaseballNote(noteId);

  if (isError) {
    return (
      <p className="text-sm text-zinc-400 text-center">
        野球ノートの読み込みに失敗しました。
      </p>
    );
  }

  useEffect(() => {
    if (note) {
      setDate(note.date);
      setTitle(note.title);
      setMemo(note.memo);
      setInitialValues({
        date: note.date,
        title: note.title,
        memo: note.memo,
      });
    }
  }, [note]);

  const hasChanges =
    date !== initialValues.date ||
    title !== initialValues.title ||
    memo !== initialValues.memo;

  const setErrorsWithTimeout = (newErrors: React.SetStateAction<string[]>) => {
    setErrors(newErrors);
    setTimeout(() => {
      setErrors([]);
    }, 2000);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!hasChanges) {
      router.push("/note");
      return;
    }
    setIsSubmitting(true);
    try {
      await updateBaseballNote(noteId, { date, title, memo });
      mutate(`/api/v1/baseball_notes/${noteId}`);
      router.push("/note");
    } catch (error) {
      console.log(error);
      setErrorsWithTimeout(["更新中にエラーが発生しました"]);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="buzz-dark flex flex-col w-full min-h-screen bg-main">
        <HeaderNote
          onNoteSave={handleSubmit}
          isSubmitting={isSubmitting}
          hasChanges={hasChanges}
        />
        {isSubmitting && <LoadingSpinner />}
        <main className="h-full w-full max-w-[720px] mx-auto lg:m-[0_auto_0_28%]">
          <div className="pb-32 relative lg:border-x-1 lg:border-b-1 lg:border-zinc-500 lg:pb-0 lg:mb-14">
            <ErrorMessages errors={errors} />
            <div className="pt-20 px-4 lg:px-6">
              <form>
                <div>
                  <div>
                    {isLoading ? (
                      <>
                        <Skeleton className="w-28 rounded-lg ml-auto mr-0 mt-4">
                          <div className="h-8 w-28 rounded-lg bg-default-200"></div>
                        </Skeleton>
                      </>
                    ) : (
                      <>
                        <Input
                          isRequired
                          type="date"
                          size="sm"
                          variant="underlined"
                          className="w-28 ml-auto mr-0 [&>div&>div]:p-0"
                          value={date}
                          onChange={handleDateChange}
                        />
                      </>
                    )}
                  </div>
                  <div>
                    {isLoading ? (
                      <>
                        <Skeleton className="w-full rounded-lg mt-5">
                          <div className="h-8 w-full rounded-lg bg-default-200 mt-2"></div>
                        </Skeleton>
                      </>
                    ) : (
                      <>
                        <Input
                          type="text"
                          size="lg"
                          variant="underlined"
                          className="w-full [&>div]:pt-0.5 [&>div]:h-12 font-bold"
                          placeholder="タイトル"
                          value={title}
                          onChange={handleTitleChange}
                        />
                      </>
                    )}
                  </div>
                  <div className="mt-10 w-full h-full">
                    {isLoading ? (
                      <Skeleton className="w-full rounded-lg h-full min-h-[620px]">
                        <div className="h-full w-full rounded-lg bg-default-200"></div>
                      </Skeleton>
                    ) : (
                      <NoteEditor memo={note.memo} setMemo={setMemo} />
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
