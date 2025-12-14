"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'
import Highlight from '@tiptap/extension-highlight'
import Heading from '@tiptap/extension-heading'
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list'
import './editorStyle.css'
import EditorExtension from './EditorExtension'
import TextAlign from '@tiptap/extension-text-align'
import Bold from '@tiptap/extension-bold'

export default function TextEditior() {
  const editor = useEditor({
    extensions: [StarterKit, Bold,
      Placeholder.configure({
        placeholder: '开始记录你的笔记',
      }), Highlight,
      Heading.configure({
        levels: [1, 2, 3],
      }), BulletList, OrderedList, ListItem,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),],
    content: '',
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        class: 'focus:outline-none h-screen',
      },
    },
  })
  if (!editor) {
    return null
  }

  return (
    <div>
      <EditorExtension editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}