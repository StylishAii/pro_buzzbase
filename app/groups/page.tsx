"use client";
import Header from "@app/components/header/Header";
import { PlusIcon } from "@app/components/icon/PlusIcon";
import { getGroups } from "@app/services/groupService";
import { Avatar, Button, Divider, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Group() {
  const [groups, setGroups] = useState<GroupsData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseGroups = await getGroups();
      setGroups(responseGroups);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(groups);

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
                <div className="mt-5 grid gap-y-5">
                  {groups.map((group) => (
                    <div
                      key={group.id}
                      className="grid grid-cols-[56px_1fr] items-center gap-x-4"
                    >
                      <Avatar
                        size="lg"
                        isBordered
                        src={`${process.env.NEXT_PUBLIC_API_URL}${group.icon.url}`}
                      />
                      <p className="text-lg font-bold">{group.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
