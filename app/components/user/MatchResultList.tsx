import MatchResultsItem from "@app/components/listItem/MatchResultsItem";
import ResultsSelectBox from "@app/components/select/ResultsSelectBox";
import { gameType, years } from "@app/data/TestData";

export default function MatchResultList() {
  return (
    <>
      <div className="bg-bg_sub p-4 rounded-xl">
        <div className="flex gap-x-4 mb-5">
          <ResultsSelectBox
            radius="full"
            defaultSelectedKeys={[years[0].label]}
            className="bg-transparent rounded-full text-xs border-zinc-400 max-w-xs"
            data={years}
            variant="faded"
            color="primary"
            ariaLabel="シーズンを選択"
            labelPlacement="outside"
            size="sm"
          />
          <ResultsSelectBox
            radius="full"
            defaultSelectedKeys={[gameType[0].label]}
            className="bg-transparent rounded-full text-xs border-zinc-400 max-w-xs"
            data={gameType}
            variant="faded"
            color="primary"
            ariaLabel="試合の種類を選択"
            labelPlacement="outside"
            size="sm"
          />
        </div>
        <div className="mt-8">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="mt-8">
              <MatchResultsItem />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
