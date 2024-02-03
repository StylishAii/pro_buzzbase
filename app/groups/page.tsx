import Header from "@app/components/header/Header";
import { PlusIcon } from "@app/components/icon/PlusIcon";
import { Button, Divider, Link } from "@nextui-org/react";

export default function Group() {
  return (
    <>
      <div className="buzz-dark">
        <Header />
        <div className="h-full">
          <main className="h-full">
            <div className="px-4 py-14">
              <p className="text-base mt-6">
                ユーザーを招待してグループを作成しよう！
              </p>
              <p className="text-sm text-zinc-300 mt-2">
                グループ機能は、成績をランキング形式で共有することができます。
              </p>
              <div className="flex justify-center mt-4">
                <Button
                  href="/groups/new"
                  as={Link}
                  color="primary"
                  variant="solid"
                  radius="full"
                  endContent={
                    <PlusIcon width="22" height="22" fill="#F4F4F4" />
                  }
                >
                  グループ作成
                </Button>
              </div>
              <Divider className="mt-8" />
              <div className="mt-7">
                <h2 className="text-2xl font-bold">グループ</h2>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
