import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Snippet,
  ModalHeader,
} from "@nextui-org/react";
import Link from "next/link";
import { XIcon } from "@app/components/icon/XIcon";
import Image from "next/image";

type Position = {
  id: string;
  name: string;
};

type User = {
  image: string;
  name: string;
  user_id: string;
  introduction: string;
  positions: Position[];
  team_id: number;
  id: number;
};

type Team = {
  id: number;
  name: string;
  category_id: number;
  prefecture_id: number;
};

type ProfileShareComponentProps = {
  userData: {
    user: User;
    isFollowing: boolean;
    followers_count: number;
    following_count: number;
  };
  teamData: Team;
  teamPrefectureName: string;
  teamCategoryName: string;
};

export default function ProfileShareComponent({
  userData,
  teamData,
  teamPrefectureName,
  teamCategoryName,
}: ProfileShareComponentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const shareText = () => {
    let text = `${userData.user.name}さんのプロフィール`;

    if (userData.user.positions && userData.user.positions.length > 0) {
      text += `【ポジション】${userData.user.positions[0].name}`;
    }

    if (teamData && teamData.name) {
      text += `【チーム】${teamData.name}`;
      if (teamPrefectureName) {
        text += `（${teamPrefectureName}）`;
      }
      if (teamCategoryName) {
        text += `｜${teamCategoryName}`;
      }
    }

    return encodeURIComponent(text);
  };

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText()}&url=https://buzzbase.jp/mypage/${
    userData.user.user_id
  }&hashtags=BuzzBase`;
  const lineShareUrl = `https://line.me/R/msg/text/?${shareText()} https://buzzbase.jp/mypage/${
    userData.user.user_id
  }`;

  const handleShareMobile = () => {
    let text = `${userData.user.name}さんのプロフィール`;

    if (userData.user.positions && userData.user.positions.length > 0) {
      text += `【ポジション】${userData.user.positions[0].name}`;
    }

    if (teamData && teamData.name) {
      text += `【チーム】${teamData.name}`;
      if (teamPrefectureName) {
        text += `（${teamPrefectureName}）`;
      }
      if (teamCategoryName) {
        text += `｜${teamCategoryName}`;
      }
    }

    if (navigator.share) {
      navigator
        .share({
          title: `${userData.user.name}さんのプロフィール`,
          text: text,
          url: `https://buzzbase.jp/mypage/${userData.user.user_id}`,
        })
        .catch((error) => console.error("Error sharing", error));
    } else {
      onOpen();
    }
  };

  return (
    <>
      <Button
        className="text-zinc-300 bg-transparent rounded-full text-xs border-1 border-zinc-400 w-full h-auto p-1.5 font-bold"
        onClick={handleShareMobile}
      >
        シェアする
      </Button>
      <Modal
        size="lg"
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        className="w-11/12"
      >
        <ModalContent>
          <ModalHeader className="justify-center">
            <p className="text-base">プロフィールをシェアする</p>
          </ModalHeader>
          <ModalBody>
            <Snippet
              color="default"
              size="sm"
              variant="bordered"
              symbol=""
              className="text-white"
            >
              {`https://buzzbase.jp/mypage/${userData.user.user_id}`}
            </Snippet>
            <div className="flex justify-center gap-x-6 mt-2">
              <Button
                as={Link}
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 bg-transparent"
                radius="sm"
                isIconOnly
                endContent={<XIcon fill="#F4F4F4" width="24" height="24" />}
              ></Button>
              <Button
                as={Link}
                href={lineShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 bg-transparent"
                radius="sm"
                isIconOnly
                endContent={
                  <Image
                    src="/images/icon-line.png"
                    alt=""
                    width={34}
                    height={34}
                  />
                }
              ></Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
