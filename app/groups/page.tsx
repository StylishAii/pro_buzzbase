"use client";
import Header from "@app/components/header/Header";
import { PlusIcon } from "@app/components/icon/PlusIcon";
import { useAuthContext } from "@app/contexts/useAuthContext";
import { getGroups } from "@app/services/groupService";
import { getCurrentUserId } from "@app/services/userService";
import { Avatar, Button, Divider, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Group() {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return router.push("/signin");
  }

  const [groups, setGroups] = useState<GroupsData[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    fetchUserIdData();
  }, []);

  useEffect(() => {
    if (currentUserId !== undefined) {
      fetchData(currentUserId);
    }
  }, [currentUserId]);

  const fetchUserIdData = async () => {
    try {
      const responseCurrentUserId = await getCurrentUserId();
      setCurrentUserId(responseCurrentUserId);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (currentUserId: number) => {
    try {
      const responseGroups = await getGroups(currentUserId);
      setGroups(responseGroups);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="buzz-dark flex flex-col w-full min-h-screen">
        <Header />
        <div className="h-full bg-main">
          <main className="h-full pb-16">
            <div className="px-4 py-14">
              <p className="text-lg mt-6 font-bold">
                友達とグループを作成しよう！
              </p>
              <p className="text-sm text-zinc-400 mt-2">
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
                  className="font-medium"
                >
                  グループ作成
                </Button>
              </div>
              <Divider className="mt-8" />
              <div className="mt-7">
                <h2 className="text-2xl font-bold">グループ</h2>
                <div className="mt-5 grid gap-y-5">
                  {groups.map((group) => (
                    <Link key={group.id} href={`/groups/${group.id}`}>
                      <div className="grid grid-cols-[56px_1fr] items-center gap-x-4">
                        <Avatar
                          size="lg"
                          isBordered
                          src={`${process.env.NEXT_PUBLIC_API_URL}${group.icon.url}`}
                        />
                        <p className="text-lg font-bold text-white">
                          {group.name}
                        </p>
                      </div>
                    </Link>
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
