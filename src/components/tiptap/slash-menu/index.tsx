import "./index.css";

import { Editor, FloatingMenu } from "@tiptap/react";

import React from "react";

export const SlashMenu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }
  return (
    <>
      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="floating-menu">
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
            >
              H1
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleTaskList().run()}
              className={editor.isActive("bulletList") ? "is-active" : ""}
            >
              task list
            </button>
          </div>
        </FloatingMenu>
      )}
    </>
  );
};
