"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft, Calendar, User, Tag, MessageSquare,
  Send, Loader2, CheckCircle2, ChevronRight,
} from "lucide-react"
import SiteNavbar from "@/components/SiteNavbar"

const API = process.env.NEXT_PUBLIC_API_URL

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
      className="blog-content text-gray-700 leading-[1.85] text-[1.0625rem]"
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
        className="text-blue-600 underline underline-offset-2 hover:text-blue-800 transition-colors">
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
          <p key={i} className="text-gray-700 leading-[1.85] text-[1.0625rem]">
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

  return (
    <>
      <SiteNavbar alwaysLight />

      {/* HERO */}
      <div className="pt-16">
        {post.coverImage ? (
          <div className="relative w-full overflow-hidden" style={{ height: "80vh" }}>
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-8 max-w-4xl mx-auto w-full">
              {post.category && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/20 backdrop-blur text-white border border-white/30 px-3 py-1.5 rounded-full mb-4">
                  <Tag className="w-3 h-3" /> {post.category}
                </span>
              )}
              <h1 className="text-2xl md:text-4xl font-bold text-white leading-snug tracking-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-white/70 text-sm">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.authorName}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {publishedDate}</span>
                <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> {comments.length} comment{comments.length !== 1 ? "s" : ""}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#0a0f1e] pt-16 pb-12 px-6">
            <div className="max-w-3xl mx-auto">
              {post.category && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/10 text-white/70 border border-white/10 px-3 py-1.5 rounded-full mb-5">
                  <Tag className="w-3 h-3" /> {post.category}
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-snug tracking-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-6 text-white/50 text-sm">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.authorName}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {publishedDate}</span>
                <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> {comments.length} comment{comments.length !== 1 ? "s" : ""}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BREADCRUMB */}
      <div className="bg-gray-50 border-b border-gray-100 px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600 truncate max-w-[200px]">{post.title}</span>
        </div>
      </div>

      {/* CONTENT */}
      <article className="bg-white py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {post.excerpt && (
            <div
              className="text-xl text-gray-500 leading-relaxed mb-8 pb-8 border-b border-gray-100 font-light blog-content"
              dangerouslySetInnerHTML={{ __html: normalizeHtml(post.excerpt) }}
            />
          )}
          <div className="space-y-5">
            {renderContent(post.content)}
          </div>

          {/* Author card */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-white">
                  {post.authorName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{post.authorName}</p>
                <p className="text-xs text-gray-400 mt-0.5">Community contributor · Published {publishedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* COMMENTS */}
      <section className="bg-gray-50 py-14 px-6 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            Comments
            {!commentsLoading && (
              <span className="text-sm font-normal text-gray-400 ml-1">({comments.length})</span>
            )}
          </h2>

          {/* Existing comments */}
          {commentsLoading ? (
            <div className="flex items-center gap-2 text-gray-400 mb-8">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Loading comments...</span>
            </div>
          ) : comments.length === 0 ? (
            <p className="text-sm text-gray-400 mb-8">No comments yet. Be the first to leave one below.</p>
          ) : (
            <div className="space-y-4 mb-10">
              {comments.map(comment => (
                <div key={comment.id} className="bg-white rounded-2xl border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">
                          {comment.authorName[0]?.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{comment.authorName}</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{comment.body}</p>
                </div>
              ))}
            </div>
          )}

          {/* Comment form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-base font-bold text-gray-900 mb-5">Leave a comment</h3>

            {commentDone ? (
              <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Your comment has been submitted and will appear after review. Thank you!
              </div>
            ) : (
              <form onSubmit={submitComment} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.authorName}
                      onChange={e => setForm(p => ({ ...p, authorName: e.target.value }))}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Email <span className="text-red-400">*</span>
                      <span className="ml-1 text-gray-400 font-normal">(not shown publicly)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.authorEmail}
                      onChange={e => setForm(p => ({ ...p, authorEmail: e.target.value }))}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Comment <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share your thoughts..."
                    value={form.body}
                    onChange={e => setForm(p => ({ ...p, body: e.target.value }))}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {commentError && (
                  <p className="text-xs text-red-500">{commentError}</p>
                )}
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">Comments are reviewed before appearing.</p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all disabled:opacity-50"
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
      <section className="bg-[#0a0f1e] py-16 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-3">Smapey</p>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-snug">
            Simple software for<br />real small businesses.
          </h3>
          <p className="text-white/40 text-sm mb-7 leading-relaxed">
            Free to start. No credit card. No IT team required.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="https://app.smapey.com/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-7 py-3 rounded-full hover:bg-gray-100 transition-all"
            >
              Get started free
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-white/20 text-white/70 font-medium text-sm px-7 py-3 rounded-full hover:border-white/40 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> More posts
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
