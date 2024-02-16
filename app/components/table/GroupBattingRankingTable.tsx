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

type BattingAverage = {
  hit: number | null;
  home_run: number | null;
  id: number | null;
  runs_batted_in: number | null;
  stealing_base: number | null;
  name: string;
  user_id: string;
  image_url: string;
};

type BattingStats = {
  batting_average: number;
  on_base_percentage: number;
  name: string;
  user_id: string;
  image_url: string;
};

type Props = {
  battingAverage: BattingAverage[] | undefined;
  battingStats: BattingStats[] | undefined;
};

export default function GroupBattingRankingTable(props: Props) {
  const { battingAverage, battingStats } = props;

  function formatNumber(value: number): string {
    if (value < 1 && value > -1) {
      return value.toFixed(3).replace("0", "");
    }
    return value.toFixed(3);
  }

  const sortedBattingAverage =
    battingStats?.sort((a, b) => b.batting_average - a.batting_average) || [];

  const sortedHomeRun =
    battingAverage?.sort((a, b) => (b.home_run ?? 0) - (a.home_run ?? 0)) || [];

  const sortedRunsBattedIn =
    battingAverage?.sort(
      (a, b) => (b.runs_batted_in ?? 0) - (a.runs_batted_in ?? 0)
    ) || [];

  const sortedHit =
    battingAverage?.sort((a, b) => (b.hit ?? 0) - (a.hit ?? 0)) || [];

  const sortedStealingBase =
    battingAverage?.sort(
      (a, b) => (b.stealing_base ?? 0) - (a.stealing_base ?? 0)
    ) || [];

  const sortedOnBasePercentage =
    battingStats?.sort((a, b) => b.on_base_percentage - a.on_base_percentage) ||
    [];

  return (
    <>
      {/* 打率 */}
      <Table aria-label="打率" id="battingAverage">
        <TableHeader>
          <TableColumn className="text-base text-white font-bold text-center">
            打率
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedBattingAverage?.map((stats, index) => (
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
                          src: `${process.env.NEXT_PUBLIC_API_URL}${stats.image_url}`,
                        }}
                        className="justify-start"
                      />
                      <span className="text-base block font-bold">
                        {formatNumber(stats.batting_average)}
                      </span>
                    </div>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* 本塁打 */}
      <Table className="mt-8" aria-label="本塁打" id="homeRun">
        <TableHeader>
          <TableColumn className="text-base text-white font-bold text-center">
            本塁打
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedHomeRun?.map((stats, index) => (
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
                          src: `${process.env.NEXT_PUBLIC_API_URL}${stats.image_url}`,
                        }}
                        className="justify-start"
                      />
                      <span className="text-base block font-bold">
                        {stats.home_run}
                      </span>
                    </div>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* 打点 */}
      <Table className="mt-8" aria-label="打点" id="run">
        <TableHeader>
          <TableColumn className="text-base text-white font-bold text-center">
            打点
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedRunsBattedIn?.map((stats, index) => (
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
                          src: `${process.env.NEXT_PUBLIC_API_URL}${stats.image_url}`,
                        }}
                        className="justify-start"
                      />
                      <span className="text-base block font-bold">
                        {stats.runs_batted_in}
                      </span>
                    </div>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* 安打 */}
      <Table className="mt-8" aria-label="安打" id="hit">
        <TableHeader>
          <TableColumn className="text-base text-white font-bold text-center">
            安打
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedHit?.map((stats, index) => (
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
                          src: `${process.env.NEXT_PUBLIC_API_URL}${stats.image_url}`,
                        }}
                        className="justify-start"
                      />
                      <span className="text-base block font-bold">
                        {stats.hit}
                      </span>
                    </div>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* 盗塁 */}
      <Table className="mt-8" aria-label="盗塁" id="stealingBase">
        <TableHeader>
          <TableColumn className="text-base text-white font-bold text-center">
            盗塁
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedStealingBase?.map((stats, index) => (
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
                          src: `${process.env.NEXT_PUBLIC_API_URL}${stats.image_url}`,
                        }}
                        className="justify-start"
                      />
                      <span className="text-base block font-bold">
                        {stats.stealing_base}
                      </span>
                    </div>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* 出塁率 */}
      <Table className="mt-8" aria-label="出塁率" id="onBasePercentage">
        <TableHeader>
          <TableColumn className="text-base text-white font-bold text-center">
            出塁率
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortedOnBasePercentage?.map((stats, index) => (
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
                          src: `${process.env.NEXT_PUBLIC_API_URL}${stats.image_url}`,
                        }}
                        className="justify-start"
                      />
                      <span className="text-base block font-bold">
                        {formatNumber(stats.on_base_percentage)}
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
