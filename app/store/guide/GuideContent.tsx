"use client"

import { Package, ScanLine, RefreshCw, BarChart3, Truck, ChevronRight, ScanBarcode, Camera } from "lucide-react"

type BodyItem =
  | string
  | { type: "tip"; icon: React.ComponentType<{ className?: string }>; label: string; text: string }

const SECTIONS: { icon: React.ComponentType<{ className?: string }>; title: string; body: BodyItem[] }[] = [
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
      "Open the POS screen. Products are shown in a grid filtered by category. Tap a product to add it to the cart. You can also type a quantity directly or use the + and − buttons — useful for large quantities.",
      "Apply a discount in the Discount field if needed. Select the payment method: Cash, GCash, Maya, Bank, or Other. For cash payments, enter the amount tendered and the change is calculated automatically.",
      "Tap Checkout. The sale is recorded, stock is deducted from inventory, and a receipt modal pops up with the sale summary, total, and change amount.",
    ],
  },
  {
    icon: RefreshCw,
    title: "4. Adjust stock manually",
    body: [
      "Open any product and use the Adjust Stock button to log a RESTOCK (adding stock from a supplier delivery) or an ADJUSTMENT (correcting a discrepancy, writing off spoilage, etc.).",
      "Enter the quantity, choose the type, add a reason, and save. All stock movements are logged so you have a full audit trail and can see how stock levels changed over time.",
    ],
  },
  {
    icon: BarChart3,
    title: "5. Track sales and analytics",
    body: [
      "The Dashboard shows today's total revenue, number of sales, and any products currently below their reorder threshold. Hit Refresh any time to pull the latest numbers.",
      "The Analytics page shows a 7-day revenue trend line chart, a horizontal bar chart of your top-selling products by quantity, and a pie chart breaking down sales by payment method.",
      "Plan Usage shows how many products and sales you've used against your plan's limits — useful if you're on the Free plan and approaching your cap.",
    ],
  },
]

export default function GuideContent() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAV */}
      <nav className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <a href="/store" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="w-7 h-7 rounded-lg object-cover" />
          <span className="font-bold text-slate-800 tracking-tight">Smapey Store</span>
        </a>
        <div className="flex items-center gap-4 text-sm">
          <a href="/store" className="text-slate-500 hover:text-slate-800 transition">← Back to overview</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=STORE&plan=FREE`}
            className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition shadow-sm shadow-violet-600/20">
            Start free
          </a>
        </div>
      </nav>

      {/* HERO */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-500 px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-violet-100 text-sm font-semibold uppercase tracking-widest mb-3">Step-by-step guide</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            How to use Smapey Inventory & POS Manager
          </h1>
          <p className="text-violet-50/80 text-lg">
            Add products, manage stock, ring up sales, and track daily revenue — this guide walks through every step.
          </p>
        </div>
      </div>

      {/* SECTIONS */}
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-16">
        {SECTIONS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-100 bg-violet-50/40">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-purple-500 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">{title}</h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              {body.map((item, i) =>
                typeof item === "string" ? (
                  <p key={i} className="text-slate-600 text-sm leading-relaxed">{item}</p>
                ) : (
                  <div key={i} className="flex gap-3 p-4 rounded-xl bg-violet-50 border border-violet-100">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-purple-500 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-violet-700 mb-1">{item.label}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-500 px-6 py-16 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-4">Ready to take control of your store?</h2>
          <p className="text-violet-100/80 mb-8">Free forever. No card needed. Set up your first product in minutes.</p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=STORE&plan=FREE`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-violet-50 text-violet-700 font-semibold transition shadow-lg">
            Start free <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <footer className="bg-slate-900 px-6 py-6 text-center text-slate-500 text-xs">
        © {new Date().getFullYear()} Smapey · <a href="/store" className="hover:text-slate-300 transition">Store Manager</a> · <a href="/privacy-policy" className="hover:text-slate-300 transition">Privacy</a>
      </footer>
    </div>
  )
}
