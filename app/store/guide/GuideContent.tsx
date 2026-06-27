"use client"

import { useState, useEffect, useRef } from "react"
import { Package, ScanLine, RefreshCw, BarChart3, Truck, ChevronRight, ScanBarcode, Camera, QrCode, TrendingUp, Menu, X, ArrowLeft, BookOpen } from "lucide-react"
import InternalLinks from "@/components/InternalLinks"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=STORE&plan=FREE`

type BodyItem =
  | string
  | { type: "tip"; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; label: string; text: string }

const SECTIONS: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; title: string; body: BodyItem[] }[] = [
  {
    icon: Package,
    title: "1. Add your products",
    body: [
      "Open Products in the dashboard and start with Categories — Beverages, Snacks, Household, Cleaning Supplies, or whatever fits your store. Categories keep your catalog organized and make it faster to find products at the POS.",
      "Inside each category, click Add Product. Give it a name, SKU (optional), selling price, cost price, and initial stock quantity. Set a reorder threshold — when stock drops to or below this number, a low stock alert will appear on your dashboard.",
      {
        type: "tip",
        icon: ScanBarcode,
        label: "Scan the barcode with your camera",
        text: "Tap the scan icon next to the Barcode field. Your phone's back camera opens — point it at the barcode on the product packaging and the number fills in automatically. Supports EAN-13, EAN-8, UPC-A, Code 128, Code 39, and more. You can still type the barcode manually if you prefer.",
      },
      {
        type: "tip",
        icon: Camera,
        label: "Take the product photo with your camera",
        text: "Tap Take Photo to open your phone's camera directly inside the app — no need to save an image to your gallery first. Frame the product, tap the white shutter button to capture, and it's set instantly. Use the flip button to switch between front and back cameras. Or tap Upload Photo to pick an existing image from your gallery.",
      },
    ],
  },
  {
    icon: Truck,
    title: "2. Set up suppliers",
    body: [
      "Open the Suppliers tab inside Products and add your regular suppliers — name, contact person, phone number, email, and address. You can add notes for any special terms or details.",
      "When you create or edit a product, you can link it to a supplier. This means when a low stock alert fires, you can see immediately who to call or message to reorder.",
    ],
  },
  {
    icon: ScanLine,
    title: "3. Ring up a sale on POS",
    body: [
      "Open the POS screen. Products are shown in a grid filtered by category. Tap a product to add it to the cart — or tap the Scan button in the search bar to open your phone camera and scan any product barcode to add it instantly.",
      "Adjust quantities using the + / − buttons or type a number directly. Apply a discount in the Discount field if needed.",
      "Choose a payment method — Cash or QR:",
      {
        type: "tip",
        icon: ScanLine,
        label: "Cash payment",
        text: "Enter the amount the customer hands you. The change is calculated automatically. Tap Checkout to complete the sale.",
      },
      {
        type: "tip",
        icon: QrCode,
        label: "QR payment",
        text: "Tap Checkout and your QR code pops up full-screen showing the exact total. The customer scans it with GCash, Maya, or their bank app and sends the payment. Once paid, tap Payment Received — Complete Sale to record it.",
      },
    ],
  },
  {
    icon: QrCode,
    title: "4. Set up your QR code",
    body: [
      "Go to Store → QR Setup in the sidebar. Tap the upload area and choose a screenshot of your GCash, Maya, or bank QR code from your phone gallery.",
      "Once uploaded, your QR code is stored and will automatically appear at checkout whenever a customer chooses QR payment.",
      {
        type: "tip",
        icon: QrCode,
        label: "Where to get your QR code",
        text: "Open GCash → tap your profile photo → tap 'My QR Code' → screenshot it. For Maya, go to Profile → My QR. For a bank, check your mobile banking app under 'Receive Money' or 'My QR'. Screenshot or save that QR image, then upload it to Smapey QR Setup.",
      },
    ],
  },
  {
    icon: RefreshCw,
    title: "5. Adjust stock manually",
    body: [
      "Open any product and use the Adjust Stock button to log a RESTOCK (adding stock from a supplier delivery) or an ADJUSTMENT (correcting a discrepancy, writing off spoilage, etc.).",
      "Enter the quantity, choose the type, add a reason, and save. All stock movements are logged so you have a full audit trail and can see how stock levels changed over time.",
    ],
  },
  {
    icon: BarChart3,
    title: "6. Track sales, profit, and analytics",
    body: [
      "The Dashboard shows today's total revenue, profit, number of sales, and any products currently below their reorder threshold. Hit Refresh any time to pull the latest numbers.",
      {
        type: "tip",
        icon: TrendingUp,
        label: "Today's Profit on the dashboard",
        text: "Profit is calculated as your total revenue minus the cost of goods sold — using the cost price you entered for each product. It's recorded at the time of sale, so it stays accurate even if you change the cost price later. Products without a cost price set will not contribute to the profit total.",
      },
      "The Analytics page shows a 7-day revenue trend line chart, a horizontal bar chart of your top-selling products by quantity, and a pie chart breaking down sales by payment method.",
      "The Sales page shows every transaction with its total, profit, payment method, and status. Click View on any sale to see the full breakdown including per-item detail and total profit for that sale.",
      "Plan Usage shows how many products and sales you've used against your plan's limits — useful if you're on the Free plan and approaching your cap.",
    ],
  },
]

function useFont() {
  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link")
      l.id = id; l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])
}

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } }, { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{ transitionProperty: "opacity, transform", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)" }}>
      {children}
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: "/store#features", label: "Features" },
    { href: "/store#how-it-works", label: "How it Works" },
    { href: "/store#pricing", label: "Pricing" },
    { href: "/store#faq", label: "FAQ" },
    { href: "/store/guide", label: "Guide" },
  ]
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/store" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Store</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>{l.label}</a>))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={REGISTER_URL} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Get started</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold" style={{ color: INK }}>{l.label}</a>))}
          <a href={REGISTER_URL} className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Get started</a>
        </div>
      )}
    </nav>
  )
}

export default function GuideContent() {
  useFont()
  return (
    <main style={{ fontFamily: display.fontFamily }}>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-16" style={{ background: CREAM }}>
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2" style={{ top: "28%", right: "-70px", width: 280, height: 78, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 pt-12 pb-14 text-center">
          <a href="/store" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mb-8 hover:opacity-60" style={{ color: "#54514c" }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to overview
          </a>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <BookOpen className="w-3 h-3" /> Step-by-step guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
            How to use Smapey Inventory &amp; POS Manager
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#54514c" }}>
            Add products, scan barcodes, accept QR payments, and track daily profit — this guide walks through every step.
          </p>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="py-16" style={{ background: CREAM }}>
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          {SECTIONS.map(({ icon: Icon, title, body }, idx) => {
            const c = idx % 2 === 0 ? BLUE : AMBER
            return (
              <Animate key={title}>
                <div className="rounded-[20px] border-2 overflow-hidden" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>
                  <div className="flex items-center gap-4 px-6 py-5" style={{ borderBottom: `2px solid ${INK}`, background: CREAM }}>
                    <div className="w-10 h-10 rounded-[12px] border-2 flex items-center justify-center shrink-0" style={{ background: c, borderColor: INK }}>
                      <Icon className="w-5 h-5" style={{ color: c === AMBER ? INK : "#fff" }} />
                    </div>
                    <h2 className="text-lg font-extrabold" style={{ color: INK }}>{title}</h2>
                  </div>
                  <div className="px-6 py-5 space-y-4">
                    {body.map((item, i) =>
                      typeof item === "string" ? (
                        <p key={i} className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{item}</p>
                      ) : (
                        <div key={i} className="flex gap-3 p-4 rounded-[14px] border-2" style={{ background: "#fff7e8", borderColor: INK }}>
                          <div className="w-8 h-8 rounded-[10px] border-2 flex items-center justify-center shrink-0 mt-0.5" style={{ background: c, borderColor: INK }}>
                            <item.icon className="w-4 h-4" style={{ color: c === AMBER ? INK : "#fff" }} />
                          </div>
                          <div>
                            <p className="text-sm font-extrabold mb-1" style={{ color: INK }}>{item.label}</p>
                            <p className="text-sm leading-relaxed" style={{ color: "#5c4a28" }}>{item.text}</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </Animate>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[28px] border-2 p-10 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
            <div>
              <h3 className="text-2xl font-extrabold mb-2" style={{ color: INK }}>Ready to take control of your store?</h3>
              <p className="text-sm font-medium" style={{ color: "#5c4a28" }}>Free forever. No card needed. Set up your first product in minutes.</p>
            </div>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5 shrink-0" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
              Start free <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <InternalLinks cluster="store" currentPath="/store/guide" />

      <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-sm font-extrabold" style={{ color: INK }}>Store Manager by Smapey</span>
          </div>
          <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
