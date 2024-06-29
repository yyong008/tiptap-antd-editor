import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  BorderVerticleOutlined,
  CheckSquareOutlined,
  FontColorsOutlined,
  FontSizeOutlined,
  ItalicOutlined,
  LeftOutlined,
  LinkOutlined,
  OrderedListOutlined,
  PictureOutlined,
  PlayCircleOutlined,
  RedoOutlined,
  RightOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UndoOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";

import { Editor } from "@tiptap/react";
import { useCallback } from "react";

export function Toolbar({ editor }: { editor: Editor | null }) {
  return (
    <div className="flex flex-wrap items-center gap-3 px-[10px] py-[4px] border-b">
      <div className="flex border-r pr-[10px]">
        <div
          className=" p-[4px] cursor-pointer"
          onClick={() => {
            editor?.chain().undo().focus().run();
          }}
        >
          <UndoOutlined />
        </div>
        <div
          className=" p-[4px] cursor-pointer"
          onClick={() => {
            editor?.chain().redo().focus().run();
          }}
        >
          <RedoOutlined />
        </div>
      </div>
      <div
        className=" p-[4px] cursor-pointer"
        onClick={() => {
          editor?.chain().toggleBlockquote().focus().run();
        }}
      >
        引用
      </div>
      <div className="flex gap-3 border-r pr-[10px] cursor-pointer">
        <Headering editor={editor} />
      </div>

      <div
        onClick={() => {
          editor?.chain().toggleBold().focus().run();
        }}
        className=" p-[4px] cursor-pointer"
      >
        <BoldOutlined />
      </div>
      <div
        onClick={() => {
          editor?.chain().toggleItalic().focus().run();
        }}
        className=" p-[4px] cursor-pointer"
      >
        <ItalicOutlined />
      </div>
      <div
        onClick={() => {
          editor?.chain().toggleStrike().focus().run();
        }}
        className=" p-[4px] cursor-pointer"
      >
        <StrikethroughOutlined />
      </div>
      <div
        onClick={() => {
          editor?.chain().toggleUnderline().focus().run();
        }}
        className=" p-[4px] cursor-pointer"
      >
        <UnderlineOutlined />
      </div>
      <div
        onClick={() => {
          editor?.chain().toggleCode().focus().run();
        }}
        className=" p-[4px] cursor-pointer"
      >
        行内块
      </div>
      <div
        onClick={() => {
          editor?.chain().toggleCodeBlock().focus().run();
        }}
        className=" p-[4px] cursor-pointer"
      >
        块
      </div>
      <List editor={editor} />
      <Aglin editor={editor} />
      {/* <FontManager editor={editor} /> */}
      <TodoList editor={editor} />
      <Link editor={editor} />
      <AddImage editor={editor} />
      <Line editor={editor} />
    </div>
  );
}

function Headering({ editor }: { editor: Editor | null }) {
  const items = [
    {
      key: "H1",
      label: (
        <div
          onClick={() =>
            editor
              ?.chain()
              .focus()
              .toggleHeading({
                level: 1,
              })
              .run()
          }
        >
          H1
        </div>
      ),
    },
    {
      key: "H2",
      label: (
        <div
          onClick={() =>
            editor
              ?.chain()
              .toggleHeading({
                level: 2,
              })
              .focus()
              .run()
          }
        >
          H2
        </div>
      ),
    },
    {
      key: "H3",
      label: (
        <div
          onClick={() =>
            editor
              ?.chain()
              .toggleHeading({
                level: 3,
              })
              .focus()
              .run()
          }
        >
          H3
        </div>
      ),
    },
    {
      key: "H4",
      label: (
        <div
          onClick={() =>
            editor
              ?.chain()
              .toggleHeading({
                level: 4,
              })
              .focus()
              .run()
          }
        >
          H4
        </div>
      ),
    },
    {
      key: "H5",
      label: (
        <div
          onClick={() =>
            editor
              ?.chain()
              .toggleHeading({
                level: 5,
              })
              .focus()
              .run()
          }
        >
          H5
        </div>
      ),
    },
    {
      key: "H6",
      label: (
        <div
          onClick={() =>
            editor
              ?.chain()
              .toggleHeading({
                level: 6,
              })
              .focus()
              .run()
          }
        >
          H6
        </div>
      ),
    },
    {
      key: "Text",
      label: <div>Text</div>,
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <Space>
        标题
        {/* <DownOutlined /> */}
      </Space>
    </Dropdown>
  );
}

function Block({ children, onClick }: any) {
  return (
    <div onClick={onClick}>
      <div>{children}</div>
    </div>
  );
}

function CodeBlock() {
  return (
    <div className="flex cursor-pointer">
      <LeftOutlined />
      <RightOutlined />
    </div>
  );
}

function List({ editor }: { editor: Editor | null }) {
  return (
    <div className="flex">
      <div
        onClick={() => {
          editor?.chain().toggleCodeBlock().focus().run();
        }}
        className=" p-[4px] cursor-pointer"
      >
        <OrderedListOutlined />
      </div>

      <div
        onClick={() => {
          editor?.chain().toggleCodeBlock().focus().run();
        }}
        className=" p-[4px] cursor-pointer"
      >
        <UnorderedListOutlined />
      </div>
    </div>
  );
}

// 对齐
function Aglin({ editor }: { editor: Editor | null }) {
  return (
    <div className="flex">
      <div
        onClick={() => {
          editor?.chain().focus().setTextAlign("left").run();
        }}
        className=" p-[4px] cursor-pointer"
      >
        <AlignLeftOutlined />
      </div>
      <div
        onClick={() => {
          editor?.chain().focus().setTextAlign("center").run();
        }}
        className=" p-[4px] cursor-pointer"
      >
        <AlignCenterOutlined />
      </div>
      <div
        onClick={() => {
          editor?.chain().focus().setTextAlign("right").run();
        }}
        className=" p-[4px] cursor-pointer"
      >
        <AlignRightOutlined />
      </div>
    </div>
  );
}

// 缩进

// 链接
function Link({ editor }: { editor: Editor | null }) {
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);
  return (
    <div onClick={setLink} className=" p-[4px] cursor-pointer">
      <LinkOutlined />
    </div>
  );
}

// 字体
function FontManager({ editor }: { editor: Editor | null }) {
  return (
    <div className="flex">
      <div
        onClick={() => {
          editor?.chain().focus().setTextAlign("right").run();
        }}
        className=" p-[4px] cursor-pointer"
      >
        <FontColorsOutlined />
      </div>
      <div
        onClick={() => {
          editor?.chain().focus().setTextAlign("right").run();
        }}
        className=" p-[4px] cursor-pointer"
      >
        <FontSizeOutlined />
      </div>
    </div>
  );
}

// todo list
function TodoList({ editor }: any) {
  return (
    <div className="flex">
      <div
        onClick={() => {
          editor?.chain().focus().toggleTaskList().run();
        }}
        className=" p-[4px] cursor-pointer"
      >
        <CheckSquareOutlined />
      </div>
    </div>
  );
}

function AddImage({ editor }: { editor: Editor | null }) {
  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <div className="flex">
      <div onClick={addImage} className=" p-[4px] cursor-pointer">
        <PictureOutlined />
      </div>
    </div>
  );
}

function Video({ editor }: { editor: Editor | null }) {
  return <div>
    <PlayCircleOutlined />
  </div>
}


function Line({ editor }: { editor: Editor | null }) {
  return <div onClick={() => editor?.chain().focus().setHorizontalRule().run()} className=" p-[4px] cursor-pointer">
    <BorderVerticleOutlined />
  </div>
}
