"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft, Calendar, User, Tag, MessageSquare,
  Send, Loader2, CheckCircle2, ChevronRight,
} from "lucide-react"
import SiteNavbar from "@/components/SiteNavbar"

const API = process.env.NEXT_PUBLIC_API_URL

// ── Layered Pop design tokens ──
const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  coverImage: string | null
  authorName: string
  authorEmail: string
  category: string | null
  publishedAt: string
  updatedAt: string
}

interface Comment {
  id: string
  authorName: string
  body: string
  createdAt: string
}


// Render HTML content (new posts from rich editor)
function RichContent({ html }: { html: string }) {
  return (
    <div
      className="blog-content leading-[1.85] text-[1.0625rem]"
      style={{ color: "#2a2622" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

// Render plain-text content (legacy posts) with [label](url) link support
function renderLine(line: string, key: number) {
  const parts: React.ReactNode[] = []
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g
  let last = 0, match
  while ((match = regex.exec(line)) !== null) {
    if (match.index > last) parts.push(line.slice(last, match.index))
    parts.push(
      <a key={`${key}-${match.index}`} href={match[2]} target="_blank" rel="noopener noreferrer"
        className="underline underline-offset-2 transition-colors" style={{ color: BLUE }}>
        {match[1]}
      </a>
    )
    last = match.index + match[0].length
  }
  if (last < line.length) parts.push(line.slice(last))
  return parts
}

function PlainContent({ content }: { content: string }) {
  return (
    <>
      {content.split(/\n\n+/).map((para, i) => {
        const trimmed = para.trim()
        if (!trimmed) return null
        const lines = trimmed.split("\n")
        return (
          <p key={i} className="leading-[1.85] text-[1.0625rem]" style={{ color: "#2a2622" }}>
            {lines.map((line, j) => (
              <span key={j}>
                {renderLine(line, j)}
                {j < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        )
      })}
    </>
  )
}

// If someone typed raw HTML into the visual editor, TipTap stores the tags
// as escaped entities (e.g. &lt;p&gt;). Decode and unwrap so it renders correctly.
function normalizeHtml(html: string): string {
  if (!html.includes("&lt;")) return html
  const decoded = html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
  // Strip the single outer <p>…</p> wrapper TipTap added
  return decoded.replace(/^<p>([\s\S]*)<\/p>$/, "$1")
}

function renderContent(content: string) {
  const normalized = normalizeHtml(content)
  const isHtml = /^<[a-z][\s\S]*>/i.test(normalized.trimStart())
  return isHtml ? <RichContent html={normalized} /> : <PlainContent content={normalized} />
}

export default function BlogPostContent({ post }: { post: Post }) {
  const [comments, setComments]       = useState<Comment[]>([])
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [form, setForm]               = useState({ authorName: "", authorEmail: "", body: "" })
  const [submitting, setSubmitting]   = useState(false)
  const [commentDone, setCommentDone] = useState(false)
  const [commentError, setCommentError] = useState("")

  // Load the Layered Pop display font (no-op if already present).
  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link")
      l.id = id
      l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/api/blog/posts/${post.slug}/comments`)
        const data = await res.json()
        setComments(data.comments || [])
      } catch {}
      setCommentsLoading(false)
    }
    load()
  }, [post.slug])

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    setCommentError("")
    if (!form.authorName.trim() || !form.authorEmail.trim() || !form.body.trim()) {
      setCommentError("Please fill in all fields.")
      return
    }
    try {
      setSubmitting(true)
      const res = await fetch(`${API}/api/blog/posts/${post.slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setCommentDone(true)
      setForm({ authorName: "", authorEmail: "", body: "" })
    } catch {
      setCommentError("Failed to submit. Please try again.")
    }
    setSubmitting(false)
  }

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-PH", {
    year: "numeric", month: "long", day: "numeric",
  })

  const inputStyle = { borderColor: INK, color: INK } as React.CSSProperties

  return (
    <div style={{ fontFamily: display.fontFamily }}>
      <SiteNavbar alwaysLight />

      {/* HERO */}
      <div className="pt-16">
        {post.coverImage ? (
          <div className="relative w-full overflow-hidden" style={{ height: "70vh" }}>
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(22,22,22,.8), rgba(22,22,22,.15) 55%, transparent)" }} />
            <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10 max-w-4xl mx-auto w-full">
              {post.category && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold border-2 px-3 py-1.5 rounded-full mb-4" style={{ background: AMBER, color: INK, borderColor: INK }}>
                  <Tag className="w-3 h-3" /> {post.category}
                </span>
              )}
              <h1 className="text-2xl md:text-5xl font-extrabold text-white leading-[1.05] tracking-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-white/80 text-sm font-medium">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.authorName}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {publishedDate}</span>
                <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> {comments.length} comment{comments.length !== 1 ? "s" : ""}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-16 pb-14 px-6 relative overflow-hidden" style={{ background: CREAM }}>
            <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
              <div className="absolute rounded-[22px] border-2" style={{ top: "30%", right: "-70px", width: 260, height: 74, background: BLUE, borderColor: INK, transform: "rotate(8deg)" }} />
            </div>
            <div className="max-w-3xl mx-auto relative z-10">
              {post.category && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold border-2 px-3 py-1.5 rounded-full mb-5" style={{ background: AMBER, color: INK, borderColor: INK }}>
                  <Tag className="w-3 h-3" /> {post.category}
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.05] tracking-tight" style={{ color: INK }}>
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-6 text-sm font-medium" style={{ color: "#54514c" }}>
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.authorName}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {publishedDate}</span>
                <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> {comments.length} comment{comments.length !== 1 ? "s" : ""}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BREADCRUMB */}
      <div className="px-6 py-3" style={{ background: CREAM, borderTop: `2px solid ${INK}`, borderBottom: `2px solid ${INK}` }}>
        <div className="max-w-3xl mx-auto flex items-center gap-2 text-xs font-semibold" style={{ color: "#9a948b" }}>
          <Link href="/" className="hover:opacity-60 transition-opacity">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:opacity-60 transition-opacity">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="truncate max-w-[200px]" style={{ color: INK }}>{post.title}</span>
        </div>
      </div>

      {/* CONTENT */}
      <article className="py-14 px-6" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto">
          {post.excerpt && (
            <div
              className="text-xl leading-relaxed mb-8 pb-8 blog-content"
              style={{ color: "#54514c", borderBottom: "2px solid rgba(22,22,22,.1)" }}
              dangerouslySetInnerHTML={{ __html: normalizeHtml(post.excerpt) }}
            />
          )}
          <div className="space-y-5">
            {renderContent(post.content)}
          </div>

          {/* Author card */}
          <div className="mt-12 pt-8" style={{ borderTop: "2px solid rgba(22,22,22,.1)" }}>
            <div className="flex items-center gap-4 rounded-[18px] border-2 p-5" style={{ background: CREAM, borderColor: INK, boxShadow: `5px 5px 0 ${BLUE}` }}>
              <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0" style={{ background: BLUE, borderColor: INK }}>
                <span className="text-sm font-bold text-white">
                  {post.authorName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-extrabold" style={{ color: INK }}>{post.authorName}</p>
                <p className="text-xs mt-0.5" style={{ color: "#9a948b" }}>Community contributor · Published {publishedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* COMMENTS */}
      <section className="py-16 px-6" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-extrabold mb-8 flex items-center gap-2" style={{ color: INK }}>
            <MessageSquare className="w-5 h-5" style={{ color: BLUE }} />
            Comments
            {!commentsLoading && (
              <span className="text-sm font-semibold ml-1" style={{ color: "#9a948b" }}>({comments.length})</span>
            )}
          </h2>

          {/* Existing comments */}
          {commentsLoading ? (
            <div className="flex items-center gap-2 mb-8" style={{ color: "#9a948b" }}>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm font-semibold">Loading comments...</span>
            </div>
          ) : comments.length === 0 ? (
            <p className="text-sm font-semibold mb-8" style={{ color: "#9a948b" }}>No comments yet. Be the first to leave one below.</p>
          ) : (
            <div className="space-y-4 mb-10">
              {comments.map(comment => (
                <div key={comment.id} className="bg-white rounded-[18px] border-2 p-5" style={{ borderColor: INK }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center" style={{ background: AMBER, borderColor: INK }}>
                        <span className="text-xs font-bold" style={{ color: INK }}>
                          {comment.authorName[0]?.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-extrabold" style={{ color: INK }}>{comment.authorName}</span>
                    </div>
                    <span className="text-xs font-medium" style={{ color: "#9a948b" }}>
                      {new Date(comment.createdAt).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#54514c" }}>{comment.body}</p>
                </div>
              ))}
            </div>
          )}

          {/* Comment form */}
          <div className="bg-white rounded-[20px] border-2 p-6" style={{ borderColor: INK, boxShadow: `6px 6px 0 ${INK}` }}>
            <h3 className="text-base font-extrabold mb-5" style={{ color: INK }}>Leave a comment</h3>

            {commentDone ? (
              <div className="flex items-center gap-3 border-2 rounded-xl px-4 py-3 text-sm font-semibold" style={{ background: "#e9f9f0", borderColor: "#0d9f6e", color: "#0d7a55" }}>
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Your comment has been submitted and will appear after review. Thank you!
              </div>
            ) : (
              <form onSubmit={submitComment} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: INK }}>
                      Name <span style={{ color: "#e11d48" }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.authorName}
                      onChange={e => setForm(p => ({ ...p, authorName: e.target.value }))}
                      className="w-full px-4 py-2.5 text-sm border-2 rounded-xl focus:outline-none"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: INK }}>
                      Email <span style={{ color: "#e11d48" }}>*</span>
                      <span className="ml-1 font-medium" style={{ color: "#9a948b" }}>(not shown publicly)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.authorEmail}
                      onChange={e => setForm(p => ({ ...p, authorEmail: e.target.value }))}
                      className="w-full px-4 py-2.5 text-sm border-2 rounded-xl focus:outline-none"
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: INK }}>
                    Comment <span style={{ color: "#e11d48" }}>*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share your thoughts..."
                    value={form.body}
                    onChange={e => setForm(p => ({ ...p, body: e.target.value }))}
                    className="w-full px-4 py-3 text-sm border-2 rounded-xl resize-none focus:outline-none"
                    style={inputStyle}
                  />
                </div>
                {commentError && (
                  <p className="text-xs font-semibold" style={{ color: "#e11d48" }}>{commentError}</p>
                )}
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium" style={{ color: "#9a948b" }}>Comments are reviewed before appearing.</p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                    style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}
                  >
                    {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    {submitting ? "Posting..." : "Post comment"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto rounded-[30px] border-2 p-10 md:p-14 text-center" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#5c4a28" }}>Smapey</p>
          <h3 className="text-2xl md:text-4xl font-extrabold mb-3 leading-[1.05]" style={{ color: INK }}>
            Simple software for<br />real small businesses.
          </h3>
          <p className="text-sm mb-7 leading-relaxed font-medium" style={{ color: "#5c4a28" }}>
            Free to start. No credit card. No IT team required.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="https://app.smapey.com/register"
              className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-full border-2 transition-transform hover:-translate-y-0.5"
              style={{ ...display, background: INK, color: "#fff", borderColor: INK }}
            >
              Get started free
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-full border-2 bg-white transition-transform hover:-translate-y-0.5"
              style={{ ...display, color: INK, borderColor: INK }}
            >
              <ArrowLeft className="w-4 h-4" /> More posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
