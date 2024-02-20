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

type MatchResult = {
  my_team_score: number;
  opponent_team_score: number;
  opponent_team_name: string;
};

type ResultShareComponentProps = {
  matchResult: MatchResult[];
  id: number | null;
};

export default function ResultShareComponent({
  matchResult,
  id,
}: ResultShareComponentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${matchResult[0]?.my_team_score} 対 ${matchResult[0]?.opponent_team_score} vs ${matchResult[0]?.opponent_team_name}`
  )}&url=https://buzzbase.jp/game-result/summary/${id}&hashtags=BUZZBASE`;

  const lineShareUrl = `https://line.me/R/msg/text/?${encodeURIComponent(
    `${matchResult[0]?.my_team_score} 対 ${matchResult[0]?.opponent_team_score} vs ${matchResult[0]?.opponent_team_name} https://buzzbase.jp/game-result/summary/${id}`
  )}`;

  const handleShareMobile = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `試合結果`,
          text: `${matchResult[0]?.my_team_score} 対 ${matchResult[0]?.opponent_team_score} vs ${matchResult[0]?.opponent_team_name}`,
          url: `https://buzzbase.jp/game-result/summary/${id}`,
        })
        .catch((error) => console.error("Error sharing", error));
    } else {
      onOpen();
    }
  };

  return (
    <>
      <Button
        color="primary"
        size="md"
        onClick={handleShareMobile}
        className="mt-3"
        radius="md"
      >
        成績をシェア
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
            <p className="text-base">試合結果をシェアする</p>
          </ModalHeader>
          <ModalBody>
            <Snippet
              color="default"
              size="sm"
              variant="bordered"
              symbol=""
              className="text-white"
            >
              {`https://buzzbase.jp/game-result/summary/${id}`}
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
                    alt="LINE"
                    width={36}
                    height={36}
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
