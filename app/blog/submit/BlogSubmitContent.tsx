"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  PenLine, ImagePlus, X, Loader2, CheckCircle2, ArrowLeft, Upload,
} from "lucide-react"
import SiteNavbar from "@/components/SiteNavbar"
import BlogEditor from "@/components/BlogEditor"

const API = process.env.NEXT_PUBLIC_API_URL

// ── Layered Pop design tokens ──
const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

const CATEGORIES = [
  "Business Tips",
  "Money & Finance",
  "Customer Service",
  "Technology",
  "Marketing",
  "Operations",
  "Growth & Scaling",
  "My Story",
  "Other",
]


export default function BlogSubmitContent() {
  const [form, setForm] = useState({
    title: "",
    authorName: "",
    authorEmail: "",
    category: "",
    excerpt: "",
    content: "",
    coverImage: "",
  })
  const [imagePreview, setImagePreview] = useState("")
  const [uploading, setUploading]       = useState(false)
  const [submitting, setSubmitting]     = useState(false)
  const [error, setError]               = useState("")
  const [done, setDone]                 = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

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

  const set = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true)
      setError("")
      const fd = new FormData()
      fd.append("image", file)
      const res = await fetch(`${API}/api/blog/upload-image`, { method: "POST", body: fd })
      if (!res.ok) throw new Error("Upload failed")
      const data = await res.json()
      set("coverImage", data.url)
      setImagePreview(data.url)
    } catch {
      setError("Image upload failed. Please try again.")
    }
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!form.title.trim() || !form.authorName.trim() || !form.authorEmail.trim() || !form.content.trim()) {
      setError("Please fill in all required fields.")
      return
    }
    try {
      setSubmitting(true)
      const res = await fetch(`${API}/api/blog/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.message || "Submission failed")
      }
      setDone(true)
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
    }
    setSubmitting(false)
  }

  const inputStyle = { borderColor: INK, color: INK, background: "#fff" } as React.CSSProperties

  if (done) {
    return (
      <div style={{ fontFamily: display.fontFamily }}>
        <SiteNavbar alwaysLight />
        <div className="min-h-screen flex items-center justify-center px-6 pt-16" style={{ background: CREAM }}>
          <div className="max-w-md w-full text-center bg-white rounded-[28px] border-2 p-10" style={{ borderColor: INK, boxShadow: `10px 10px 0 ${AMBER}` }}>
            <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto mb-5" style={{ background: "#e9f9f0", borderColor: INK }}>
              <CheckCircle2 className="w-8 h-8" style={{ color: "#0d9f6e" }} />
            </div>
            <h2 className="text-2xl font-extrabold mb-3" style={{ color: INK }}>Post submitted!</h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#54514c" }}>
              Thanks for sharing, <strong style={{ color: INK }}>{form.authorName}</strong>! Your post is under review and will be published once approved. We typically review within 1–2 business days.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full border-2 transition-transform hover:-translate-y-0.5"
              style={{ ...display, background: AMBER, color: INK, borderColor: INK }}
            >
              <ArrowLeft className="w-4 h-4" /> Back to blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: display.fontFamily }}>
      <SiteNavbar alwaysLight />

      <div className="min-h-screen pt-24 pb-16 px-6" style={{ background: CREAM }}>
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white border-2 rounded-full px-4 py-2 text-xs font-bold mb-4" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
              <PenLine className="w-3.5 h-3.5" /> Community blog
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: INK }}>Share your <span style={{ color: AMBER }}>story</span></h1>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "#54514c" }}>
              Write about what you've learned running your business. Posts go live after a quick review.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Cover image */}
            <div className="bg-white rounded-[18px] border-2 overflow-hidden" style={{ borderColor: INK }}>
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Cover preview" className="w-full h-52 object-cover" style={{ borderBottom: `2px solid ${INK}` }} />
                  <button
                    type="button"
                    onClick={() => { setImagePreview(""); set("coverImage", "") }}
                    className="absolute top-3 right-3 bg-white rounded-full p-1.5 border-2 transition hover:-translate-y-0.5"
                    style={{ borderColor: INK }}
                  >
                    <X className="w-4 h-4" style={{ color: INK }} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="w-full h-40 flex flex-col items-center justify-center gap-3 transition"
                  style={{ borderBottom: "2px dashed rgba(22,22,22,.25)" }}
                >
                  {uploading ? (
                    <Loader2 className="w-6 h-6 animate-spin" style={{ color: BLUE }} />
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-[14px] border-2 flex items-center justify-center" style={{ background: CREAM, borderColor: INK }}>
                        <ImagePlus className="w-5 h-5" style={{ color: INK }} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold" style={{ color: INK }}>Click to upload cover image</p>
                        <p className="text-xs mt-0.5" style={{ color: "#9a948b" }}>JPG or PNG · Recommended 1200×630</p>
                      </div>
                    </>
                  )}
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
              />
              {!imagePreview && (
                <div className="px-4 py-3 flex items-center gap-2">
                  <Upload className="w-3.5 h-3.5 shrink-0" style={{ color: "#9a948b" }} />
                  <p className="text-xs" style={{ color: "#9a948b" }}>
                    Cover image is optional but makes your post stand out in the blog feed.
                  </p>
                </div>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-bold mb-1.5" style={{ color: INK }}>
                Post title <span style={{ color: "#e11d48" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="E.g. How I doubled my gym memberships in 3 months"
                value={form.title}
                onChange={e => set("title", e.target.value)}
                className="w-full px-4 py-3 text-sm border-2 rounded-xl focus:outline-none"
                style={inputStyle}
                maxLength={120}
              />
              <p className="text-xs mt-1 text-right" style={{ color: "#9a948b" }}>{form.title.length}/120</p>
            </div>

            {/* Author + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: INK }}>
                  Your name <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Maria Santos"
                  value={form.authorName}
                  onChange={e => set("authorName", e.target.value)}
                  className="w-full px-4 py-3 text-sm border-2 rounded-xl focus:outline-none"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: INK }}>
                  Your email <span style={{ color: "#e11d48" }}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="maria@example.com"
                  value={form.authorEmail}
                  onChange={e => set("authorEmail", e.target.value)}
                  className="w-full px-4 py-3 text-sm border-2 rounded-xl focus:outline-none"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-bold mb-1.5" style={{ color: INK }}>Category</label>
              <select
                value={form.category}
                onChange={e => set("category", e.target.value)}
                className="w-full px-4 py-3 text-sm border-2 rounded-xl focus:outline-none"
                style={inputStyle}
              >
                <option value="">Select a category (optional)</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-bold mb-1.5" style={{ color: INK }}>
                Short summary
                <span className="ml-1 text-xs font-medium" style={{ color: "#9a948b" }}>(shows in the blog feed)</span>
              </label>
              <BlogEditor
                value={form.excerpt}
                onChange={html => set("excerpt", html)}
                minHeight="120px"
                placeholder="One or two sentences summarising what your post is about."
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-bold mb-1.5" style={{ color: INK }}>
                Your post <span style={{ color: "#e11d48" }}>*</span>
              </label>
              <BlogEditor
                value={form.content}
                onChange={html => set("content", html)}
              />
              <p className="text-xs mt-2" style={{ color: "#9a948b" }}>
                Tip: Use <strong style={{ color: INK }}>H2/H3</strong> for section headings · Select text then click 🔗 to add a link · Use <strong style={{ color: INK }}>"</strong> for quotes
              </p>
            </div>

            {error && (
              <div className="border-2 text-sm rounded-xl px-4 py-3 font-semibold" style={{ background: "#fdecec", borderColor: "#e11d48", color: "#c01a3e" }}>
                {error}
              </div>
            )}

            <div className="flex items-center justify-between gap-4 pt-2">
              <p className="text-xs leading-relaxed max-w-xs" style={{ color: "#9a948b" }}>
                Your post will be reviewed before it goes live. We may lightly edit for clarity or formatting.
              </p>
              <button
                type="submit"
                disabled={submitting || uploading}
                className="flex items-center gap-2 text-sm font-bold px-8 py-3.5 rounded-full border-2 transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <PenLine className="w-4 h-4" />}
                {submitting ? "Submitting..." : "Submit post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
