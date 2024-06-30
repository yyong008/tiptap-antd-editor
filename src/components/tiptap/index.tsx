"use client";

import "./index.css";

import { EditorContent, useEditor } from "@tiptap/react";

import Blockquote from "@tiptap/extension-blockquote";
import { Color } from '@tiptap/extension-color'
import Document from "@tiptap/extension-document";
import { EditorBubbleMenu } from "./bubble-menu";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import {SlashMenu} from "./slash-menu";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Toolbar } from "../toolbar";
import Underline from "@tiptap/extension-underline";

const Tiptap = ({ value: content, onChange }: any) => {
  const editor = useEditor({
    extensions: [
      Color,
      HorizontalRule,
      Document,
      Paragraph,
      Text,
      Image,
      TextStyle,
      Blockquote,
      Underline,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ["https"],
      }),
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content,
    onUpdate({ editor }) {
      const html = editor.getHTML()
      onChange?.(html)
    }
  });

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorBubbleMenu editor={editor} />
      <SlashMenu editor={editor} />
      <EditorContent
        className="h-[200px] p-[10px] overflow-auto"
        editor={editor}
        onChange={(v) => {
          debugger
        }}
      />
    </div>
  );
};

export default Tiptap;
