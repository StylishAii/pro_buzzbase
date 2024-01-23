"use client";
import ErrorMessages from "@app/components/auth/ErrorMessages";
import SummaryResultHeader from "@app/components/header/SummaryHeader";
import { ShareIcon } from "@app/components/icon/ShareIcon";
import { getCurrentBattingAverage } from "@app/services/battingAveragesService";
import { getCurrentMatchResult } from "@app/services/matchResultsService";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultsSummary() {
  const [matchResult, setMatchResult] = useState(null);
  const [battingAverage, setBattingAverage] = useState(null);
  const [localStorageGameResultId, setLocalStorageGameResultId] = useState<
    number | null
  >(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // ローカルストレージからid取得
    const savedGameResultId = localStorage.getItem("gameResultId");
    if (savedGameResultId) {
      setLocalStorageGameResultId(JSON.parse(savedGameResultId));
      fetchCurrentResultData(JSON.parse(savedGameResultId));
    }
  }, [pathname]);

  const fetchCurrentResultData = async (localStorageGameResultId: number) => {
    try {
      const matchResultData = await getCurrentMatchResult(
        localStorageGameResultId
      );
      const battingAverageData = await getCurrentBattingAverage(
        localStorageGameResultId
      );
      setMatchResult(matchResultData);
      setBattingAverage(battingAverageData);
    } catch (error) {
      console.log(`fetch error: ${error}`);
    }
  };

  const handleShare = () => {};
  const handleResultEdit = () => {};

  console.log(matchResult);
  console.log(battingAverage);
  return (
    <>
      <SummaryResultHeader onSummaryResult={handleResultEdit} text="編集" />
      <main className="h-full">
        <div className="pb-32 relative">
          {/* <ErrorMessages errors={errors} /> */}
          <div className="pt-20 px-4">
            <h2 className="text-xl font-bold text-center">試合結果まとめ</h2>
            <p className="text-sm text-center mt-6">
              成績を友達にシェアしよう！
            </p>
            <div className="flex justify-center">
              <Button
                color="primary"
                size="sm"
                endContent={<ShareIcon stroke="#F4F4F4" />}
                className="mt-4"
                onChange={handleShare}
              >
                成績をシェア
              </Button>
            </div>
            <div className="mt-6 py-5 px-6 bg-bg_sub rounded-xl">
              {/* 試合情報 */}
              {/* 打撃成績 */}
              {/* 投手成績 */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
