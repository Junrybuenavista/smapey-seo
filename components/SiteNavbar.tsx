"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

// ── Layered Pop design tokens ──
const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

type NavLink = { href: string; label: string; match?: string }

const LINKS: NavLink[] = [
  { href: "/#products", label: "Products" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#why", label: "Why Smapey" },
  { href: "/affiliate", label: "Affiliate", match: "/affiliate" },
  { href: "/blog", label: "Blog", match: "/blog" },
]

export default function SiteNavbar({ alwaysLight = false }: { alwaysLight?: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname() || "/"

  // alwaysLight is accepted for compatibility with existing call sites.
  // The Layered Pop navbar is always a solid light bar, so it needs no theme switch.
  void alwaysLight

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

  const isActive = (link: NavLink) => !!link.match && pathname.startsWith(link.match)

  const linkStyle = (on: boolean): React.CSSProperties => ({
    color: on ? BLUE : INK,
    borderBottom: `4px solid ${on ? AMBER : "transparent"}`,
    paddingBottom: "3px",
  })

  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="h-8 w-8 object-contain" />
          <span className="text-xl font-extrabold tracking-tight" style={{ color: INK }}>Smapey</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold hover:opacity-60 transition-opacity"
              style={linkStyle(isActive(link))}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="https://app.smapey.com/login" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Sign in</Link>
          <Link href="https://app.smapey.com/register" className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>
            Get started free
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }} aria-label="Toggle menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 py-5 space-y-3" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          {LINKS.map(link => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-bold py-2"
              style={linkStyle(isActive(link))}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2" style={{ borderTop: `2px solid ${INK}` }}>
            <Link href="https://app.smapey.com/login" className="text-center text-sm font-semibold py-2.5 rounded-full border-2" style={{ color: INK, borderColor: INK }}>Sign in</Link>
            <Link href="https://app.smapey.com/register" className="text-center text-sm font-bold py-2.5 rounded-full border-2" style={{ background: AMBER, color: INK, borderColor: INK }}>Get started free</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
