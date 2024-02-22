import { UserIcon } from "@app/components/icon/UserIcon";
import Link from "next/link";

export default function HeaderLoginAndSignUp() {
  return (
    <>
      <Link href="/signin" className="text-sm text-white font-medium">
        ログイン
      </Link>
      <Link
        href="/signup"
        className="flex gap-x-1 bg-yellow-500 text-white text-sm py-1.5 px-3 h-auto rounded-lg font-medium"
      >
        <UserIcon
          fill="#F4F4F4"
          filled="#F4F4F4"
          height="18"
          width="18"
          label=""
        />
        新規登録
      </Link>
    </>
  );
}
