"use client"

/**
 * Brand-neutral article primitives in the Layered Pop style.
 *
 * These were written twice already — once in app/water-refilling/_shared.tsx and
 * again in app/laundry/_shared.tsx — with only the surrounding chrome differing.
 * This is the third use, so they live here instead of being copied again. The two
 * existing cluster modules still carry their own copies; fold them into this kit
 * the next time either is touched.
 *
 * Chrome (navbar, footer, CTA, product pitch) stays per-cluster, because that is
 * the part that actually differs.
 */

import { useState, useEffect, useRef } from "react"
import { CheckCircle2, ChevronRight } from "lucide-react"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

export function useArticleFont() {
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
}

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.15, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

export function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{
      transitionProperty: "opacity, transform", transitionDuration: "600ms",
      transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)",
    }}>
      {children}
    </div>
  )
}

export function ArticleHero({ badge, title, intro }: { badge: string; title: React.ReactNode; intro: string }) {
  useArticleFont()
  return (
    <section className="pt-28 pb-16 px-6" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-6" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${AMBER}` }}>
          {badge}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-6" style={{ color: INK }}>{title}</h1>
        <p className="text-lg leading-relaxed" style={{ color: "#54514c" }}>{intro}</p>
      </div>
    </section>
  )
}

export function AH2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-14 mb-4" style={{ color: INK, fontFamily: display.fontFamily }}>{children}</h2>
}

export function AP({ children }: { children: React.ReactNode }) {
  return <p className="leading-relaxed my-4" style={{ color: "#54514c" }}>{children}</p>
}

export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="my-5 space-y-2.5">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3" style={{ color: "#54514c" }}>
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-1" style={{ color: BLUE }} />
          <span className="text-sm leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  )
}

/** Two-column reference table. Used for costs, specs, deadlines, comparisons. */
export function DataTable({ rows, note, head }: { rows: [React.ReactNode, React.ReactNode][]; note?: string; head?: [string, string] }) {
  return (
    <div className="my-6 rounded-[16px] border-2 overflow-hidden" style={{ borderColor: INK, boxShadow: `5px 5px 0 ${BLUE}` }}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {head && (
            <thead>
              <tr style={{ background: INK }}>
                <th className="px-5 py-3 text-left font-extrabold text-white">{head[0]}</th>
                <th className="px-5 py-3 text-right font-extrabold text-white">{head[1]}</th>
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map(([label, value], i) => (
              <tr key={i} style={{ background: i % 2 ? CREAM : "#fff" }}>
                <td className="px-5 py-3 align-top" style={{ color: "#54514c" }}>{label}</td>
                <td className="px-5 py-3 align-top text-right font-extrabold" style={{ color: INK }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="px-5 py-3 text-xs" style={{ color: "#9a948b", background: CREAM, borderTop: `2px solid ${INK}` }}>{note}</p>}
    </div>
  )
}

export function FAQList({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="flex flex-col gap-3 my-6">
      {faqs.map(({ q, a }, i) => (
        <div key={i} className="rounded-[16px] overflow-hidden border-2 bg-white" style={{ borderColor: INK }}>
          <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-sm" style={{ color: INK }}>
            {q}
            <ChevronRight className="w-4 h-4 transition-transform duration-200 shrink-0" style={{ color: BLUE, transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }} />
          </button>
          {open === i && <div className="px-5 pb-4 text-sm leading-relaxed pt-3" style={{ color: "#54514c", borderTop: "1px solid rgba(22,22,22,.1)" }}>{a}</div>}
        </div>
      ))}
    </div>
  )
}

/**
 * Source attribution. Used wherever a page states a regulation or a figure, so
 * the reader can check it and we can tell primary sources from dated secondary
 * ones.
 */
export function Cite({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-4 text-xs leading-relaxed pl-4 py-1" style={{ color: "#8a857e", borderLeft: `3px solid ${AMBER}` }}>
      {children}
    </p>
  )
}

/** Prominent caveat. For content where acting on stale information has a real cost. */
export function Caution({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-[16px] border-2 p-5" style={{ borderColor: INK, background: "#fff7ed", boxShadow: `5px 5px 0 ${AMBER}` }}>
      <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{children}</p>
    </div>
  )
}
