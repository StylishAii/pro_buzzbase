import Header from "@app/components/header/Header";
import NotificationItem from "@app/components/notification/NotificationItem";

export default function Notifications() {
  return (
    <>
      <div className="buzz-dark flex flex-col w-full min-h-screen">
        <Header />
        <div className="h-full bg-main">
          <main className="h-full max-w-[720px] mx-auto w-full lg:m-[0_auto_0_28%]">
            <div className="px-4 py-20 lg:border-x-1 lg:border-b-1 lg:border-zinc-500 lg:px-6 lg:pb-6 lg:mb-14">
              <h2 className="text-2xl font-bold">通知</h2>
              <NotificationItem />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
