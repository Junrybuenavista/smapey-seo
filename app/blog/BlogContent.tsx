"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import Link from "next/link"
import {
  Search, Calendar, User, Tag, ArrowRight,
  PenLine, Loader2, Inbox, ChevronLeft, ChevronRight,
} from "lucide-react"
import SiteNavbar from "@/components/SiteNavbar"

const API = process.env.NEXT_PUBLIC_API_URL

// ── Layered Pop design tokens ──
const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

function normalizeHtml(html: string): string {
  if (!html.includes("&lt;")) return html
  const decoded = html
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  return decoded.replace(/^<p>([\s\S]*)<\/p>$/, "$1")
}

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  authorName: string
  category: string | null
  publishedAt: string
  createdAt: string
}


const POSTS_PER_PAGE = 9

/**
 * The grid is seeded from the server rather than fetched on mount.
 *
 * `initialPosts` is the first page, already rendered into the HTML, so the
 * posts are crawlable and the reader sees them without waiting on the API. The
 * client only refetches once they actually change page or category - see the
 * mount guard on the fetch effect below.
 */
export default function BlogContent({
  initialPosts = [],
  initialTotal = 0,
  initialCategories = [],
  archive = null,
}: {
  initialPosts?: Post[]
  initialTotal?: number
  initialCategories?: string[]
  /** The full server-rendered post index, passed down from page.tsx. */
  archive?: ReactNode
}) {
  const [posts, setPosts]           = useState<Post[]>(initialPosts)
  const [categories, setCategories] = useState<string[]>(initialCategories)
  const [loading, setLoading]       = useState(initialPosts.length === 0)
  const [total, setTotal]           = useState(initialTotal)
  const [page, setPage]             = useState(1)
  const [search, setSearch]         = useState("")
  const [activeCategory, setActiveCategory] = useState("")

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

  const fetchPosts = async (p: number, cat: string) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: String(p),
        limit: String(POSTS_PER_PAGE),
        ...(cat ? { category: cat } : {}),
      })
      const res = await fetch(`${API}/api/blog/posts?${params}`)
      const data = await res.json()
      setPosts(data.posts || [])
      setTotal(data.total || 0)
    } catch {}
    setLoading(false)
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API}/api/blog/posts/categories`)
      const data = await res.json()
      setCategories(data.categories || [])
    } catch {}
  }

  // Categories arrive with the server render; only fetch them if that failed.
  useEffect(() => {
    if (initialCategories.length === 0) fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Skip the fetch on mount when the server already handed us the first page -
  // without this guard the seeded posts are immediately replaced by an
  // identical round trip, and the grid flashes a spinner for no reason.
  const seeded = useRef(initialPosts.length > 0)
  useEffect(() => {
    if (seeded.current) {
      seeded.current = false
      return
    }
    fetchPosts(page, activeCategory)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, activeCategory])

  const handleCategory = (cat: string) => {
    setActiveCategory(cat)
    setPage(1)
  }

  const filtered = search.trim()
    ? posts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.excerpt || "").toLowerCase().includes(search.toLowerCase())
      )
    : posts

  const totalPages = Math.ceil(total / POSTS_PER_PAGE)

  return (
    <div style={{ fontFamily: display.fontFamily }}>
      <SiteNavbar alwaysLight />

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden" style={{ background: CREAM, color: INK }}>
        {/* playful layered-bar accents */}
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2" style={{ top: "26%", left: "-60px", width: 250, height: 72, background: AMBER, borderColor: INK, transform: "rotate(-10deg)" }} />
          <div className="absolute rounded-[22px] border-2" style={{ top: "38%", right: "-70px", width: 270, height: 76, background: BLUE, borderColor: INK, transform: "rotate(9deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border-2 rounded-full px-4 py-2 mb-6" style={{ borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <PenLine className="w-3.5 h-3.5" style={{ color: BLUE }} />
            <span className="text-xs font-bold tracking-wide" style={{ color: INK }}>Community Blog</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.04] tracking-tight" style={{ color: INK }}>
            Real stories from<br />
            <span style={{ color: BLUE }}>real </span><span style={{ color: AMBER }}>small businesses.</span>
          </h1>
          <p className="mt-5 text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "#54514c" }}>
            Tips, insights, and lessons learned, written by the people actually running these businesses.
          </p>
          <Link
            href="/blog/submit"
            className="mt-8 inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-full border-2 transition-transform hover:-translate-y-0.5"
            style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}
          >
            <PenLine className="w-4 h-4" /> Share your story
          </Link>
        </div>
      </section>

      {/* SEARCH + CATEGORIES */}
      <section className="sticky top-16 z-40 px-6" style={{ background: CREAM, borderTop: `2px solid ${INK}`, borderBottom: `2px solid ${INK}` }}>
        <div className="max-w-7xl mx-auto py-4 flex flex-col sm:flex-row items-center gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: INK }} />
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-full focus:outline-none bg-white border-2"
              style={{ borderColor: INK, color: INK }}
            />
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 w-full">
            <button
              onClick={() => handleCategory("")}
              className="shrink-0 text-xs font-bold px-4 py-2 rounded-full border-2 transition-all"
              style={activeCategory === "" ? { background: INK, color: "#fff", borderColor: INK } : { background: "#fff", color: INK, borderColor: INK }}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategory(cat!)}
                className="shrink-0 text-xs font-bold px-4 py-2 rounded-full border-2 transition-all"
                style={activeCategory === cat ? { background: INK, color: "#fff", borderColor: INK } : { background: "#fff", color: INK, borderColor: INK }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* POSTS GRID */}
      <section className="min-h-screen py-16 px-6" style={{ background: CREAM }}>
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-24 gap-2" style={{ color: "#9a948b" }}>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm font-semibold">Loading posts...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Inbox className="w-12 h-12" style={{ color: "#d8d1c4" }} />
              <p className="text-sm font-semibold" style={{ color: "#9a948b" }}>No posts found</p>
              <Link href="/blog/submit" className="text-sm font-bold hover:underline" style={{ color: BLUE }}>
                Be the first to write one →
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm font-semibold mb-6" style={{ color: "#9a948b" }}>
                {search ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${search}"` : `${total} post${total !== 1 ? "s" : ""}`}
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((post, i) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                    <article className="bg-white rounded-[24px] border-2 overflow-hidden h-full flex flex-col transition-transform group-hover:-translate-y-1.5" style={{ borderColor: INK, boxShadow: `6px 6px 0 ${i % 2 === 0 ? BLUE : AMBER}` }}>
                      {/* Cover image */}
                      <div className="h-48 overflow-hidden" style={{ background: CREAM, borderBottom: `2px solid ${INK}` }}>
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <PenLine className="w-10 h-10" style={{ color: "#d8d1c4" }} />
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        {post.category && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit border-2" style={{ color: INK, background: "#fff", borderColor: INK }}>
                            <Tag className="w-3 h-3" /> {post.category}
                          </span>
                        )}
                        <h2 className="text-base font-extrabold leading-snug mb-2 line-clamp-2 transition-colors" style={{ color: INK }}>
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <div
                            className="text-sm leading-relaxed mb-4 line-clamp-3 flex-1 blog-content"
                            style={{ color: "#54514c" }}
                            dangerouslySetInnerHTML={{ __html: normalizeHtml(post.excerpt) }}
                          />
                        )}
                        <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid rgba(22,22,22,.1)" }}>
                          <div className="flex items-center gap-3 text-xs font-medium" style={{ color: "#9a948b" }}>
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" /> {post.authorName}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-PH", {
                                month: "short", day: "numeric", year: "numeric",
                              })}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 transition-all group-hover:translate-x-0.5" style={{ color: INK }} />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && !search && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex items-center gap-1.5 text-sm font-bold px-4 py-2.5 rounded-full border-2 bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    style={{ color: INK, borderColor: INK }}
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className="w-9 h-9 rounded-full text-sm font-bold border-2 transition-all"
                      style={page === n ? { background: INK, color: "#fff", borderColor: INK } : { background: "#fff", color: INK, borderColor: INK }}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="flex items-center gap-1.5 text-sm font-bold px-4 py-2.5 rounded-full border-2 bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    style={{ color: INK, borderColor: INK }}
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* FULL INDEX - server-rendered, so every post is crawlable from here */}
      {archive}

      {/* CTA FOOTER */}
      <section className="py-20 px-6" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto rounded-[30px] border-2 p-10 md:p-14 text-center" style={{ background: INK, borderColor: INK, boxShadow: `8px 8px 0 ${AMBER}` }}>
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3" style={{ color: "#fff" }}>Have something to share?</h3>
          <p className="text-sm mb-7 leading-relaxed max-w-md mx-auto" style={{ color: "rgba(255,255,255,.6)" }}>
            Your story could help another small business owner. Write a post and reach the Smapey community.
          </p>
          <Link
            href="/blog/submit"
            className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-full border-2 transition-transform hover:-translate-y-0.5"
            style={{ ...display, background: AMBER, color: INK, borderColor: INK }}
          >
            <PenLine className="w-4 h-4" /> Submit a post
          </Link>
        </div>
      </section>
    </div>
  )
}
