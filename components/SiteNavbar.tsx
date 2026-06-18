"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ArrowRight } from "lucide-react"
import {
  FileText, Dumbbell, BookOpen, CalendarDays, Car, Shirt, Scissors,
} from "lucide-react"

const PRODUCTS = [
  { key: "INVOICE",    name: "Invoice Manager",        href: "/invoice",     accent: "#2563eb", accentLight: "#eff6ff", Icon: FileText   },
  { key: "GYM",        name: "Gym Management",         href: "/gym",         accent: "#f59e0b", accentLight: "#fef3c7", Icon: Dumbbell   },
  { key: "ESSAY",      name: "Essay Feedback",         href: "/essay",       accent: "#7c3aed", accentLight: "#f5f3ff", Icon: BookOpen   },
  { key: "BOOKING",    name: "Booking & Appointments", href: "/booking",     accent: "#0d9488", accentLight: "#f0fdfa", Icon: CalendarDays },
  { key: "CAR_RENTAL", name: "Car Rental",             href: "/car-rental",  accent: "#ea580c", accentLight: "#fff7ed", Icon: Car        },
  { key: "LAUNDRY",    name: "Laundry Shop",           href: "/laundry",     accent: "#0284c7", accentLight: "#f0f9ff", Icon: Shirt      },
  { key: "SALON",      name: "Salon Manager",          href: "/salon",       accent: "#ec4899", accentLight: "#fdf2f8", Icon: Scissors   },
]

interface Props {
  /** Force the navbar to always appear as the "scrolled" (white) state */
  alwaysLight?: boolean
}

export default function SiteNavbar({ alwaysLight = false }: Props) {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (alwaysLight) { setScrolled(true); return }
    const fn = () => setScrolled(window.scrollY > 20)
    fn()
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [alwaysLight])

  const light = scrolled || alwaysLight

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${light ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="h-8 w-8 object-contain" />
          <span className={`text-lg font-bold tracking-tight transition-colors ${light ? "text-gray-900" : "text-white"}`}>Smapey</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {([["/#products", "Products"], ["/#how-it-works", "How it works"], ["/#why", "Why Smapey"]] as const).map(([href, label]) => (
            <Link key={label} href={href} className={`text-sm font-medium transition-colors ${light ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"}`}>
              {label}
            </Link>
          ))}
          <Link href="/affiliate" className={`text-sm font-medium transition-colors ${light ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"}`}>
            Affiliate
          </Link>
          <Link href="/blog" className={`text-sm font-medium transition-colors ${light ? "text-blue-600 hover:text-blue-700" : "text-white/80 hover:text-white"}`}>
            Blog
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="https://app.smapey.com/login" className={`text-sm font-medium transition-colors ${light ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"}`}>
            Sign in
          </Link>
          <Link href="https://app.smapey.com/register" className="bg-white text-gray-900 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors shadow-sm border border-gray-200">
            Get started free
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className={`md:hidden ${light ? "text-gray-700" : "text-white"}`}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 space-y-4 shadow-lg">
          {PRODUCTS.map(p => (
            <Link key={p.key} href={p.href} onClick={() => setOpen(false)} className="flex items-center gap-3 py-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: p.accentLight }}>
                <p.Icon className="w-4 h-4" style={{ color: p.accent }} />
              </div>
              <span className="text-sm font-medium text-gray-800">{p.name}</span>
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link href="/affiliate" onClick={() => setOpen(false)} className="text-center text-sm font-semibold text-gray-700 py-2.5 hover:text-gray-900 transition-colors">Affiliate Program</Link>
            <Link href="/blog" onClick={() => setOpen(false)} className="text-center text-sm font-semibold text-blue-600 py-2.5 hover:text-blue-700 transition-colors">Blog</Link>
            <Link href="https://app.smapey.com/login" onClick={() => setOpen(false)} className="text-center text-sm font-medium text-gray-600 py-2.5 border border-gray-200 rounded-full">Sign in</Link>
            <Link href="https://app.smapey.com/register" className="text-center text-sm font-semibold text-white py-2.5 bg-gray-900 rounded-full">Get started free</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
