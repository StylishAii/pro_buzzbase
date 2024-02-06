import { BackIcon } from "@app/components/icon/BackIcon";
import Link from "next/link";

type Props = {
  backLink: string;
};

export default function HeaderBackLink(props: Props) {
  const { backLink } = props;
  return (
    <>
      <header className="py-2 px-3 border-b border-b-zinc-500 fixed top-0 w-full bg-main z-50">
        <div className="flex items-center justify-between h-full">
          <Link href={backLink}>
            <BackIcon width="24" height="24" fill="" stroke="white" />
          </Link>
        </div>
      </header>
    </>
  );
}
