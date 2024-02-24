"use client";
import { BallIcon } from "@app/components/icon/BallIcon";
import { CrownIcon } from "@app/components/icon/CrownIcon";
import { GloveIcon } from "@app/components/icon/GloveIcon";
import IndividualResultsList from "@app/components/user/IndividualResultsList";
import MatchResultList from "@app/components/user/MatchResultList";
import { Spinner, Tab, Tabs } from "@nextui-org/react";
import React, { useState } from "react";
import Header from "@app/components/header/Header";
import AvatarComponent from "@app/components/user/AvatarComponent";
import { useAuthContext } from "@app/contexts/useAuthContext";
import FollowButton from "@app/components/button/FollowButton";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import ProfileShareComponent from "@app/components/share/ProfileShareComponent";
import Link from "next/link";
import getUserIdData from "@app/hooks/user/getUserIdData";
import getUserAwards from "@app/hooks/user/getUserAwards";
import getMyTeams from "@app/hooks/team/getTeams";
import useCurrentUserId from "@app/hooks/user/useCurrentUserId";

type Position = {
  id: string;
  name: string;
};

type userData = {
  user: {
    image: any;
    name: string;
    user_id: string;
    url: string;
    introduction: string;
    positions: Position[];
    team_id: number;
    id: number;
  };
  isFollowing: boolean;

  followers_count: number;
  following_count: number;
};

export default function MyPage() {
  const { isLoggedIn } = useAuthContext();
  const [errors, setErrors] = useState<string[]>([]);

  const { userData, isLoadingUsers, isErrorUser } = getUserIdData();
  const { teamData, isLoadingTeams } = getMyTeams();
  const { userAwards, isLoadingAwards } = getUserAwards();
  const { currentUserId, isLoadingCurrentUserId } = useCurrentUserId();

  const isLoading = isLoadingUsers;
  const isError = isErrorUser;

  if (isLoading) {
    return (
      <div className="flex justify-center pb-12 buzz-dark flex-col w-full min-h-screen lg:max-w-[720px] lg:m-[0_auto_0_28%]">
        <Spinner color="primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-white text-center flex flex-col w-full min-h-screen justify-center">
        ユーザーデータの読み込みに失敗しました。
      </p>
    );
  }

  const isCurrentUserPage = currentUserId?.id === userData?.user.id;

  const setErrorsWithTimeout = (newErrors: React.SetStateAction<string[]>) => {
    setErrors(newErrors);
    setTimeout(() => {
      setErrors([]);
    }, 2000);
  };

  return (
    <div className="buzz-dark flex flex-col w-full min-h-screen">
      <Header />
      <div className="h-full bg-main">
        <ErrorMessages errors={errors} />
        <main className="h-full max-w-[720px] mx-auto lg:m-[0_auto_0_28%]">
          <div className="pt-20 pb-20 bg-main lg:pt-14 lg:border-x-1 lg:border-b-1 lg:border-zinc-500 lg:pb-0 lg:mb-14">
            <div className="px-4 lg:p-6">
              <AvatarComponent userData={userData} />
              {userData.user.introduction?.length > 0 ? (
                <>
                  <p className="text-sm mt-4">{userData.user.introduction}</p>
                </>
              ) : (
                ""
              )}
              {userData.user.positions?.length > 0 ? (
                <>
                  <ul className="flex items-center gap-x-2 mt-4 relative -left-0.5">
                    <li>
                      <GloveIcon width="18" height="18" fill="#F4F4F4d0" />
                    </li>
                    <li>
                      <ul className="flex items-center">
                        {userData.user.positions.map(
                          (position: Position, index: number) => (
                            <React.Fragment key={position.id}>
                              <li>
                                <p className="text-sm text-zinc-400">
                                  {position.name}
                                </p>
                              </li>
                              {index < userData.user.positions.length - 1 && (
                                <li>
                                  <p className="text-sm text-zinc-400">
                                    &nbsp;/&nbsp;
                                  </p>
                                </li>
                              )}
                            </React.Fragment>
                          )
                        )}
                      </ul>
                    </li>
                  </ul>
                </>
              ) : (
                ""
              )}
              {teamData && teamData.name && (
                <>
                  <ul className="flex items-center gap-x-1.5 mt-1.5">
                    <li>
                      <BallIcon width="18" height="18" fill="#F4F4F4d0" />
                    </li>
                    <li>
                      <ul className="flex items-center gap-x-1">
                        <li>
                          <p className="text-sm text-zinc-400">
                            {`${teamData?.name}（${teamData?.category_name}）｜ ${teamData?.prefecture_name}`}
                          </p>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </>
              )}
              {userAwards && userAwards.length > 0 && (
                <>
                  <ul className="mt-2 grid gap-y-1">
                    <li className="flex items-start gap-x-1.5">
                      <CrownIcon
                        width="20"
                        height="20"
                        fill="#e08e0ad0"
                        className="min-w-[20px]"
                      />
                      <ul className="flex flex-wrap items-center gap-x-1">
                        {userAwards
                          .sort((a, b) => a.id - b.id)
                          .map((award) => (
                            <li key={award.id}>
                              <p className="text-sm text-zinc-400">
                                {award.title}
                              </p>
                            </li>
                          ))}
                      </ul>
                    </li>
                  </ul>
                </>
              )}
              <div className="flex items-center gap-x-4 mt-2">
                <Link href={`/mypage/${userData.user.user_id}/following/`}>
                  <div className="flex gap-x-1">
                    <span className="text-sm font-bold text-white">
                      {userData.following_count}
                    </span>
                    <p className="text-sm font-light text-zinc-400 tracking-tighter">
                      フォロー中
                    </p>
                  </div>
                </Link>
                <Link href={`/mypage/${userData.user.user_id}/followers/`}>
                  <div className="flex gap-x-1">
                    <span className="text-sm font-bold text-white">
                      {userData.followers_count}
                    </span>
                    <p className="text-sm font-light text-zinc-400 tracking-tighter">
                      フォロワー
                    </p>
                  </div>
                </Link>
              </div>
              <div className="flex items-center gap-x-4 mt-4">
                {isLoggedIn ? (
                  <>
                    {isCurrentUserPage ? (
                      <>
                        <Link
                          href="/mypage/edit"
                          className="text-zinc-300 bg-transparent rounded-full text-xs border-1 border-zinc-400 w-full h-auto p-1.5 text-center"
                        >
                          プロフィール編集
                        </Link>
                      </>
                    ) : (
                      <>
                        <FollowButton
                          userId={userData.user.id}
                          isFollowing={userData.isFollowing}
                          setErrorsWithTimeout={setErrorsWithTimeout}
                        />
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
                <ProfileShareComponent
                  userData={userData}
                  teamData={teamData}
                />
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
                    <IndividualResultsList userId={userData.user.id} />
                  </Tab>
                  <Tab
                    key="game"
                    title="試合"
                    className="font-bold tracking-wide"
                  >
                    <MatchResultList userId={userData.user.id} />
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
        </main>
      </div>
    </div>
  );
}
