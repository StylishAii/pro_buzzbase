"use client";

import { BallIcon } from "@app/components/icon/BallIcon";
import { CrownIcon } from "@app/components/icon/CrownIcon";
import { GloveIcon } from "@app/components/icon/GloveIcon";
import LoadingSpinner from "@app/components/spinner/LoadingSpinner";
import IndividualResultsList from "@app/components/user/IndividualResultsList";
import MatchResultList from "@app/components/user/MatchResultList";
import MyPageLayout from "@app/mypage/[slug]/layout";
import { getUserData } from "@app/services/userService";
import { Avatar, Button, Link, Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

type Position = {
  id: string;
  name: string;
};

type userData = {
  image: any;
  name: string;
  user_id: string;
  url: string;
  introduction: string;
  positions: Position[];
};

export default function MyPage() {
  const [userData, setUserData] = useState<userData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (!userData) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <MyPageLayout pageType="mypage">
        <div className="pt-16 pb-36 bg-main">
          <div className=" px-4">
            <div className="flex gap-5">
              <Avatar
                size="lg"
                isBordered
                src={`${process.env.NEXT_PUBLIC_API_URL}${userData.image.url}`}
              />
              <div className="flex flex-col gap-1.5 items-start justify-center">
                <h1 className="text-lg font-semibold leading-none">
                  {userData.name}
                </h1>
                <p className="text-sm tracking-tight text-zinc-400">
                  @{userData.user_id}
                </p>
              </div>
            </div>
            {userData.introduction?.length > 1 ? (
              <>
                <p className="text-sm mt-4">{userData.introduction}</p>
              </>
            ) : (
              ""
            )}
            {userData.positions?.length > 1 ? (
              <>
                <ul className="flex items-center gap-x-2 mt-4 relative -left-0.5">
                  <li>
                    <GloveIcon width="18" height="18" fill="#F4F4F4d0" />
                  </li>
                  <li>
                    <ul className="flex items-center">
                      {userData.positions.map((position, index) => (
                        <React.Fragment key={position.id}>
                          <li>
                            <p className="text-sm text-zinc-400">
                              {position.name}
                            </p>
                          </li>
                          {index < userData.positions.length - 1 && (
                            <li>
                              <p className="text-sm text-zinc-400">
                                &nbsp;/&nbsp;
                              </p>
                            </li>
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  </li>
                </ul>
              </>
            ) : (
              ""
            )}
            <ul className="flex gap-x-1.5 mt-1.5">
              <li>
                <BallIcon width="18" height="18" fill="#F4F4F4d0" />
              </li>
              <li>
                <ul className="flex items-center gap-x-1">
                  <li>
                    <p className="text-sm text-zinc-400">
                      北中学 / 二子玉川高校 / ワシントン大学 / バンデーズクラブ
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="mt-2 grid gap-y-1">
              <li className="flex items-start gap-x-1.5">
                <CrownIcon width="22" height="22" fill="#e08e0ad0" />
                <p className="text-sm text-zinc-400">
                  都市対抗野球大会MVP（2022）/ 都市対抗野球大会MVP（2023）
                </p>
              </li>
            </ul>
            <div className="flex items-center gap-x-4 mt-2">
              <div className="flex gap-x-1">
                <span className="text-sm font-bold">100</span>
                <p className="text-sm font-light text-zinc-400 tracking-tighter">
                  フォロー中
                </p>
              </div>
              <div className="flex gap-x-1">
                <span className="text-sm font-bold">140</span>
                <p className="text-sm font-light text-zinc-400 tracking-tighter">
                  フォロワー
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-4 mt-4">
              <Button
                href={`${userData.user_id}/edit`}
                as={Link}
                className="text-zinc-300 bg-transparent rounded-full text-xs border-1 border-zinc-400 w-full h-auto p-1.5"
              >
                プロフィール編集
              </Button>
              <Button
                href="/share"
                as={Link}
                className="text-zinc-300 bg-transparent rounded-full text-xs border-1 border-zinc-400 w-full h-auto p-1.5"
              >
                シェアする
              </Button>
            </div>
            <div className="mt-8">
              <Tabs
                color="primary"
                size="lg"
                aria-label="Tabs colors"
                radius="lg"
                className="w-full grid sticky top-10 z-50"
              >
                <Tab
                  key="score"
                  title="成績"
                  className="font-bold tracking-wide"
                >
                  <IndividualResultsList />
                </Tab>
                <Tab
                  key="game"
                  title="試合"
                  className="font-bold tracking-wide"
                >
                  <MatchResultList />
                </Tab>
                {/* <Tab
                key="message"
                title="応援"
                className="font-bold tracking-wide"
              >
                <SupportMessagesList />
              </Tab> */}
              </Tabs>
            </div>
          </div>
        </div>
      </MyPageLayout>
    </>
  );
}
