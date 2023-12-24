"use client";
import { getUserData } from "@app/services/userService";
import { useEffect, useState } from "react";

type userData = {
  image: any;
  name: string;
  user_id: string;
  url: string;
};

export default function MyPage() {
  const [userData, setUserData] = useState<userData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (!userData) {
    return <div>ローディング中....</div>;
  }

  return (
    <>
      <div className="pt-20">
        <h2>マイページ</h2>
        <img src={`${process.env.NEXT_PUBLIC_API_URL}${userData.image.url}`} alt="" />
        <p>{userData.name}</p>
        <p>@{userData.user_id}</p>
      </div>
    </>
  );
}
