import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function SaveSpinner({ saved }: { saved: boolean }) {
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    if (saved) {
      setShowSpinner(true);
      const timer = setTimeout(() => {
        setShowSpinner(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [saved]);
  return (
    <>
      {showSpinner ? (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-zinc-800 z-60 opacity-70 lg:z-100"></div>
          <Spinner
            label="保存中..."
            labelColor="primary"
            color="primary"
            className="fixed 0 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-70 opacity-100"
          />
        </>
      ) : null}
    </>
  );
}
