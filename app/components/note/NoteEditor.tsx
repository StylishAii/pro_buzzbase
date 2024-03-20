"use client";
import { useState } from "react";
import { createEditor, BaseEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { ReactEditor } from "slate-react";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export default function NoteEditor({ memo, setMemo }: NoteEditorProps) {
  const [editor] = useState(() => withReact(createEditor()));

  const initialValue: Descendant[] = memo
    ? JSON.parse(memo)
    : [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ];

  const handleChange = (value: Descendant[]) => {
    setMemo(JSON.stringify(value));
  };

  return (
    <>
      <div className="border-2 border-zinc-700 rounded-md w-full">
        <Slate
          editor={editor}
          initialValue={initialValue}
          onChange={handleChange}
        >
          <Editable
            className="p-2 focus:outline-none h-full !min-h-[620px] text-sm leading-6"
            placeholder="メモする...."
          />
        </Slate>
      </div>
    </>
  );
}
