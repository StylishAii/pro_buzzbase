import { userFollow, userUnFollow } from "@app/services/userService";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function FollowButton({
  userId,
  isFollowing,
}: FollowButtonProps) {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = async () => {
    if (following) {
      await userUnFollow(userId);
    } else {
      await userFollow(userId);
    }
    setFollowing(!following);
  };

  const followingButtonStyle =
    "text-main bg-zinc-200 rounded-full text-xs border-1 border-zinc-400 w-full h-auto p-1.5 font-bold";
  const followedButtonStyle =
    "text-zinc-300 bg-transparent rounded-full text-xs border-1 border-zinc-400 w-full h-auto p-1.5 font-bold";
  return (
    <>
      <Button
        onClick={handleFollow}
        className={following ? followedButtonStyle : followingButtonStyle}
      >
        {following ? "フォロー中" : "フォローする"}
      </Button>
    </>
  );
}
