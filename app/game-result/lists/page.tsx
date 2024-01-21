"use client";

import HeaderLogo from "@app/components/header/HeaderLogo";
import { PlusIcon } from "@app/components/icon/PlusIcon";
import { createGameResult } from "@app/services/gameResultsService";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function GameResultList() {
  const router = useRouter();

  const handleNewRecord = async () => {
    try {
      const newGameResult = await createGameResult();
      localStorage.setItem("gameResultId", JSON.stringify(newGameResult.id));
      router.push(`/game-result/record`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <HeaderLogo />
      <main className="h-full">
        <div className="pb-32 relative">
          <div className="pt-16 px-4">
            <h2 className="text-xl font-bold mt-8">試合一覧</h2>
            <Button
              color="primary"
              variant="solid"
              radius="full"
              endContent={<PlusIcon width="22" height="22" fill="#F4F4F4" />}
              className="fixed top-14 right-4 z-100"
              onClick={handleNewRecord}
            >
              新規追加
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
