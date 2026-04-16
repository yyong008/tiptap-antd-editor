import { useState, useEffect } from "react";
import type { Editor } from "@tiptap/react";
import "./index.css"

export const SlashMenu = ({ editor }: { editor: Editor | null }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!editor) return;

    const checkForSlash = () => {
      const { selection } = editor.state;
      const { $from } = selection;
      const node = $from.node();
      if (node.isTextblock && node.content.size === 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    editor.on("selectionUpdate", checkForSlash);
    editor.on("transaction", checkForSlash);

    return () => {
      editor.off("selectionUpdate", checkForSlash);
      editor.off("transaction", checkForSlash);
    };
  }, [editor]);

  if (!editor || !isVisible) {
    return null;
  }

  const { view } = editor;
  const { $from } = editor.state.selection;
  const coords = view.coordsAtPos($from.pos);

  let top: number;
  if (coords.top < 200) {
    top = coords.bottom + 8;
  } else {
    top = coords.top - 40;
  }

  return (
    <div
      className="floating-menu"
      style={{
        position: "fixed",
        top,
        left: Math.max(16, coords.left),
      }}
    >
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
  );
};