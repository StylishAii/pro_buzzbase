import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import Link from "next/link";

type PitchingAggregate = {
  win: number;
  hold: number;
  saves: number;
  strikeouts: number;
  name: string;
  user_id: string;
  image_url: string;
};

type PitchingStats = {
  era: number;
  win_percentage: number;
  name: string;
  user_id: string;
  image_url: string;
};

type Props = {
  pitchingAggregate: PitchingAggregate[] | undefined;
  pitchingStats: PitchingStats[] | undefined;
};

export default function GroupPitchingRankingTable(props: Props) {
  const { pitchingAggregate, pitchingStats } = props;

  function formatNumber(value: number): string {
    if (value < 1 && value > -1) {
      return value.toFixed(3).replace("0", "");
    }
    return value.toFixed(2);
  }

  const sortedPitchingEra = pitchingStats?.sort((a, b) => b.era - a.era) || [];

  const sortedWin =
    pitchingAggregate?.sort((a, b) => (b.win ?? 0) - (a.win ?? 0)) || [];

  const sortedSaves =
    pitchingAggregate?.sort((a, b) => (b.saves ?? 0) - (a.saves ?? 0)) || [];

  const sortedHp =
    pitchingAggregate?.sort((a, b) => (b.hold ?? 0) - (a.hold ?? 0)) || [];

  const sortedStrikeouts =
    pitchingAggregate?.sort(
      (a, b) => (b.strikeouts ?? 0) - (a.strikeouts ?? 0)
    ) || [];

  const sortedWinPercentage =
    pitchingStats?.sort((a, b) => b.win_percentage - a.win_percentage) || [];

  return (
    <>
      {/* 防御率 */}
      <Table aria-label="防御率" id="era">
        <TableHeader>
          <TableColumn className="text-base text-white font-bold text-center">
            防御率
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedPitchingEra?.map((stats, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="grid grid-cols-[1fr_auto] items-center ">
                  <Link href={`/mypage/${stats.user_id}`} className="block">
                    <div className="grid grid-cols-[24px_1fr_auto] items-center">
                      <span className="text-base block mr-4">{index + 1}</span>
                      <User
                        name={stats.name}
                        description={stats.user_id}
                        avatarProps={{
                          src:
                            process.env.NODE_ENV === "production"
                              ? stats.image_url
                              : `${process.env.NEXT_PUBLIC_API_URL}${stats.image_url}`,
                        }}
                        className="justify-start"
                      />
                      <span className="text-base block font-bold">
                        {formatNumber(stats.era)}
                      </span>
                    </div>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* 勝利 */}
      <Table className="mt-8" aria-label="勝利" id="win">
        <TableHeader>
          <TableColumn className="text-base text-white font-bold text-center">
            勝利
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedWin?.map((stats, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="grid grid-cols-[1fr_auto] items-center ">
                  <Link href={`/mypage/${stats.user_id}`} className="block">
                    <div className="grid grid-cols-[24px_1fr_auto] items-center">
                      <span className="text-base block mr-4">{index + 1}</span>
                      <User
                        name={stats.name}
                        description={stats.user_id}
                        avatarProps={{
                          src:
                            process.env.NODE_ENV === "production"
                              ? stats.image_url
                              : `${process.env.NEXT_PUBLIC_API_URL}${stats.image_url}`,
                        }}
                        className="justify-start"
                      />
                      <span className="text-base block font-bold">
                        {stats.win}
                      </span>
                    </div>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* セーブ */}
      <Table className="mt-8" aria-label="セーブ" id="saves">
        <TableHeader>
          <TableColumn className="text-base text-white font-bold text-center">
            セーブ
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedSaves?.map((stats, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="grid grid-cols-[1fr_auto] items-center ">
                  <Link href={`/mypage/${stats.user_id}`} className="block">
                    <div className="grid grid-cols-[24px_1fr_auto] items-center">
                      <span className="text-base block mr-4">{index + 1}</span>
                      <User
                        name={stats.name}
                        description={stats.user_id}
                        avatarProps={{
                          src:
                            process.env.NODE_ENV === "production"
                              ? stats.image_url
                              : `${process.env.NEXT_PUBLIC_API_URL}${stats.image_url}`,
                        }}
                        className="justify-start"
                      />
                      <span className="text-base block font-bold">
                        {stats.saves}
                      </span>
                    </div>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* HP */}
      <Table className="mt-8" aria-label="HP" id="hp">
        <TableHeader>
          <TableColumn className="text-base text-white font-bold text-center">
            HP
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedHp?.map((stats, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="grid grid-cols-[1fr_auto] items-center ">
                  <Link href={`/mypage/${stats.user_id}`} className="block">
                    <div className="grid grid-cols-[24px_1fr_auto] items-center">
                      <span className="text-base block mr-4">{index + 1}</span>
                      <User
                        name={stats.name}
                        description={stats.user_id}
                        avatarProps={{
                          src:
                            process.env.NODE_ENV === "production"
                              ? stats.image_url
                              : `${process.env.NEXT_PUBLIC_API_URL}${stats.image_url}`,
                        }}
                        className="justify-start"
                      />
                      <span className="text-base block font-bold">
                        {stats.hold}
                      </span>
                    </div>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* 奪三振 */}
      <Table className="mt-8" aria-label="奪三振" id="strikeouts">
        <TableHeader>
          <TableColumn className="text-base text-white font-bold text-center">
            奪三振
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedStrikeouts?.map((stats, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="grid grid-cols-[1fr_auto] items-center ">
                  <Link href={`/mypage/${stats.user_id}`} className="block">
                    <div className="grid grid-cols-[24px_1fr_auto] items-center">
                      <span className="text-base block mr-4">{index + 1}</span>
                      <User
                        name={stats.name}
                        description={stats.user_id}
                        avatarProps={{
                          src:
                            process.env.NODE_ENV === "production"
                              ? stats.image_url
                              : `${process.env.NEXT_PUBLIC_API_URL}${stats.image_url}`,
                        }}
                        className="justify-start"
                      />
                      <span className="text-base block font-bold">
                        {stats.strikeouts}
                      </span>
                    </div>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* 勝率 */}
      <Table className="mt-8" aria-label="勝率" id="winPercentage">
        <TableHeader>
          <TableColumn className="text-base text-white font-bold text-center">
            勝率
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedWinPercentage?.map((stats, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="grid grid-cols-[1fr_auto] items-center ">
                  <Link href={`/mypage/${stats.user_id}`} className="block">
                    <div className="grid grid-cols-[24px_1fr_auto] items-center">
                      <span className="text-base block mr-4">{index + 1}</span>
                      <User
                        name={stats.name}
                        description={stats.user_id}
                        avatarProps={{
                          src:
                            process.env.NODE_ENV === "production"
                              ? stats.image_url
                              : `${process.env.NEXT_PUBLIC_API_URL}${stats.image_url}`,
                        }}
                        className="justify-start"
                      />
                      <span className="text-base block font-bold">
                        {formatNumber(stats.win_percentage)}
                      </span>
                    </div>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
