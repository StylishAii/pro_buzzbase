"use client";
import Logout from "@app/components/auth/Logout";

export default function Footer() {
  return (
    <>
      <footer className="border-t border-t-zinc-500 pt-12 px-4 pb-24 bg-main">
        <ul>
          <li>
            <Logout />
          </li>
        </ul>
      </footer>
    </>
  );
}
