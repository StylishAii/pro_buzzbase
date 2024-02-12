"use client";
import Logout from "@app/components/auth/Logout";
import { useAuthContext } from "@app/contexts/useAuthContext";

export default function Footer() {
  const { isLoggedIn } = useAuthContext();
  return (
    <>
      <footer className="border-t border-t-zinc-500 pt-12 px-4 pb-24 bg-main">
        <ul>
          <li>
            {isLoggedIn ? (
              <>
                <Logout />
              </>
            ) : (
              <></>
            )}
          </li> 
        </ul>
      </footer>
    </>
  );
}
