"use client"

import { useState } from "react"

const INK = "#161616"
const MUTED = "#54514c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

const SNIPPET = `<iframe src="https://smapey.com/vet-clinic/puppy-weight-calculator/embed" width="100%" height="900" style="border:2px solid #161616;border-radius:22px" title="Puppy Weight Calculator" loading="lazy"></iframe>`

/**
 * The embed matters more here than on the costing tools. A puppy calculator is
 * the kind of thing breeders, rescue sites, training blogs and pet forums link
 * to on their own, and links are the binding constraint on this domain - so
 * making it trivially easy to put on someone else's site is most of the point.
 */
export default function EmbedSnippet() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SNIPPET)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="py-14 px-6" style={{ ...display, background: "#fbf7f0" }}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-extrabold tracking-tight mb-3" style={{ color: INK }}>
          Use this on your own site
        </h2>
        <p className="text-base leading-relaxed mb-5" style={{ color: MUTED }}>
          Free to embed on breeder pages, rescue sites, training blogs, or a clinic&apos;s own website. No attribution
          required, though a link back is always welcome.
        </p>
        <pre
          className="rounded-[18px] border-2 p-4 text-xs overflow-x-auto"
          style={{ borderColor: INK, background: "#f7f7f5", color: INK }}
        >
          <code>{SNIPPET}</code>
        </pre>
        <button
          onClick={copy}
          className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5"
          style={{
            background: copied ? "#e7f5ec" : INK,
            color: copied ? "#186a3b" : "#fff",
            borderColor: copied ? "#186a3b" : INK,
          }}
        >
          {copied ? "Copied" : "Copy embed code"}
        </button>
      </div>
    </section>
  )
}
