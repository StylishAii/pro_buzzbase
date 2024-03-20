import NoteAddButton from "@app/components/button/NoteAddButton";
import Header from "@app/components/header/Header";

export default function NoteList() {
  return (
    <>
      <div className="buzz-dark flex flex-col w-full min-h-screen bg-main">
        <Header />
        <main className="h-full w-full max-w-[720px] mx-auto lg:m-[0_auto_0_28%]">
          <div className="pb-32 relative lg:border-x-1 lg:border-b-1 lg:border-zinc-500 lg:pb-0 lg:mb-14">
            <div className="pt-20 px-4 lg:px-6">
              <h2 className="text-2xl font-bold">野球ノート</h2>
              <NoteAddButton />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
