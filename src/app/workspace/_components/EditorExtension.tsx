import { Editor, EditorContent, useEditorState } from "@tiptap/react";
import { Bold, Heading1, Heading2, Heading3, Highlighter, Italic, List, ListOrdered, TextAlignCenter, TextAlignEnd, TextAlignStart, Underline } from "lucide-react";


export default function EditorExtension({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: ({ editor }: { editor: Editor }) => ({
      isHeading1: editor.isActive('heading', { level: 1 }),
      isHeading2: editor.isActive('heading', { level: 2 }),
      isHeading3: editor.isActive('heading', { level: 3 }),
      isOrderedList: editor.isActive('orderedList'),
      isBulletList: editor.isActive('bulletList'),
      isBold: editor.isActive('bold'),
      isItalic: editor.isActive('italic'),
      isUnderline: editor.isActive('underline'),
      isHighlight: editor.isActive('highlight'),
      isTextAlignLeft: editor.isActive({ textAlign: 'left' }),
      isTextAlignCenter: editor.isActive({ textAlign: 'center' }),
      isTextAlignRight: editor.isActive({ textAlign: 'right' }),
    }),
  })
  return (
    <div>
      <div className="control-group">
        <div className="flex gap-1.5">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editorState.isHeading1 ? 'text-blue-500' : ''}
          >
            <Heading1 />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editorState.isHeading2 ? 'text-blue-500' : ''}
          >
            <Heading2 />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editorState.isHeading3 ? 'text-blue-500' : ''}
          >
            <Heading3 />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editorState.isOrderedList ? 'text-blue-500' : ''}
          >
            <ListOrdered />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editorState.isBulletList ? 'text-blue-500' : ''}
          >
            <List />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editorState.isBold ? 'text-blue-500' : ''}
          >
            <Bold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editorState.isItalic ? 'text-blue-500' : ''}
          >
            <Italic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editorState.isUnderline ? 'text-blue-500' : ''}
          >
            <Underline />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editorState.isHighlight ? 'text-blue-500' : ''}
          >
            <Highlighter />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editorState.isTextAlignLeft ? 'text-blue-500' : ''}
          >
            <TextAlignStart />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editorState.isTextAlignCenter ? 'text-blue-500' : ''}
          >
            <TextAlignCenter />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editorState.isTextAlignRight ? 'text-blue-500' : ''}
          >
            <TextAlignEnd />
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}