"use client";
import "@mantine/core/styles.css";
import {
  Image,
  Container,
  Title,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
  MantineProvider,
  CheckIcon,
  Card,
  SimpleGrid,
} from "@mantine/core";
import classes from "../../HeroBullets.module.css";

import { RecordIcon } from "@app/components/icon/RecordIcon";
import { GroupIcon } from "@app/components/icon/GroupIcon";
import { RankingIcon } from "@app/components/icon/RankingIcon";
import LoginAndSignUp from "@app/components/auth/LoginAndSignUp";
import LoginAndSignUpTopBottom from "@app/components/auth/LoginAndSignUpTopBottom";

const mockdata = [
  {
    title: "個人成績を記録",
    description:
      "打率・安打・本塁打・打点・盗塁や勝利数・防御率・奪三振率・被安打率など、打撃・投手成績を記録して管理することができます。",
    icon: RecordIcon,
  },
  {
    title: "友達とグループを作成",
    description:
      "フォローしているユーザーとグループを作成することができるので、チーム内外の野球友達とグループを作成して、成績を共有することができます。",
    icon: GroupIcon,
  },
  {
    title: "ランキング形式で共有",
    description:
      "グループ内のユーザーの成績が、各タイトルごとのランキングで表示されます。",
    icon: RankingIcon,
  },
];

export default function Top() {
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color="#e08e0a"
        fill="#e08e0a"
      />
      <Text fz="lg" fw={900} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" mt="sm" className="!text-zinc-300">
        {feature.description}
      </Text>
    </Card>
  ));
  return (
    <>
      <MantineProvider>
        <div className="h-full lg:m-[0_auto_0_22%]">
          <Container size="lg">
            <div className={classes.inner}>
              <div className={classes.content}>
                <p className="text-sm text-yellow-500 mb-2">
                  個人成績の管理・共有アプリ
                </p>
                <Title className={`${classes.title}`}>
                  野球の成績を記録、
                  <br />
                  友達と<span className={classes.highlight}>ランキング</span>
                  で共有
                </Title>
                <Text mt="md" className="!text-zinc-400 !text-sm !lg:text-base">
                  BUZZ
                  BASEは、個人の打撃・投手成績を記録することができます。そして、友達とグループを作成し「ランキング形式」で個人成績を共有・比較することができます。
                </Text>

                <List
                  mt={30}
                  spacing="sm"
                  size="sm"
                  icon={
                    <ThemeIcon size={20} radius="xl" color="#e08e0a">
                      <CheckIcon width="10" height="10" fill="#fff" />
                    </ThemeIcon>
                  }
                >
                  <List.Item>
                    <b>個人成績を記録</b> – 試合・打撃・投手成績を記録。
                  </List.Item>
                  <List.Item>
                    <b>友達とグループ作成</b> –
                    チーム内外の友達とグループを作成。成績をランキング形式で共有。
                  </List.Item>
                  <List.Item>
                    <b>マイページ機能</b> – 自分の試合結果や個人成績を管理。
                  </List.Item>
                </List>
                <LoginAndSignUp />
              </div>
              <Image src="/images/top-kv.png" className={classes.image} />
            </div>
          </Container>

          <Container size="lg" py="xl">
            <Group justify="center">
              <p className="py-1 px-4 bg-yellow-500 rounded-full text-sm font-medium">
                おすすめ機能
              </p>
            </Group>

            <Title order={2} className={classes.title} ta="center" mt="sm">
              友達と成績をランキング形式で共有しよう
            </Title>

            <Text
              className={`${classes.description} !text-zinc-400 !text-sm !lg:text-base`}
              ta="center"
              mt="md"
            >
              フォローしているユーザーをグループに招待することができ、グループ内ではお互いの成績がランキング形式で表示されます。
              <br />
              また、自分の試合での結果を記録して、打率や防御率などの成績を管理することができます。
            </Text>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
              {features}
            </SimpleGrid>
          </Container>

          <Container size="lg" className="pt-24 lg:pt-36">
            <div className={classes.wrapper}>
              <div className={classes.body}>
                <p className="py-1 px-4 bg-yellow-500 rounded-full text-sm font-medium w-fit">
                  つかいかた
                </p>
                <Title className={`${classes.sectionTitle} pt-3`}>
                  個人成績を記録
                </Title>
                <Text fw={500} fz="lg" mt={12} mb={8}>
                  試合・打撃・投手成績を記録
                </Text>
                <Text fz="sm" className="!text-zinc-400">
                  試合結果→打撃成績→投手成績の順番に、その試合の結果を入力していきます。
                  <br />
                  記録した成績は、「マイページ」から確認することができます。
                </Text>
              </div>
              <video
                width="284"
                height="160"
                autoPlay
                muted
                loop
                playsInline
                className="w-full mx-auto rounded-xl lg:w-auto"
              >
                <source src="/video/record.mp4" type="video/mp4" />
              </video>
            </div>
          </Container>
          <Container size="lg" className="pt-10 lg:pt-16">
            <div className={classes.wrapper}>
              <div className={classes.body}>
                <p className="py-1 px-4 bg-yellow-500 rounded-full text-sm font-medium w-fit">
                  つかいかた
                </p>
                <Title className={`${classes.sectionTitle} pt-3`}>
                  グループを作成
                </Title>
                <Text fw={500} fz="lg" mt={12} mb={8}>
                  フォローしているユーザーを招待
                </Text>
                <Text fz="sm" className="!text-zinc-400">
                  「グループ名・グループアイコン・招待するユーザー選択」を行い、成績を共有するグループを作成します。
                  <br />
                  招待されたユーザーは、「通知画面」から詳細されたグループに参加するかしないかを選択することができます。
                </Text>
              </div>
              <video
                width="284"
                height="160"
                autoPlay
                muted
                loop
                playsInline
                className="w-full mx-auto rounded-xl lg:w-auto"
              >
                <source src="/video/group.mp4" type="video/mp4" />
              </video>
            </div>
          </Container>
          <Container size="lg" className="pt-10 lg:pt-16">
            <div className={classes.wrapper}>
              <div className={classes.body}>
                <p className="py-1 px-4 bg-yellow-500 rounded-full text-sm font-medium w-fit">
                  つかいかた
                </p>
                <Title className={`${classes.sectionTitle} pt-3`}>
                  ランキング形式で共有
                </Title>
                <Text fw={500} fz="lg" mt={12} mb={8}>
                  グループ内で各ユーザーの成績を比較
                </Text>
                <Text fz="sm" className="!text-zinc-400">
                  グループに参加しているユーザー同士の成績をランキング形式で表示します。
                  <br />
                  チーム内外の友達とお互いの成績を共有・比較することができます。
                </Text>
              </div>
              <video
                width="284"
                height="160"
                autoPlay
                muted
                loop
                playsInline
                className="w-full mx-auto rounded-xl lg:w-auto"
              >
                <source src="/video/ranking.mp4" type="video/mp4" />
              </video>
            </div>
          </Container>
          <Container size="lg" className="pt-10 lg:pt-16">
            <div className={classes.wrapper}>
              <div className={classes.body}>
                <p className="py-1 px-4 bg-yellow-500 rounded-full text-sm font-medium w-fit">
                  つかいかた
                </p>
                <Title className={`${classes.sectionTitle} pt-3`}>
                  プロフィールを設定
                </Title>
                <Text fw={500} fz="lg" mt={12} mb={8}>
                  ポジション・所属チーム・受賞タイトルを設定
                </Text>
                <Text fz="sm" className="!text-zinc-400">
                  プロフィールにポジションと所属チームを設定することで、<br />
                  成績記録画面の、「守備位置」と「自チーム名」に初期値として設定されます。
                </Text>
              </div>
              <video
                width="284"
                height="160"
                autoPlay
                muted
                loop
                playsInline
                className="w-full mx-auto rounded-xl lg:w-auto"
              >
                <source src="/video/profile.mp4" type="video/mp4" />
              </video>
            </div>
          </Container>
          <div className="mt-56 mb-20 px-6 lg:mb-40">
            <div>
              <h3 className="text-2xl font-bold text-center lg:text-5xl">
                BUZZ BASE で野球をもっと楽しく
              </h3>
              <LoginAndSignUpTopBottom />
            </div>
          </div>
        </div>
      </MantineProvider>
    </>
  );
}
