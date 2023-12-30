export default function PitchingRecordTable() {
  const styleTableBox = "grid grid-cols-2 text-center";
  const styleTableTitle =
    "border-r-1 border-b-1 border-r-zinc-500 border-b-zinc-500 text-sm py-2.5 font-normal text-zic-300";
  const styleTableData =
    "bg-sub text-sm py-2.5 font-medium border-b-1 border-b-zinc-500";

  return (
    <>
      <div className="mt-4 border-x-1 border-t-1 border-zinc-500 rounded-md overflow-hidden">
        <div className="grid grid-cols-2">
          <div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>防御率</p>
              <span className={styleTableData}>1.21</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>完投</p>
              <span className={styleTableData}>2</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>無四球</p>
              <span className={styleTableData}>0</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>敗戦</p>
              <span className={styleTableData}>6</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>HP</p>
              <span className={styleTableData}>0</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>勝率</p>
              <span className={styleTableData}>.727</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>打者</p>
              <span className={styleTableData}>636</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>奪三振</p>
              <span className={styleTableData}>169</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>与死球</p>
              <span className={styleTableData}>6</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>ボーク</p>
              <span className={styleTableData}>0</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>自責点</p>
              <span className={styleTableData}>22</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>K/9</p>
              <span className={styleTableData}>9.27</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>WHIP</p>
              <span className={styleTableData}>0.88</span>
            </div>
            <div className={styleTableBox}>
              <p className={`${styleTableTitle} rounded-bl-md`}>被BABIP</p>
              <span className={styleTableData}>.267</span>
            </div>
          </div>

          <div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>登板</p>
              <span className={styleTableData}>23</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>完封</p>
              <span className={styleTableData}>1</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>勝利</p>
              <span className={styleTableData}>16</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>ホールド</p>
              <span className={styleTableData}>0</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>セーブ</p>
              <span className={styleTableData}>0</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>投球回</p>
              <span className={styleTableData}>164.0</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>被本塁打</p>
              <span className={styleTableData}>2</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>与四球</p>
              <span className={styleTableData}>28</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>暴投</p>
              <span className={styleTableData}>1</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>失点</p>
              <span className={styleTableData}>27</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>BB/9</p>
              <span className={styleTableData}>1.54</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>K/BB</p>
              <span className={styleTableData}>6.04</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>被打率</p>
              <span className={styleTableData}>.198</span>
            </div>
            <div className={styleTableBox}>
              <p className={styleTableTitle}>---</p>
              <span className={`${styleTableData} rounded-br-md`}>---</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
