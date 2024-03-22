"use client";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import HeaderNote from "@app/components/header/HeaderNote";
import NoteEditor from "@app/components/note/NoteEditor";
import LoadingSpinner from "@app/components/spinner/LoadingSpinner";
import showBaseballNote from "@app/hooks/note/showBaseballNote";
import { Input, Skeleton } from "@nextui-org/react";
import { useState } from "react";

export default function NoteDetail({ params }: { params: { slulg: string } }) {
  const noteId = Number(params.slulg);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const { note, isLoading, isError } = showBaseballNote(noteId);
  console.log(note);

  if (isError) {
    return (
      <p className="text-sm text-zinc-400 text-center">
        野球ノートの読み込みに失敗しました。
      </p>
    );
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
  };
  return (
    <>
      <div className="buzz-dark flex flex-col w-full min-h-screen bg-main">
        {/* <HeaderNote
          onNoteSave={handleSubmit}
          isSubmitting={isSubmitting}
          hasChanges={hasChanges}
        /> */}
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
                          value={note.date}
                          // onChange={handleDateChange}
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
                          value={note.title}
                          // onChange={(e) => setTitle(e.target.value)}
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
                      <NoteEditor memo={note.memo} setMemo={() => {}} />
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
