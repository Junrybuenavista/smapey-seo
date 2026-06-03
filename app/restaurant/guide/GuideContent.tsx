"use client"

import { UtensilsCrossed, ShoppingBag, ChefHat, BarChart3, ClipboardList, ChevronRight, QrCode, Banknote } from "lucide-react"

const SECTIONS = [
  {
    icon: UtensilsCrossed,
    title: "1. Build your menu",
    body: [
      "Open Menu in the dashboard and start with Categories — Appetizers, Mains, Drinks, Desserts, or whatever fits your operation. Categories keep your menu organized and make order-taking faster.",
      "Inside each category, click Add Item. Give it a name, a description, a price, and optionally upload a photo. Photos help staff identify items quickly, especially in a busy kitchen.",
      "Toggle any item Available or Unavailable at any time. Marking an item unavailable removes it from the order-entry screen instantly — useful for items that are sold out mid-service.",
    ],
  },
  {
    icon: QrCode,
    title: "2. Turn on QR table ordering",
    body: [
      "Open QR Ordering in the dashboard and toggle ordering on. Print one QR code per table — Smapey generates a unique code that links to your live menu. If you've enabled GCash, each printed card also includes your GCash QR, so customers can order and pay from the same card on the table.",
      "When a customer scans the QR with their phone camera, your menu opens in their browser — no app to download and no login required. They pick items, add notes, enter their name, and place the order themselves.",
      "The order lands in your Orders queue instantly as Pending, with the table number attached. New orders appear automatically and notify your staff, so nobody has to keep refreshing the screen.",
    ],
  },
  {
    icon: ShoppingBag,
    title: "3. Place an order yourself (optional)",
    body: [
      "You can still take orders for customers from the dashboard. Open Orders and click New Order. Choose Dine-in and enter a table number, or choose Takeaway and enter the customer's name.",
      "Browse your menu by category, add items to the cart, adjust quantities, and add notes for any item or for the whole order. The order total updates as you add items.",
      "Click Place Order. The order is created with status Pending and an auto-generated order number (#001, #002, …) so the kitchen and counter always share the same reference.",
    ],
  },
  {
    icon: ChefHat,
    title: "4. Manage the kitchen queue",
    body: [
      "Every new order appears in the queue as Pending. When the kitchen starts on it, open the order and tap Start Preparing — the status moves to Preparing.",
      "When the food is ready, tap Mark Ready. The status changes to Ready, signalling front-of-house that the order can be picked up or served.",
      "Once the order is handed to the customer, tap Complete. The order moves to Completed and is removed from the active queue. Orders in Pending or Preparing can be Cancelled if needed.",
      "Customers who ordered by QR see this progress live on their phone — Order received, Being prepared, Ready to serve — so they're not constantly asking your staff if the food is ready.",
    ],
  },
  {
    icon: Banknote,
    title: "5. Set up GCash payments",
    body: [
      "Open QR Ordering and find the GCash section. Turn it on, then enter your GCash name and number and upload your personal GCash QR code image. This connects your own wallet — no payment gateway, no monthly fees, and no KYC paperwork.",
      "Easiest setup — print both QRs on the table card. With GCash turned on, the Print all button on the QR Ordering page produces a table card that includes your GCash QR right below the table's ordering QR. Place one on every table so customers can open GCash, tap Scan QR, and scan the printed code directly — no screenshots, no saving to Photos, no switching apps. The exact total to pay is shown on their order screen.",
      "If you'd rather not print it, your GCash QR also appears on the customer's phone after they order. They can press and hold to save it to their Photos, then open GCash → Scan QR → upload from gallery — or simply copy your number to send money. Either way, the exact order total is shown so they know how much to pay.",
      "Once they've sent payment, the customer taps \"I've paid via GCash.\" This does not auto-mark the order paid — it sends your staff a notification to confirm. Your team verifies the money arrived before marking it paid, so you're always in control.",
    ],
  },
  {
    icon: ClipboardList,
    title: "6. Record payment",
    body: [
      "Open any order and tap Mark Paid. Choose the payment method — Cash, GCash, or Card — and confirm. If a customer submitted a GCash payment, the order shows a \"GCash · says paid\" flag and the button reads Confirm GCash Paid — just verify the money landed and confirm.",
      "You can mark an order as paid at any point: while it's Pending, Preparing, Ready, or Completed. Payment status is visible on the orders list so nothing slips through at the end of a shift.",
    ],
  },
  {
    icon: BarChart3,
    title: "7. Track your sales and analytics",
    body: [
      "The Dashboard shows today's revenue, total orders, and a live breakdown of Pending, Preparing, Ready, and Completed orders. Hit Refresh at any time to pull the latest numbers.",
      "The Analytics page shows a 7-day revenue trend line, a breakdown of Dine-in vs. Takeaway orders, and a bar chart of your top-selling items by order count.",
      "Plan Usage shows how many menu items and orders you've used against your plan's limits — useful if you're on the Free plan and approaching the cap.",
    ],
  },
]

export default function GuideContent() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAV */}
      <nav className="bg-white border-b border-slate-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/restaurant" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Smapey" className="w-7 h-7 rounded-lg object-cover" />
            <span className="font-bold text-slate-800 tracking-tight">Smapey Food</span>
          </a>
          <div className="flex items-center gap-4 text-sm">
            <a href="/restaurant" className="text-slate-500 hover:text-slate-800 transition">← Back to overview</a>
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=RESTAURANT&plan=FREE`}
              className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-semibold transition shadow-sm shadow-orange-500/20">
              Start free
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-orange-100 text-sm font-semibold uppercase tracking-widest mb-3">Step-by-step guide</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            How to use Smapey Food Ordering Manager
          </h1>
          <p className="text-orange-50/80 text-lg">
            Build your menu, let customers order and pay by GCash from a table QR code, manage your kitchen queue, and track daily sales — this guide walks through every step.
          </p>
        </div>
      </div>

      {/* SECTIONS */}
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-16">
        {SECTIONS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-100 bg-orange-50/40">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">{title}</h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              {body.map((para, i) => (
                <p key={i} className="text-slate-600 text-sm leading-relaxed">{para}</p>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 p-8 text-center shadow-lg shadow-orange-500/20">
          <h2 className="text-2xl font-extrabold text-white mb-2">Ready to take your first order?</h2>
          <p className="text-orange-50/80 mb-6">Free forever. No card required. Your menu will be live in minutes.</p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=RESTAURANT&plan=FREE`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-orange-600 font-semibold text-sm hover:bg-orange-50 transition shadow-sm">
            Get started free <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* INTERNAL LINKS */}
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">More resources</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: "/restaurant/food-ordering-system", label: "Food Order Management System" },
              { href: "/restaurant/online-ordering-system", label: "Online Ordering System" },
              { href: "/restaurant/restaurant-pos-system", label: "Restaurant POS System" },
              { href: "/restaurant/restaurant-management-software", label: "Restaurant Management Software" },
              { href: "/restaurant/free-restaurant-management-software", label: "Free Restaurant Management Software" },
            ].map(link => (
              <a key={link.href} href={link.href}
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50 transition text-sm text-slate-600 hover:text-orange-700 font-medium group">
                {link.label}
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-orange-400 transition" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
