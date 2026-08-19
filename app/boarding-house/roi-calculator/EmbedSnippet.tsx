"use client"

import { useState } from "react"

const INK = "#161616"
const MUTED = "#54514c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

const SNIPPET = `<iframe src="https://smapey.com/boarding-house/roi-calculator/embed" width="100%" height="900" style="border:2px solid #161616;border-radius:22px" title="Boarding House ROI Calculator" loading="lazy"></iframe>`

/**
 * The spec makes this tool ungated on purpose - the backlinks it earns are
 * worth more than the emails a form would collect. Making it trivially
 * embeddable is the other half of that: a copyable iframe is how a tool ends
 * up on someone else's site with a link back.
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
    <section className="py-14 px-6 bg-white" style={display}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-extrabold tracking-tight mb-3" style={{ color: INK }}>
          Use this on your own site
        </h2>
        <p className="text-base leading-relaxed mb-5" style={{ color: MUTED }}>
          Free to embed, no attribution required - though a link back is always welcome.
          Paste this wherever you want the calculator to appear.
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
          style={{ background: copied ? "#e7f5ec" : INK, color: copied ? "#186a3b" : "#fff", borderColor: copied ? "#186a3b" : INK }}
        >
          {copied ? "Copied" : "Copy embed code"}
        </button>
      </div>
    </section>
  )
}
