"use client";
import HeaderBackLink from "@app/components/header/HeaderBackLink";
import { getGroupDetail } from "@app/services/groupService";
import { Avatar, Button, Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

type GroupDetailProps = {
  params: {
    slug: number;
  };
};

type GroupsDetailData = {
  accepted_users: [
    {
      id: number;
      image: {
        url: string;
      };
      name: string;
      user_id: string;
    }
  ];
  batting_averages: [
    {
      hit: number | null;
      home_run: number | null;
      id: number | null;
      runs_batted_in: number | null;
      stealing_base: number | null;
    }
  ];
  batting_stats: [
    {
      batting_average: number;
      on_base_percentage: number;
    }
  ];
  pitching_aggregate: [
    {
      win: number;
      hold: number;
      saves: number;
      strikeouts: number;
    }
  ];
  pitching_stats: [
    {
      era: number;
      win_percentage: number;
    }
  ];
  group: {
    icon: {
      url: string;
    };
    name: string;
  };
  id: number;
};

const BattingAverageTitle = [
  { id: 0, title: "打率" },
  { id: 1, title: "本塁打" },
  { id: 2, title: "打点" },
  { id: 3, title: "安打" },
  { id: 4, title: "盗塁" },
  { id: 5, title: "出塁率" },
];

const PitchingResultTitle = [
  { id: 0, title: "防御率" },
  { id: 1, title: "勝利" },
  { id: 2, title: "セーブ" },
  { id: 3, title: "HP" },
  { id: 4, title: "奪三振" },
  { id: 5, title: "勝率" },
];

export default function GroupDetail({ params }: GroupDetailProps) {
  const [groupData, setGroupData] = useState<GroupsDetailData | undefined>(
    undefined
  );

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

  console.log(groupData);
  return (
    <>
      <div className="buzz-dark">
        <HeaderBackLink
          backLink={"/groups"}
          groupName={groupData?.group.name}
          groupIconLink={`${process.env.NEXT_PUBLIC_API_URL}${groupData?.group.icon.url}`}
        />
        <div className="h-full">
          <main className="h-full">
            <div className="pt-16 pb-36 px-4 bg-main">
              <div>
                <Tabs
                  color="primary"
                  size="md"
                  aria-label="成績種類"
                  radius="md"
                  variant="solid"
                  className="w-full grid mt-4"
                >
                  <Tab
                    key="batting"
                    title="打撃成績"
                    className="font-bold tracking-wide"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {BattingAverageTitle.map((title) => (
                        <Button
                          key={title.id}
                          href=""
                          as={Link}
                          color="primary"
                          variant="ghost"
                          size="sm"
                          radius="sm"
                        >
                          {title.title}
                        </Button>
                      ))}
                    </div>
                  </Tab>
                  <Tab
                    key="pitching"
                    title="投手成績"
                    className="font-bold tracking-wide"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {PitchingResultTitle.map((title) => (
                        <Button
                          key={title.id}
                          href=""
                          as={Link}
                          color="primary"
                          variant="ghost"
                          size="sm"
                          radius="sm"
                        >
                          {title.title}
                        </Button>
                      ))}
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
