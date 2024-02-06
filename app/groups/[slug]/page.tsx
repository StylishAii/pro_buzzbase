"use client";
import HeaderBackLink from "@app/components/header/HeaderBackLink";
import { getGroupDetail } from "@app/services/groupService";
import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";

type GroupDetailProps = {
  params: {
    slug: number;
  };
};

export default function GroupDetail({ params }: GroupDetailProps) {
  const [groupData, setGroupData] = useState<GroupsData | undefined>(undefined);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseGroupDetail = await getGroupDetail(params.slug);
      setGroupData(responseGroupDetail);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="buzz-dark">
        <HeaderBackLink backLink={"/groups"} />
        <div className="h-full">
          <main className="h-full">
            <div className="pt-16 pb-36 px-4 bg-main">
              <div className="grid grid-cols-[32px_1fr] gap-x-4 items-center">
                <Avatar
                  size="sm"
                  isBordered
                  src={`${process.env.NEXT_PUBLIC_API_URL}${groupData?.icon.url}`}
                />
                <p className="text-base font-bold text-white">
                  {groupData?.name}
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
