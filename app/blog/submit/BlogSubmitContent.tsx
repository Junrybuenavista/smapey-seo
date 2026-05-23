"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import {
  PenLine, ImagePlus, X, Loader2, CheckCircle2, ArrowLeft, Upload,
} from "lucide-react"
import SiteNavbar from "@/components/SiteNavbar"

const API = process.env.NEXT_PUBLIC_API_URL

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

  if (done) {
    return (
      <>
        <SiteNavbar alwaysLight />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 pt-16">
          <div className="max-w-md w-full text-center bg-white rounded-3xl border border-gray-200 p-10 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Post submitted!</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Thanks for sharing, <strong>{form.authorName}</strong>! Your post is under review and will be published once approved. We typically review within 1–2 business days.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-800 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to blog
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SiteNavbar alwaysLight />

      <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 text-xs font-semibold mb-4">
              <PenLine className="w-3.5 h-3.5" /> Community blog
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Share your story</h1>
            <p className="mt-2 text-gray-500 text-sm leading-relaxed">
              Write about what you've learned running your business. Posts go live after a quick review.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Cover image */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Cover preview" className="w-full h-52 object-cover" />
                  <button
                    type="button"
                    onClick={() => { setImagePreview(""); set("coverImage", "") }}
                    className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="w-full h-40 flex flex-col items-center justify-center gap-3 text-gray-400 hover:bg-gray-50 transition border-b border-dashed border-gray-200"
                >
                  {uploading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                        <ImagePlus className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Click to upload cover image</p>
                        <p className="text-xs text-gray-400 mt-0.5">JPG or PNG · Recommended 1200×630</p>
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
                  <Upload className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <p className="text-xs text-gray-400">
                    Cover image is optional but makes your post stand out in the blog feed.
                  </p>
                </div>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Post title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="E.g. How I doubled my gym memberships in 3 months"
                value={form.title}
                onChange={e => set("title", e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                maxLength={120}
              />
              <p className="text-xs text-gray-400 mt-1 text-right">{form.title.length}/120</p>
            </div>

            {/* Author + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Your name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Maria Santos"
                  value={form.authorName}
                  onChange={e => set("authorName", e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Your email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="maria@example.com"
                  value={form.authorEmail}
                  onChange={e => set("authorEmail", e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={e => set("category", e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
              >
                <option value="">Select a category (optional)</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Short summary
                <span className="ml-1 text-xs text-gray-400 font-normal">(shows in the blog feed)</span>
              </label>
              <textarea
                rows={2}
                placeholder="One or two sentences summarising what your post is about."
                value={form.excerpt}
                onChange={e => set("excerpt", e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                maxLength={300}
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Your post <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={14}
                placeholder={`Write your post here...\n\nTip: Use blank lines to separate paragraphs. Be specific — real numbers, real lessons, and honest experiences make the best posts.`}
                value={form.content}
                onChange={e => set("content", e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white font-mono leading-relaxed"
              />
              <p className="text-xs text-gray-400 mt-1">{form.content.length} characters</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between gap-4 pt-2">
              <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                Your post will be reviewed before it goes live. We may lightly edit for clarity or formatting.
              </p>
              <button
                type="submit"
                disabled={submitting || uploading}
                className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 shadow-lg shrink-0"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <PenLine className="w-4 h-4" />}
                {submitting ? "Submitting..." : "Submit post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
