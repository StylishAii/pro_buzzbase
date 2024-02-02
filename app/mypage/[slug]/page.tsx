"use client";

import { BallIcon } from "@app/components/icon/BallIcon";
import { CrownIcon } from "@app/components/icon/CrownIcon";
import { GloveIcon } from "@app/components/icon/GloveIcon";
import LoadingSpinner from "@app/components/spinner/LoadingSpinner";
import IndividualResultsList from "@app/components/user/IndividualResultsList";
import MatchResultList from "@app/components/user/MatchResultList";
import { getCurrentUserId, getUserIdData } from "@app/services/userService";
import { Button, Link, Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Header from "@app/components/header/Header";
import { getTeams } from "@app/services/teamsService";
import { getBaseballCategory } from "@app/services/baseballCategoryService";
import { getPrefectures } from "@app/services/prefectureService";
import { getUserAwards } from "@app/services/awardsService";
import AvatarComponent from "@app/components/user/AvatarComponent";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@app/contexts/useAuthContext";
import FollowButton from "@app/components/button/FollowButton";

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

type Team = {
  id: number;
  name: string;
  category_id: number;
  prefecture_id: number;
};

export default function MyPage() {
  const [userData, setUserData] = useState<userData | null>(null);
  const [teamData, setTeamData] = useState<Team[]>([]);
  const [teamCategoryName, setTeamCategoryName] = useState("");
  const [teamPrefectureName, setTeamPrefectureName] = useState("");
  const [userAwards, setUserAwards] = useState<UserAwards[]>([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userId, setUserId] = useState(0);
  const pathName = usePathname();
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    const pathParts = pathName.split("/");
    const userIdPart = pathParts[pathParts.length - 1];
    if (userIdPart && userIdPart !== "undefined") {
      fetchData(userIdPart);
    }
  }, [pathName]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCurrentUserIdData();
    }
  }, [isLoggedIn]);

  const fetchCurrentUserIdData = async () => {
    try {
      if (isLoggedIn) {
        const currentUserIdData = await getCurrentUserId();
        setCurrentUserId(currentUserIdData);
      }
    } catch (error) {
      throw error;
    }
  };

  const isCurrentUserPage = currentUserId === userData?.user.id;

  const fetchData = async (userId: string) => {
    try {
      const data = await getUserIdData(userId);
      setUserData(data);
      setUserId(data.user.id);
      if (data.user.team_id) {
        const teamsData = await getTeams();
        const baseballCategoryData = await getBaseballCategory();
        const prefectureData = await getPrefectures();
        const userTeam = teamsData.find(
          (team: { id: any }) => team.id === data.user.team_id
        );
        if (userTeam) {
          setTeamData([userTeam]);
        }
        const category = baseballCategoryData.find(
          (category: { id: number }) => category.id === userTeam.category_id
        );
        if (category) {
          setTeamCategoryName(category.name);
        }
        const prefecture = prefectureData.find(
          (prefecture: { id: number }) =>
            prefecture.id === userTeam.prefecture_id
        );
        if (prefecture) {
          setTeamPrefectureName(prefecture.name);
        }
      }

      const awardData = await getUserAwards(data.user.id);
      if (awardData) {
        setUserAwards(awardData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!userData) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <div className="buzz-dark">
      <Header />
      <div className="h-full">
        <main className="h-full">
          <div className="pt-16 pb-36 bg-main">
            <div className=" px-4">
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
                        {userData.user.positions.map((position, index) => (
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
                        ))}
                      </ul>
                    </li>
                  </ul>
                </>
              ) : (
                ""
              )}
              {userData.user.team_id ? (
                <>
                  <ul className="flex items-center gap-x-1.5 mt-1.5">
                    <li>
                      <BallIcon width="18" height="18" fill="#F4F4F4d0" />
                    </li>
                    <li>
                      <ul className="flex items-center gap-x-1">
                        {teamData?.map((team) => (
                          <React.Fragment key={team.id}>
                            <li>
                              <p className="text-sm text-zinc-400">
                                {`${team.name}（${teamPrefectureName}）｜ ${teamCategoryName}`}
                              </p>
                            </li>
                          </React.Fragment>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </>
              ) : (
                ""
              )}
              {userAwards[0] ? (
                <>
                  <ul className="mt-2 grid gap-y-1">
                    <li className="flex items-start gap-x-1.5">
                      <CrownIcon
                        width="20"
                        height="20"
                        fill="#e08e0ad0"
                        className="min-w-min"
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
              ) : (
                ""
              )}

              <div className="flex items-center gap-x-4 mt-2">
                <div className="flex gap-x-1">
                  <span className="text-sm font-bold">{userData.following_count}</span>
                  <p className="text-sm font-light text-zinc-400 tracking-tighter">
                    フォロー中
                  </p>
                </div>
                <div className="flex gap-x-1">
                  <span className="text-sm font-bold">{userData.followers_count}</span>
                  <p className="text-sm font-light text-zinc-400 tracking-tighter">
                    フォロワー
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-4 mt-4">
                {isCurrentUserPage ? (
                  <>
                    <Button
                      href={`${userData.user.user_id}/edit`}
                      as={Link}
                      className="text-zinc-300 bg-transparent rounded-full text-xs border-1 border-zinc-400 w-full h-auto p-1.5"
                    >
                      プロフィール編集
                    </Button>
                  </>
                ) : (
                  <>
                    <FollowButton
                      userId={userData.user.id}
                      isFollowing={userData.isFollowing}
                    />
                  </>
                )}

                <Button
                  href="/share"
                  as={Link}
                  className="text-zinc-300 bg-transparent rounded-full text-xs border-1 border-zinc-400 w-full h-auto p-1.5 font-bold"
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
                    <IndividualResultsList userId={userId} />
                  </Tab>
                  <Tab
                    key="game"
                    title="試合"
                    className="font-bold tracking-wide"
                  >
                    <MatchResultList userId={userId} />
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
