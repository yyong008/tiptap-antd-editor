import './index.css'

import { Editor } from "@tiptap/react";
import TableCell from "@tiptap/extension-table-cell";
import { TableOutlined } from "@ant-design/icons";

// import Table from "@tiptap/extension-table";

// import TableHeader from "@tiptap/extension-table-header";

// import TableRow from "@tiptap/extension-table-row";

export const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

export const EditorTable = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <TableOutlined />
        </button>
        {/* <button onClick={() => editor.chain().focus().insertContent(tableHTML, {
          parseOptions: {
            preserveWhitespace: false,
          },
        }).run()}>
          Insert HTML table
        </button>
        <button onClick={() => editor.chain().focus().addColumnBefore().run()} disabled={!editor.can().addColumnBefore()}>
          Add column before
        </button>
        <button onClick={() => editor.chain().focus().addColumnAfter().run()} disabled={!editor.can().addColumnAfter()}>
          Add column after
        </button>
        <button onClick={() => editor.chain().focus().deleteColumn().run()} disabled={!editor.can().deleteColumn()}>
          Delete column
        </button>
        <button onClick={() => editor.chain().focus().addRowBefore().run()} disabled={!editor.can().addRowBefore()}>
          Add row before
        </button>
        <button onClick={() => editor.chain().focus().addRowAfter().run()} disabled={!editor.can().addRowAfter()}>
          Add row after
        </button>
        <button onClick={() => editor.chain().focus().deleteRow().run()} disabled={!editor.can().deleteRow()}>
          Delete row
        </button>
        <button onClick={() => editor.chain().focus().deleteTable().run()} disabled={!editor.can().deleteTable()}>
          Delete table
        </button>
        <button onClick={() => editor.chain().focus().mergeCells().run()} disabled={!editor.can().mergeCells()}>
          Merge cells
        </button>
        <button onClick={() => editor.chain().focus().splitCell().run()} disabled={!editor.can().splitCell()}>
          Split cell
        </button>
        <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()} disabled={!editor.can().toggleHeaderColumn()}>
          ToggleHeaderColumn
        </button>
        <button onClick={() => editor.chain().focus().toggleHeaderRow().run()} disabled={!editor.can().toggleHeaderRow()}>
          Toggle header row
        </button>
        <button onClick={() => editor.chain().focus().toggleHeaderCell().run()} disabled={!editor.can().toggleHeaderCell()}>
          Toggle header cell
        </button>
        <button onClick={() => editor.chain().focus().mergeOrSplit().run()} disabled={!editor.can().mergeOrSplit()}>
          Merge or split
        </button>
        <button onClick={() => editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()} disabled={!editor.can().setCellAttribute('backgroundColor', '#FAF594')}>
          Set cell attribute
        </button>
        <button onClick={() => editor.chain().focus().fixTables().run()} disabled={!editor.can().fixTables()}>
          Fix tables
        </button>
        <button onClick={() => editor.chain().focus().goToNextCell().run()} disabled={!editor.can().goToNextCell()}>
          Go to next cell
        </button>
        <button onClick={() => editor.chain().focus().goToPreviousCell().run()} disabled={!editor.can().goToPreviousCell()}>
          Go to previous cell
        </button>*/}
      </div>
    </div>
  );
};
