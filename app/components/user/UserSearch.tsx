import { SearchIcon } from "@app/components/icon/SearchIcon";
import Link from "next/link";

export default function UserSearch() {
  return (
    <>
      <Link href="/users/search">
        <SearchIcon width="22" height="22" stroke="#f4f4f4" />
      </Link>
    </>
  );
}
