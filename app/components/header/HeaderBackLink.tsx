import { BackIcon } from "@app/components/icon/BackIcon";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";

type Props = {
  backLink: string;
  groupName: string | undefined;
  groupIconLink: string;
};

export default function HeaderBackLink(props: Props) {
  const { backLink, groupName, groupIconLink } = props;
  return (
    <>
      <header className="py-2.5 px-3 border-b border-b-zinc-500 fixed top-0 w-full bg-main z-50">
        <div className="flex items-center justify-between h-full max-w-[692px] mx-auto">
          <Link href={backLink}>
            <BackIcon width="24" height="24" fill="" stroke="white" />
          </Link>
          <div className="grid grid-cols-[32px_1fr] gap-x-2 items-center">
            <Avatar size="sm" isBordered src={groupIconLink} className="w-7 h-7"/>
            <p className="text-sm font-bold text-white">{groupName}</p>
          </div>
        </div>
      </header>
    </>
  );
}
