import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Snippet,
  ModalHeader,
  ModalFooter,
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
  const [isCopied, setIsCopied] = useState(false);

  const handleShareMobile = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${userData.user.name}さんのプロフィール`,
          text: `ポジション：${userData.user.positions[0]?.name}、チーム：${teamData?.name}（${teamPrefectureName}）｜${teamCategoryName}`,
          url: `https://buzzbase.jp/mypage/${userData.user.user_id}`,
        })
        .catch((error) => console.error("Error sharing", error));
    } else {
      onOpen();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`https://buzzbase.jp/mypage/${userData.user.user_id}`)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => console.error("Could not copy text: ", err));
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
              onClick={copyToClipboard}
            >
              {`https://buzzbase.jp/mypage/${userData.user.user_id}`}
            </Snippet>
            <div className="flex justify-center gap-x-6 mt-2">
              <Button
                as={Link}
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `${userData.user.name}さんのプロフィール【ポジション】${userData.user.positions[0]?.name}【チーム】${teamData?.name}（${teamPrefectureName})｜${teamCategoryName}`
                )}&url=https://buzzbase.jp/mypage/${
                  userData.user.user_id
                }&hashtags=BuzzBase`}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 bg-transparent"
                radius="sm"
                isIconOnly
                endContent={<XIcon fill="#F4F4F4" width="24" height="24" />}
              ></Button>
              <Button
                as={Link}
                href={`https://line.me/R/msg/text/?${encodeURIComponent(
                  `${userData.user.name}さんのプロフィール【ポジション】${userData.user.positions[0]?.name}【チーム】${teamData?.name}（${teamPrefectureName})｜${teamCategoryName} https://buzzbase.jp/mypage/${userData.user.user_id}`
                )}`}
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
