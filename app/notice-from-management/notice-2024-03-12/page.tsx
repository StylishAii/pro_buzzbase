import { Metadata } from "next";
export const metadata: Metadata = {
  title: "ユーザーID未設定による不具合",
  description:
    "ユーザーIDが未設定の場合に、「マイページ画面」「通知一覧画面」が表示されない不具合が発生しております。",
};

import Header from "@app/components/header/Header";
import NoticeBreadcrumb from "@app/notice-from-management/notice-breadcrumb";
import { Chip, Divider } from "@nextui-org/react";
import Logout from "@app/components/auth/Logout";
import Image from "next/image";

export default function Page() {
  const date = "2024.03.12";
  const title = "ユーザーID未設定による不具合";
  return (
    <>
      <div className="buzz-dark flex flex-col w-full min-h-screen bg-main">
        <div className="h-full bg-main">
          <Header />
          <main className="h-full pb-16 w-full  max-w-[720px] mx-auto lg:m-[0_auto_0_28%]">
            <div className="px-4 pt-20 lg:border-x-1 lg:border-b-1 lg:border-zinc-500 lg:px-6 lg:pb-10">
              <NoticeBreadcrumb />
              <p className="text-xs text-zinc-400 lg:text-base lg:mb-1">
                {date}
              </p>
              <h2 className="text-lg font-bold lg:text-xl">{title}</h2>
              <Divider className="my-4 lg:my-6" />
              <div>
                <p className="text-sm tracking-wide mb-4 leading-6 text-zinc-400 lg:text-base">
                  ユーザーIDが未設定の場合に、「マイページ画面」「通知一覧画面」にアクセスするとエラーが発生し、画面が表示されない不具合が発生しております。
                  <br />
                  ご迷惑をおかけしてしまい、大変申し訳ございません。
                  <br />
                </p>
                <h3 className="font-bold mt-7 lg:text-lg">【対処方法】</h3>
                <p className="text-sm tracking-wide mb-3 mt-1 leading-6 lg:text-base">
                  1. 「ログアウト」を行い、再度ログインを行います。
                </p>
                <Chip
                  color="primary"
                  variant="solid"
                  radius="sm"
                  className="px-2 h-8 mb-4"
                >
                  <Logout />
                </Chip>
                <p className="text-sm tracking-wide mb-3 mt-1 leading-6 lg:text-base">
                  2.
                  以下の添付画像の画面に遷移（多少時間がかかるかもしれません）するので、「ユーザー名」「ユーザーID」を設定します。
                </p>
                <Image
                  src="/images/notice/user_id_page.png"
                  alt=""
                  width="776"
                  height="402"
                  className="border-3 border-zinc-400 p-2 rounded-md w-5/6 h-auto block mx-auto mt-4 lg:mt-8"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
