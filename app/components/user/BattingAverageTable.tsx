export default function BattingAverageTable() {
  const styleTableBox = ["grid grid-cols-2 text-center"];
  const styleTableTitle = [
    "border-r-1 border-b-1 border-r-zinc-500 border-b-zinc-500 text-sm py-2.5 font-normal text-zic-300",
  ];
  const styleTableData = [
    "bg-sub text-sm py-2.5 font-medium border-b-1 border-b-zinc-500",
  ];

  return (
    <>
      <div className="mt-4 border-x-1 border-t-1 border-zinc-500 rounded-md overflow-hidden">
        <div className="grid grid-cols-2">
          <div>
            <div className={`${styleTableBox}`}>
              <p className={`${styleTableTitle}`}>打率</p>
              <span className={`${styleTableData}`}>.294</span>
            </div>
            <div className={`${styleTableBox}`}>
              <p className={`${styleTableTitle}`}>打席</p>
              <span className={`${styleTableData}`}>120</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>安打</p>
              <span className={`${styleTableData}`}>23</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>三塁打</p>
              <span className={`${styleTableData}`}>0</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>塁打</p>
              <span className={`${styleTableData}`}>42</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>得点</p>
              <span className={`${styleTableData}`}>10</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>四球</p>
              <span className={`${styleTableData}`}>5</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>盗塁</p>
              <span className={`${styleTableData}`}>1</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>出塁率</p>
              <span className={`${styleTableData}`}>.300</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>OPS</p>
              <span className={`${styleTableData}`}>.893</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>ISOD</p>
              <span className={`${styleTableData}`}>.345</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>BABIP</p>
              <span className={`${styleTableData}`}>.345</span>
            </div>
          </div>

          <div>
            <div className={`${styleTableBox}`}>
              <p className={`${styleTableTitle}`}>試合</p>
              <span className={`${styleTableData}`}>34</span>
            </div>
            <div className={`${styleTableBox}`}>
              <p className={`${styleTableTitle}`}>打数</p>
              <span className={`${styleTableData}`}>54</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>二塁打</p>
              <span className={`${styleTableData}`}>3</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>本塁打</p>
              <span className={`${styleTableData}`}>6</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>打点</p>
              <span className={`${styleTableData}`}>20</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>三振</p>
              <span className={`${styleTableData}`}>11</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>死球</p>
              <span className={`${styleTableData}`}>2</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>盗塁死</p>
              <span className={`${styleTableData}`}>5</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>盗塁率</p>
              <span className={`${styleTableData}`}>.452</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>ISO</p>
              <span className={`${styleTableData}`}>.234</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>BB/K</p>
              <span className={`${styleTableData}`}>.873</span>
            </div>
            <div className="grid grid-cols-2 text-center">
              <p className={`${styleTableTitle}`}>SB</p>
              <span className={`${styleTableData}`}>21.23</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
