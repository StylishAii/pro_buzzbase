import { CheckIcon } from "@app/components/icon/CheckIcon";

export default function ToastSuccess({ text }: ToastSuccessProps) {
  return (
    <>
      <div className="fixed top-14 right-4 flex items-center gap-x-2 px-4 py-2 bg-green-700 rounded-xl z-10">
        <CheckIcon width="16" height="16" fill="#fff" />
        <p className="text-sm">{text}</p>
      </div>
    </>
  );
}
