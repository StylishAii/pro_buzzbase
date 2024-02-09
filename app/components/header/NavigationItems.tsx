import { HomeIcon } from "@app/components/icon/HomeIcon";
import { RankingIcon } from "@app/components/icon/RankingIcon";
import { RecordIcon } from "@app/components/icon/RecordIcon";
import { GroupIcon } from "@app/components/icon/GroupIcon";
import { useAuthContext } from "@app/contexts/useAuthContext";

const NavigationItems = () => {
  const { isLoggedIn } = useAuthContext();

  return [
    { href: "", label: "新着", icon: HomeIcon },
    { href: "/ranking", label: "ランキング", icon: RankingIcon },
    {
      href: isLoggedIn ? "/game-result/lists" : "/signin",
      label: "記録",
      icon: RecordIcon,
    },
    {
      href: isLoggedIn ? "/groups" : "/signin",
      label: "グループ",
      icon: GroupIcon,
    },
  ];
};

export default NavigationItems;
