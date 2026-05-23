"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Search, Calendar, User, Tag, ArrowRight,
  PenLine, Loader2, Inbox, ChevronLeft, ChevronRight,
} from "lucide-react"
import SiteNavbar from "@/components/SiteNavbar"

const API = process.env.NEXT_PUBLIC_API_URL

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

export default function BlogContent() {
  const [posts, setPosts]           = useState<Post[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading]       = useState(true)
  const [total, setTotal]           = useState(0)
  const [page, setPage]             = useState(1)
  const [search, setSearch]         = useState("")
  const [activeCategory, setActiveCategory] = useState("")

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

  useEffect(() => { fetchCategories() }, [])
  useEffect(() => { fetchPosts(page, activeCategory) }, [page, activeCategory])

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
    <>
      <SiteNavbar />

      {/* HERO */}
      <section className="bg-[#0a0f1e] pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
            <PenLine className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-medium text-white/70 tracking-wide">Community Blog</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
            Real stories from<br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-teal-400 bg-clip-text text-transparent">
              real small businesses.
            </span>
          </h1>
          <p className="mt-5 text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            Tips, insights, and lessons learned — written by the people actually running these businesses.
          </p>
          <Link
            href="/blog/submit"
            className="mt-8 inline-flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-0.5"
          >
            <PenLine className="w-4 h-4" /> Share your story
          </Link>
        </div>
      </section>

      {/* SEARCH + CATEGORIES */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-40 px-6">
        <div className="max-w-7xl mx-auto py-4 flex flex-col sm:flex-row items-center gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 w-full">
            <button
              onClick={() => handleCategory("")}
              className={`shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                activeCategory === "" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategory(cat!)}
                className={`shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                  activeCategory === cat ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* POSTS GRID */}
      <section className="bg-gray-50 min-h-screen py-14 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-24 gap-2 text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">Loading posts...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Inbox className="w-12 h-12 text-gray-200" />
              <p className="text-gray-400 text-sm">No posts found</p>
              <Link href="/blog/submit" className="text-sm font-semibold text-blue-600 hover:underline">
                Be the first to write one →
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-6">
                {search ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${search}"` : `${total} post${total !== 1 ? "s" : ""}`}
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                    <article className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                      {/* Cover image */}
                      <div className="h-48 bg-gradient-to-br from-blue-50 to-violet-50 overflow-hidden">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <PenLine className="w-10 h-10 text-gray-200" />
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        {post.category && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3 w-fit">
                            <Tag className="w-3 h-3" /> {post.category}
                          </span>
                        )}
                        <h2 className="text-base font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3 flex-1">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-3 text-xs text-gray-400">
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
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
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
                    className="flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`w-9 h-9 rounded-full text-sm font-semibold transition-all ${
                        page === n
                          ? "bg-gray-900 text-white"
                          : "border border-gray-200 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="bg-[#0a0f1e] py-16 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-3">Have something to share?</h3>
          <p className="text-white/40 text-sm mb-6 leading-relaxed">
            Your story could help another small business owner. Write a post and reach the Smapey community.
          </p>
          <Link
            href="/blog/submit"
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-7 py-3 rounded-full hover:bg-gray-100 transition-all"
          >
            <PenLine className="w-4 h-4" /> Submit a post
          </Link>
        </div>
      </section>
    </>
  )
}
