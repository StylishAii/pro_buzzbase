import ResultsSelectBox from "@app/components/select/ResultsSelectBox";
import BattingAverageTable from "@app/components/user/BattingAverageTable";
import PitchingRecordTable from "@app/components/user/PitchingRecordTable";
import { gameType, years } from "@app/test/TestData";

export default function IndividualResultsList() {
  return (
    <>
      <div className="bg-bg_sub p-4 rounded-xl">
        <div className="flex gap-x-4 mb-5">
          <ResultsSelectBox
            radius="full"
            defaultSelectedKeys={[years[0].label]}
            className="bg-transparent rounded-full text-xs border-zinc-400 max-w-xs"
            data={years}
            variant="bordered"
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
            variant="bordered"
            color="primary"
            ariaLabel="試合の種類を選択"
            labelPlacement="outside"
            size="sm"
          />
        </div>
        <h2 className="text-xl">打撃成績</h2>
        <BattingAverageTable />
        <h2 className="text-xl mt-8">投手成績</h2>
        <PitchingRecordTable />
      </div>
    </>
  );
}
