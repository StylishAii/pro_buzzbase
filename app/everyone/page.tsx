import Header from "@app/components/header/Header";

export default function GameResultList() {
  return (
    <>
      <div className="buzz-dark flex flex-col w-full min-h-screen">
        <Header />
        <main className="h-full">
          <div className="pb-32 relative">
            <div className="pt-16 px-4">
              <h2 className="text-xl font-bold">みんなの成績</h2>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
