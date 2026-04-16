import { useState, useEffect } from "react";
import type { Editor } from "@tiptap/react";
import "./index.css"

export function EditorBubbleMenu({ editor }: { editor: Editor | null }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!editor) return;

    const updateVisibility = () => {
      const { from, to } = editor.state.selection;
      setIsVisible(from !== to && !editor.state.selection.empty);
    };

    editor.on("selectionUpdate", updateVisibility);
    editor.on("transaction", updateVisibility);

    return () => {
      editor.off("selectionUpdate", updateVisibility);
      editor.off("transaction", updateVisibility);
    };
  }, [editor]);

  if (!editor || !isVisible) {
    return null;
  }

  const { view } = editor;
  const { from } = editor.state.selection;
  const coords = view.coordsAtPos(from);

  let top = coords.top - 40;
  if (top < 100) {
    top = coords.bottom + 8;
  }

  return (
    <div
      className="bubble-menu"
      style={{
        position: "fixed",
        top,
        left: Math.max(16, coords.left + (coords.right - coords.left) / 2),
        transform: "translateX(-50%)",
      }}
    >
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        Strike
      </button>
    </div>
  );
}