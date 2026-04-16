"use client";

import "./index.css";

import { EditorContent, useEditor } from "@tiptap/react";

import Blockquote from "@tiptap/extension-blockquote";
import { Color } from '@tiptap/extension-color'
import { CustomTableCell } from "./table";
import Document from "@tiptap/extension-document";
import { EditorBubbleMenu } from "./bubble-menu";
import Heading from "@tiptap/extension-heading";
import Highlight from '@tiptap/extension-highlight'
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import {SlashMenu} from "./slash-menu";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Toolbar } from "../toolbar";
import Typography from '@tiptap/extension-typography'
import Underline from "@tiptap/extension-underline";

const Tiptap = ({ value: content, onChange }: any) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Color,
      Typography,
      Highlight,
      Image,
      TextStyle,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
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
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      CustomTableCell,
    ],
    content,
    onUpdate({ editor }) {
      const html = editor.getHTML()
      onChange?.(html)
    }
  });

  return (
    <div className="flex flex-col h-full overflow-visible">
      <Toolbar editor={editor} />
      <EditorBubbleMenu editor={editor} />
      <SlashMenu editor={editor} />
      <EditorContent
        editor={editor}
        className="tiptap-editor flex-1 overflow-auto p-4 focus:outline-none"
      />
    </div>
  );
};

export default Tiptap;
