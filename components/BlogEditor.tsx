"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import Placeholder from "@tiptap/extension-placeholder"
import { useCallback, useState } from "react"
import {
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered,
  Quote, Link2, AlignLeft, AlignCenter, AlignRight, Minus,
  Heading2, Heading3, Unlink, Check, X,
} from "lucide-react"

interface Props {
  value: string
  onChange: (html: string) => void
}

export default function BlogEditor({ value, onChange }: Props) {
  const [linkPopup, setLinkPopup] = useState(false)
  const [linkUrl, setLinkUrl]     = useState("")

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-blue-600 underline underline-offset-2 hover:text-blue-800" } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Write your post here…\n\nTip: Use blank lines to separate paragraphs. Real numbers, real lessons, and honest experiences make the best posts." }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "min-h-[320px] px-4 py-3 text-sm text-gray-800 leading-relaxed focus:outline-none",
      },
    },
  })

  const openLinkPopup = useCallback(() => {
    const prev = editor?.getAttributes("link").href || ""
    setLinkUrl(prev)
    setLinkPopup(true)
  }, [editor])

  const applyLink = useCallback(() => {
    if (!editor) return
    if (!linkUrl.trim()) {
      editor.chain().focus().unsetLink().run()
    } else {
      editor.chain().focus().setLink({ href: linkUrl.trim() }).run()
    }
    setLinkPopup(false)
    setLinkUrl("")
  }, [editor, linkUrl])

  if (!editor) return null

  const btn = (active: boolean, onClick: () => void, icon: React.ReactNode, title: string) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`p-1.5 rounded-md transition ${
        active
          ? "bg-gray-900 text-white"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
      }`}
    >
      {icon}
    </button>
  )

  const sep = () => <span className="w-px h-5 bg-gray-200 mx-0.5 self-center" />

  return (
    <div className="rounded-xl border border-gray-200 overflow-visible bg-white">

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-200 bg-gray-50 rounded-t-xl">

        {/* Paragraph / Heading */}
        <select
          value={
            editor.isActive("heading", { level: 2 }) ? "h2"
            : editor.isActive("heading", { level: 3 }) ? "h3"
            : "p"
          }
          onChange={e => {
            if (e.target.value === "p") editor.chain().focus().setParagraph().run()
            else if (e.target.value === "h2") editor.chain().focus().toggleHeading({ level: 2 }).run()
            else if (e.target.value === "h3") editor.chain().focus().toggleHeading({ level: 3 }).run()
          }}
          className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 mr-1"
        >
          <option value="p">Paragraph</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        {sep()}

        {/* Text formatting */}
        {btn(editor.isActive("bold"),      () => editor.chain().focus().toggleBold().run(),      <Bold className="w-3.5 h-3.5" />,          "Bold")}
        {btn(editor.isActive("italic"),    () => editor.chain().focus().toggleItalic().run(),    <Italic className="w-3.5 h-3.5" />,        "Italic")}
        {btn(editor.isActive("underline"), () => editor.chain().focus().toggleUnderline().run(), <UnderlineIcon className="w-3.5 h-3.5" />, "Underline")}

        {sep()}

        {/* Lists */}
        {btn(editor.isActive("bulletList"),  () => editor.chain().focus().toggleBulletList().run(),  <List className="w-3.5 h-3.5" />,         "Bullet list")}
        {btn(editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run(), <ListOrdered className="w-3.5 h-3.5" />, "Numbered list")}

        {sep()}

        {/* Blockquote */}
        {btn(editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run(), <Quote className="w-3.5 h-3.5" />, "Blockquote")}

        {sep()}

        {/* Alignment */}
        {btn(editor.isActive({ textAlign: "left" }),   () => editor.chain().focus().setTextAlign("left").run(),   <AlignLeft className="w-3.5 h-3.5" />,   "Align left")}
        {btn(editor.isActive({ textAlign: "center" }), () => editor.chain().focus().setTextAlign("center").run(), <AlignCenter className="w-3.5 h-3.5" />, "Align center")}
        {btn(editor.isActive({ textAlign: "right" }),  () => editor.chain().focus().setTextAlign("right").run(),  <AlignRight className="w-3.5 h-3.5" />,  "Align right")}

        {sep()}

        {/* Link */}
        <div className="relative">
          {btn(editor.isActive("link"), openLinkPopup, <Link2 className="w-3.5 h-3.5" />, "Insert link")}
          {editor.isActive("link") && btn(false, () => editor.chain().focus().unsetLink().run(), <Unlink className="w-3.5 h-3.5" />, "Remove link")}

          {linkPopup && (
            <div className="absolute top-9 left-0 z-30 bg-white border border-gray-200 rounded-xl shadow-xl p-3 w-72 space-y-2">
              <p className="text-xs font-semibold text-gray-700">Insert / edit link</p>
              <input
                autoFocus
                type="url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={e => setLinkUrl(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), applyLink())}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => { setLinkPopup(false); setLinkUrl("") }}
                  className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
                >
                  <X className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={applyLink}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  <Check className="w-3 h-3" /> Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {sep()}

        {/* Horizontal rule */}
        {btn(false, () => editor.chain().focus().setHorizontalRule().run(), <Minus className="w-3.5 h-3.5" />, "Horizontal rule")}
      </div>

      {/* ── Editor area ── */}
      <EditorContent editor={editor} />

      {/* ── Editor styles ── */}
      <style>{`
        .tiptap h2 { font-size: 1.25rem; font-weight: 700; color: #111827; margin: 1rem 0 0.5rem; }
        .tiptap h3 { font-size: 1.05rem; font-weight: 600; color: #1f2937; margin: 0.75rem 0 0.4rem; }
        .tiptap p  { margin: 0.4rem 0; }
        .tiptap ul { list-style: disc;    padding-left: 1.5rem; margin: 0.5rem 0; }
        .tiptap ol { list-style: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }
        .tiptap li { margin: 0.25rem 0; }
        .tiptap blockquote { border-left: 3px solid #d1d5db; padding-left: 1rem; color: #6b7280; font-style: italic; margin: 0.75rem 0; }
        .tiptap hr { border: none; border-top: 1px solid #e5e7eb; margin: 1rem 0; }
        .tiptap p.is-editor-empty:first-child::before { color: #9ca3af; content: attr(data-placeholder); float: left; height: 0; pointer-events: none; white-space: pre-line; }
      `}</style>
    </div>
  )
}
