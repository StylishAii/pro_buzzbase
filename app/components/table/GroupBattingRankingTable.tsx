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

  const sortedBattingAverage =
    battingStats?.sort((a, b) => b.batting_average - a.batting_average) || [];

  const sortedHomeRun =
    battingAverage?.sort((a, b) => (b.home_run ?? 0) - (a.home_run ?? 0)) || [];

  console.log(battingAverage);
  console.log(battingStats);
  return (
    <>
      {/* 打率 */}
      <Table>
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
                        {stats.batting_average}
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
      <Table className="mt-8">
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
    </>
  );
}
