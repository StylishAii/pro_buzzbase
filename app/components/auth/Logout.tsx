"use client";
import { useAuthContext } from "@app/contexts/useAuthContext";
import { signOut } from "@app/services/authService";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuthContext();

  const handleLogout = async () => {
    try {
      await signOut();
      setIsLoggedIn(false);
      router.push("/signin?logout=success");
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <button onClick={handleLogout} className="text-sm text-white">
      ログアウト
    </button>
  );
}
