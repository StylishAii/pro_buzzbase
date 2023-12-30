import { Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react";

export default function MatchResultsItem() {
  return (
    <>
      <div>
        <Card className="px-4 py-3">
          <CardHeader className="p-0 flex-col items-start">
            <div className="flex items-center gap-x-2">
              <Chip
                variant="faded"
                classNames={{
                  base: "border-small border-zic-500 px-2",
                  content: "text-yellow-500 text-xs",
                }}
              >
                公式戦
              </Chip>
              <p className="text-sm font-normal">2023.10.22</p>
            </div>
            <div className="flex gap-x-3 items-center mt-2">
              <div className="flex gap-x-2 items-baseline">
                <p className="text-red-500">◯</p>
                <p className="text-lg">4 - 2</p>
              </div>
              <div className="flex gap-x-1 items-baseline">
                <span className="text-base font-normal text-zinc-400">vs.</span>
                <p className="text-base font-bold">対戦相手チーム名</p>
              </div>
            </div>
          </CardHeader>
          <Divider className="my-3" />
          <CardBody className="p-0">
            <p className="text-sm font-normal text-zinc-400">打撃</p>
            <ul className="flex flex-wrap gap-2 ">
              <li className="font-light">三振</li>
              <li className="text-red-500 font-bold">本塁打</li>
              <li className="text-red-500 font-bold">二塁打</li>
              <li className="text-blue-400 font-light">四球</li>
            </ul>
            <p className="text-sm font-normal text-zinc-400 mt-2">投手</p>
            <ul className="flex flex-wrap gap-2 ">
              <li className="font-light">6回2/3</li>
              <li className="font-light">2失点</li>
              <li className="text-red-500 font-bold">勝利投手</li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
