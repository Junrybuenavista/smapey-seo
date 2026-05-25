"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import Placeholder from "@tiptap/extension-placeholder"
import { useCallback, useState, useRef } from "react"
import { TextSelection } from "@tiptap/pm/state"
import { DOMParser as ProseDOMParser } from "@tiptap/pm/model"
import {
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered,
  Quote, Link2, AlignLeft, AlignCenter, AlignRight, Minus,
  Heading2, Heading3, Unlink, Check, X, Code2,
} from "lucide-react"

interface Props {
  value: string
  onChange: (html: string) => void
  minHeight?: string
  placeholder?: string
}

export default function BlogEditor({ value, onChange, minHeight = "560px", placeholder = "Write your post here…" }: Props) {
  const [linkPopup, setLinkPopup]   = useState(false)
  const [linkUrl, setLinkUrl]       = useState("")
  const [sourceMode, setSourceMode] = useState(false)
  const [sourceHtml, setSourceHtml] = useState("")
  const savedRange = useRef<{ from: number; to: number } | null>(null)

  const toggleSource = () => {
    if (!editor) return
    if (!sourceMode) {
      // entering source mode — snapshot current HTML
      setSourceHtml(editor.getHTML())
      setSourceMode(true)
    } else {
      // leaving source mode — push raw HTML into editor
      editor.commands.setContent(sourceHtml, { emitUpdate: false })
      onChange(sourceHtml)
      setSourceMode(false)
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: { class: "text-blue-600 underline underline-offset-2 hover:text-blue-800" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "px-5 py-4 text-sm text-gray-800 leading-relaxed focus:outline-none",
        style: `min-height: ${minHeight}`,
      },
      handlePaste(view, event) {
        const text = event.clipboardData?.getData("text/plain") ?? ""
        // If pasted plain text looks like HTML, parse and insert it as rich content
        if (/^<[a-z][\s\S]*>/i.test(text.trim())) {
          event.preventDefault()
          const div = document.createElement("div")
          div.innerHTML = text
          const slice = ProseDOMParser.fromSchema(view.state.schema).parseSlice(div)
          view.dispatch(view.state.tr.replaceSelection(slice).scrollIntoView())
          return true
        }
        return false
      },
      handleKeyDown(view, event) {
        // When Space or Enter is pressed while cursor is inside a link, exit the link mark
        if (event.key === " " || event.key === "Enter") {
          const { state, dispatch } = view
          const { schema, selection, storedMarks, doc } = state
          const linkMark = schema.marks.link
          if (!linkMark) return false
          // Check if cursor is currently in a link (via storedMarks or node marks at cursor)
          const $pos = selection.$from
          const hasLinkStored = storedMarks?.some(m => m.type === linkMark)
          const hasLinkAtCursor = linkMark.isInSet($pos.marks())
          if (hasLinkStored || hasLinkAtCursor) {
            dispatch(state.tr.removeStoredMark(linkMark))
          }
        }
        return false
      },
    },
  })

  const openLinkPopup = useCallback(() => {
    if (!editor) return
    const { from, to } = editor.state.selection
    savedRange.current = { from, to }
    setLinkUrl(editor.getAttributes("link").href || "")
    setLinkPopup(true)
  }, [editor])

  const applyLink = useCallback(() => {
    try {
      if (!editor) return
      const range = savedRange.current
      if (linkUrl.trim()) {
        // Apply link to the saved selection range
        editor.chain().focus()
          .setTextSelection(range ?? editor.state.selection)
          .setLink({ href: linkUrl.trim() })
          .run()
        // Move cursor to AFTER the link and remove the link from stored marks
        // so the next typed character is NOT part of the link
        if (range) {
          const { state, view } = editor
          view.dispatch(
            state.tr
              .setSelection(TextSelection.create(state.doc, range.to))
              .removeStoredMark(state.schema.marks.link)
          )
        }
      } else {
        editor.chain().focus().unsetLink().run()
      }
    } finally {
      setLinkPopup(false)
      setLinkUrl("")
      savedRange.current = null
    }
  }, [editor, linkUrl])

  if (!editor) return null

  const btn = (active: boolean, onClick: () => void, icon: React.ReactNode, title: string) => (
    <button
      type="button"
      title={title}
      onMouseDown={e => { e.preventDefault(); onClick() }}
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
    <div className="rounded-xl border border-gray-200 bg-white" style={{ overflow: "visible" }}>

      {/* ── Toolbar ── */}
      <div className="relative flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-200 bg-gray-50 rounded-t-xl" style={{ zIndex: 100 }}>

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

        {sep()}

        {/* HTML source toggle */}
        <button
          type="button"
          title="Toggle HTML source"
          onMouseDown={e => { e.preventDefault(); toggleSource() }}
          className={`p-1.5 rounded-md transition text-xs font-mono font-bold ${
            sourceMode
              ? "bg-gray-900 text-white"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Editor area ── */}
      {sourceMode ? (
        <textarea
          value={sourceHtml}
          onChange={e => { setSourceHtml(e.target.value); onChange(e.target.value) }}
          className="w-full px-5 py-4 text-xs font-mono text-gray-700 bg-gray-50 border-0 focus:outline-none resize-none"
          style={{ minHeight: minHeight }}
          placeholder="Paste or edit raw HTML here, then click </> again to switch back to visual mode."
          spellCheck={false}
        />
      ) : (
        <div style={{ pointerEvents: linkPopup ? "none" : "auto" }}>
          <EditorContent editor={editor} />
        </div>
      )}

      {/* ── Editor styles ── */}
      <style>{`
        .tiptap h2 { font-size: 1.25rem; font-weight: 700; color: #111827; margin: 1.25rem 0 0.5rem; }
        .tiptap h3 { font-size: 1.05rem; font-weight: 600; color: #1f2937; margin: 1rem 0 0.4rem; }
        .tiptap p  { margin: 0.5rem 0; }
        .tiptap ul { list-style: disc;    padding-left: 1.5rem; margin: 0.5rem 0; }
        .tiptap ol { list-style: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }
        .tiptap li { margin: 0.25rem 0; }
        .tiptap blockquote { border-left: 3px solid #d1d5db; padding-left: 1rem; color: #6b7280; font-style: italic; margin: 0.75rem 0; }
        .tiptap hr { border: none; border-top: 1px solid #e5e7eb; margin: 1rem 0; }
        .tiptap p.is-editor-empty:first-child::before { color: #9ca3af; content: attr(data-placeholder); float: left; height: 0; pointer-events: none; white-space: nowrap; }
      `}</style>
    </div>
  )
}
