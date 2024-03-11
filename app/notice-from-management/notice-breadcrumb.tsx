import Link from "next/link";

export default function NoticeBreadcrumb() {
  return (
    <ul className="flex flex-wrap items-center mb-2">
      <li className="text-xs lg:text-sm">
        <Link href="/notice-from-management">運営からのお知らせ</Link>
      </li>
    </ul>
  );
}
