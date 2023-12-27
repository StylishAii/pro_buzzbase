import { signOut } from "@app/services/authService";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
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
