import { HomeIcon } from "@app/components/icon/HomeIcon";
import { RankingIcon } from "@app/components/icon/RankingIcon";
import { RecordIcon } from "@app/components/icon/RecordIcon";
import { GroupIcon } from "@app/components/icon/GroupIcon";

const NavigationItems = [
  { href: "", label: "新着", icon: HomeIcon },
  { href: "/ranking", label: "ランキング", icon: RankingIcon },
  { href: "/record", label: "記録", icon: RecordIcon },
  { href: "/group", label: "グループ", icon: GroupIcon },
];

export default NavigationItems;
