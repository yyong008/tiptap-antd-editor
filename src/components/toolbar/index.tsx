import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  BorderVerticleOutlined,
  CheckSquareOutlined,
  FontColorsOutlined,
  ItalicOutlined,
  LinkOutlined,
  OrderedListOutlined,
  PictureOutlined,
  RedoOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UndoOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { ColorPicker, Dropdown, Space } from "antd";

import { Editor } from "@tiptap/react";
import { EditorTable } from "../tiptap/table";
import { useCallback } from "react";
import styles from "./index.module.css";

export function Toolbar({ editor }: { editor: Editor | null }) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.group}>
        <button
          onClick={() => editor?.chain().undo().focus().run()}
          disabled={!editor?.can().undo()}
          className={styles.btn}
          title="撤销"
        >
          <UndoOutlined />
        </button>
        <button
          onClick={() => editor?.chain().redo().focus().run()}
          disabled={!editor?.can().redo()}
          className={styles.btn}
          title="重做"
        >
          <RedoOutlined />
        </button>
      </div>

      <div className={styles.divider} />

      <div className={styles.group}>
        <button
          onClick={() => editor?.chain().toggleBlockquote().focus().run()}
          className={`${styles.btn} ${editor?.isActive("blockquote") ? styles.active : ""}`}
          title="引用"
        >
          引用
        </button>
      </div>

      <div className={styles.divider} />

      <div className={styles.group}>
        <Headering editor={editor} />
      </div>

      <div className={styles.divider} />

      <div className={styles.group}>
        <button
          onClick={() => editor?.chain().toggleBold().focus().run()}
          className={`${styles.btn} ${editor?.isActive("bold") ? styles.active : ""}`}
          title="粗体"
        >
          <BoldOutlined />
        </button>
        <button
          onClick={() => editor?.chain().toggleItalic().focus().run()}
          className={`${styles.btn} ${editor?.isActive("italic") ? styles.active : ""}`}
          title="斜体"
        >
          <ItalicOutlined />
        </button>
        <button
          onClick={() => editor?.chain().toggleStrike().focus().run()}
          className={`${styles.btn} ${editor?.isActive("strike") ? styles.active : ""}`}
          title="删除线"
        >
          <StrikethroughOutlined />
        </button>
        <button
          onClick={() => editor?.chain().toggleUnderline().focus().run()}
          className={`${styles.btn} ${editor?.isActive("underline") ? styles.active : ""}`}
          title="下划线"
        >
          <UnderlineOutlined />
        </button>
      </div>

      <div className={styles.divider} />

      <div className={styles.group}>
        <button
          onClick={() => editor?.chain().toggleCode().focus().run()}
          className={`${styles.btn} ${editor?.isActive("code") ? styles.active : ""}`}
          title="行内代码"
        >
          行内
        </button>
        <button
          onClick={() => editor?.chain().toggleCodeBlock().focus().run()}
          className={`${styles.btn} ${editor?.isActive("codeBlock") ? styles.active : ""}`}
          title="代码块"
        >
          代码块
        </button>
      </div>

      <div className={styles.divider} />

      <List editor={editor} />

      <div className={styles.divider} />

      <Aglin editor={editor} />

      <div className={styles.divider} />

      <button
        onClick={() => editor?.chain().focus().toggleTaskList().run()}
        className={`${styles.btn} ${editor?.isActive("taskList") ? styles.active : ""}`}
        title="任务列表"
      >
        <CheckSquareOutlined />
      </button>

      <button
        onClick={() => {
          const previousUrl = editor?.getAttributes("link").href;
          const url = window.prompt("URL", previousUrl);
          if (url === null) return;
          if (url === "") {
            editor?.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
          }
          editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }}
        className={`${styles.btn} ${editor?.isActive("link") ? styles.active : ""}`}
        title="链接"
      >
        <LinkOutlined />
      </button>

      <button
        onClick={() => {
          const url = window.prompt("图片 URL");
          if (url) {
            editor?.chain().focus().setImage({ src: url }).run();
          }
        }}
        className={styles.btn}
        title="插入图片"
      >
        <PictureOutlined />
      </button>

      <button
        onClick={() => editor?.chain().focus().setHorizontalRule().run()}
        className={styles.btn}
        title="分隔线"
      >
        <BorderVerticleOutlined />
      </button>

      <Color editor={editor} />
      <EditorTable editor={editor} />
    </div>
  );
}

function Headering({ editor }: { editor: Editor | null }) {
  const items = [
    {
      key: "H1",
      label: (
        <div onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </div>
      ),
    },
    {
      key: "H2",
      label: (
        <div onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </div>
      ),
    },
    {
      key: "H3",
      label: (
        <div onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </div>
      ),
    },
    {
      key: "H4",
      label: (
        <div onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}>
          H4
        </div>
      ),
    },
    {
      key: "H5",
      label: (
        <div onClick={() => editor?.chain().focus().toggleHeading({ level: 5 }).run()}>
          H5
        </div>
      ),
    },
    {
      key: "H6",
      label: (
        <div onClick={() => editor?.chain().focus().toggleHeading({ level: 6 }).run()}>
          H6
        </div>
      ),
    },
    {
      key: "Text",
      label: <div onClick={() => editor?.chain().focus().setParagraph().run()}>正文</div>,
    },
  ];

  const getCurrentLabel = () => {
    if (editor?.isActive("heading", { level: 1 })) return "H1";
    if (editor?.isActive("heading", { level: 2 })) return "H2";
    if (editor?.isActive("heading", { level: 3 })) return "H3";
    if (editor?.isActive("heading", { level: 4 })) return "H4";
    if (editor?.isActive("heading", { level: 5 })) return "H5";
    if (editor?.isActive("heading", { level: 6 })) return "H6";
    return "标题";
  };

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <button className={`${styles.btn} ${editor?.isActive("heading") ? styles.active : ""}`}>
        <Space>
          {getCurrentLabel()}
        </Space>
      </button>
    </Dropdown>
  );
}

function List({ editor }: { editor: Editor | null }) {
  return (
    <div className={styles.group}>
      <button
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        className={`${styles.btn} ${editor?.isActive("orderedList") ? styles.active : ""}`}
        title="有序列表"
      >
        <OrderedListOutlined />
      </button>
      <button
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        className={`${styles.btn} ${editor?.isActive("bulletList") ? styles.active : ""}`}
        title="无序列表"
      >
        <UnorderedListOutlined />
      </button>
    </div>
  );
}

function Aglin({ editor }: { editor: Editor | null }) {
  return (
    <div className={styles.group}>
      <button
        onClick={() => editor?.chain().focus().setTextAlign("left").run()}
        className={`${styles.btn} ${editor?.isActive({ textAlign: "left" }) ? styles.active : ""}`}
        title="左对齐"
      >
        <AlignLeftOutlined />
      </button>
      <button
        onClick={() => editor?.chain().focus().setTextAlign("center").run()}
        className={`${styles.btn} ${editor?.isActive({ textAlign: "center" }) ? styles.active : ""}`}
        title="居中"
      >
        <AlignCenterOutlined />
      </button>
      <button
        onClick={() => editor?.chain().focus().setTextAlign("right").run()}
        className={`${styles.btn} ${editor?.isActive({ textAlign: "right" }) ? styles.active : ""}`}
        title="右对齐"
      >
        <AlignRightOutlined />
      </button>
    </div>
  );
}

function Color({ editor }: { editor: Editor | null }) {
  return (
    <ColorPicker
      size="small"
      showText
      onChange={(color) => {
        editor?.chain().focus().setColor("#" + color.toHex()).run();
      }}
    />
  );
}