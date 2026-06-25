"use client"

import { useState, useEffect } from "react"
import GymVideoSection from "../GymVideoSection"
import {
  UserPlus, QrCode, UserCheck, CreditCard, Dumbbell, BarChart3,
  ChevronRight, Zap, BookOpen, ArrowLeft, SlidersHorizontal,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"

// ── Layered Pop design tokens ──
const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

//////////////////////////////////////////////////////
// DATA
//////////////////////////////////////////////////////
const GUIDES = [
  {
    id: "add-member",
    icon: UserPlus,
    title: "Add Your First Member",
    badge: "Getting Started",
    description:
      "Learn how to register a new gym member, assign a subscription plan, and generate their QR check-in code.",
    steps: [
      { title: "Open the Members tab", detail: "From your gym dashboard sidebar, click Members. This shows a list of all your registered members with their status and plan." },
      { title: 'Click "Add Member"', detail: "Hit the Add Member button in the top-right corner. A registration modal will open with all the required fields." },
      { title: "Fill in member details", detail: "Enter the member's full name, phone number, email (optional), and emergency contact information." },
      { title: "Add a photo (optional)", detail: "In the Photo section at the top of the form, upload a picture from your device or click Take Photo to capture one with your computer or phone camera." },
      { title: "Save the member", detail: "Click Create Member. A unique QR code is automatically generated and attached to this member's profile — no extra steps required." },
      { title: "Subscribe them to a plan", detail: "From the gym dashboard's Members Overview, click Subscribe next to the new member and pick one of your plans — the membership starts immediately." },
    ],
    tip: "If you enter the member's email address, they automatically receive a welcome email with their check-in QR code attached. You can also view and download it anytime from the member's profile.",
  },
  {
    id: "qr-check-in",
    icon: QrCode,
    title: "Enable QR Code Check-in",
    badge: "All Plans",
    description:
      "Set up contactless QR code check-in for your members. Available on every plan, including FREE.",
    steps: [
      { title: "Get each member's QR code", detail: "Every member gets a unique QR code automatically when registered. Open the Members page, click View on a member, and use the Download button in the QR Code section. Members with an email address also receive it automatically in their welcome email." },
      { title: "Share the QR code with the member", detail: "Members can save it to their phone's photos or you can print a copy for their membership card." },
      { title: "Open the QR scanner", detail: "On the gym dashboard, click the green Scan QR card — the camera scanner opens instantly. Keep it open on a tablet or front-desk monitor as your check-in station." },
      { title: "Members scan to check in", detail: "When a member holds their QR code in front of the camera, the system logs their check-in instantly with a precise timestamp." },
    ],
    tip: "Place a tablet near the gym entrance and keep the Check-in page open in full-screen for a smooth, queue-free member flow.",
  },
  {
    id: "walk-ins",
    icon: UserCheck,
    title: "Record Walk-in Visits",
    badge: "All Plans",
    description:
      "Record one-day visitors quickly without creating a full membership. Track walk-in revenue and monitor your monthly quota.",
    steps: [
      { title: "Open the Walk-in form", detail: "On the gym dashboard, click the orange Walk-in card. A small form opens for recording the visit." },
      { title: "Enter visitor details", detail: "Type the visitor's name. You can optionally add a phone number for follow-up marketing." },
      { title: "Select a walk-in plan", detail: "Choose from your walk-in plans (created on the Plans page with the \"Walk-in Plan\" option checked). The fee is automatically recorded." },
      { title: "Confirm the walk-in", detail: "Click Confirm Walk-in. The visitor is logged, charged the plan fee, checked in automatically, and counted toward your monthly walk-in quota." },
    ],
    tip: "Your walk-in quota resets on the 1st of every month. Check your current usage vs. limit in the Analytics insight cards.",
  },
  {
    id: "subscriptions",
    icon: CreditCard,
    title: "Manage Subscriptions & Plans",
    badge: "All Plans",
    description:
      "Create flexible membership plans, assign them to members, and handle renewals when subscriptions expire.",
    steps: [
      { title: "Choose a plan type: By Days or By Sessions", detail: "When creating a plan, select how it expires. \"By Days\" plans expire after a set number of calendar days (e.g. 30-day monthly). \"By Sessions\" plans expire after a set number of check-ins regardless of how many days pass — perfect for punch-card style memberships like \"10 visits\"." },
      { title: "Create a plan", detail: "Go to Plans → click Add Plan. Select the plan type (By Days or By Sessions), set a name, the number of days or sessions, and the price. Walk-in plans are only available for day-based plans." },
      { title: "Assign a plan to a member", detail: "From the Members Overview, click Subscribe next to a member. Select a plan from the dropdown — the subscription starts from today, and the modal previews the expiry date (day plans) or the number of check-ins included (session plans)." },
      { title: "Correct usage after subscribing (optional)", detail: "If a member started using their plan before you set up the app, subscribe them first, then fix their used days or sessions with the Adjustment button — see the \"Adjust a Subscription\" section below for the full walkthrough." },
      { title: "Monitor expiring memberships", detail: "Session-based plans show sessions used vs. total directly on the member row. When a membership runs out on the day a member checked in (e.g. their last session), the row shows a yellow \"will expire tomorrow\" badge — it turns red \"expired\" with a Renew button the next day. You can also review a member's full subscription history anytime from the Members page via View." },
      { title: "Renew with one click", detail: "From a member's row, click Renew when a subscription has expired. Pick a plan and confirm — the new subscription starts immediately. If you need to correct already used days or sessions, use the Adjustment button after renewing." },
    ],
    tip: "Use \"By Sessions\" plans for punch-card style memberships where members buy a block of visits and use them at their own pace. Use \"By Days\" for standard time-based memberships. When migrating existing members into the app, subscribe them first and then fix their used days or sessions with the Adjustment button.",
  },
  {
    id: "adjustment",
    icon: SlidersHorizontal,
    title: "Adjust a Subscription",
    badge: "All Plans",
    description:
      "Correct how many days or sessions a member has already used — perfect for migrating existing members into the app or fixing front-desk mistakes.",
    steps: [
      { title: "Find the member's subscription", detail: "Open the Members Overview on your dashboard. In the Subscription column, every active membership shows its plan name, expiry or sessions used, and a status badge." },
      { title: "Click the Adjustment button", detail: "Next to the status badge you'll see an Adjustment button. It only appears on active subscriptions — expired memberships and walk-in passes can't be adjusted. On mobile, the button is in the member card's action row." },
      { title: "Enter the days or sessions already used", detail: "The modal adapts to the plan type. For day-based plans, enter the days consumed — the expiry is recalculated from the subscription's start date (e.g. 8 days used on a 12-day plan = 4 days remaining). For session-based plans, set the sessions used (e.g. 3 used on a 10-session plan = 7 remaining)." },
      { title: "Check the live preview", detail: "Before saving, the modal shows the new expiry date or remaining sessions. If the adjustment uses up the entire plan, it warns that the subscription will be marked expired." },
      { title: "Save the adjustment", detail: "Click Save Adjustment. The subscription updates instantly — the member row, dashboard stats, and check-in eligibility all reflect the corrected usage right away." },
    ],
    tip: "Migrating from a paper logbook or spreadsheet? Subscribe each member to their current plan first, then use the Adjustment button to set how much of it they've already used.",
  },
  {
    id: "trainers",
    icon: Dumbbell,
    title: "Assign Trainers to Members",
    badge: "All Plans",
    description:
      "Add your gym's trainers, track their specialties and contact details, and assign them to specific members.",
    steps: [
      { title: "Add a trainer", detail: 'Go to Trainers → Add Trainer. Fill in their name, specialty (e.g. "Strength & Conditioning"), and contact number. You can also add a photo — upload one or take it with the camera.' },
      { title: "Set the trainer as active", detail: "Only active trainers appear in the assignment dropdown. Toggle a trainer's status with the power button on their card." },
      { title: "Assign to a member", detail: "In the Members Overview on your dashboard, click the member's Trainer column — or the red \"Assign trainer\" link if they don't have one yet — and pick from the active trainers list." },
      { title: "Update or reassign", detail: "You can change a member's trainer at any time by clicking the trainer's name in the same column. The new assignment takes effect immediately." },
    ],
    tip: "Specialty tags on trainer profiles help you quickly match the right trainer to each member's fitness goal.",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Read Your Analytics",
    badge: "All Plans",
    description:
      "Understand your gym's performance through revenue charts, attendance trends, and real-time usage insight cards.",
    steps: [
      { title: "Open the Analytics page", detail: "From the gym sidebar, open Analytics. It loads your latest numbers automatically every time you visit." },
      { title: "Read the Revenue chart", detail: "The area chart shows daily revenue over the last 7 days from both subscriptions and walk-ins. Hover over a point to see exact figures." },
      { title: "Read the Attendance and Member Growth charts", detail: "Two bar charts track daily check-ins and new member sign-ups over the last 7 days. Spikes show your busiest days." },
      { title: "Check the insight cards", detail: "Four insight cards show: Revenue Growth (yesterday vs. today), Peak Hour, Members used vs. plan limit, and Walk-ins used vs. monthly limit." },
    ],
    tip: "If the Members or Walk-ins insight card turns red, you've hit your plan's limit. Upgrade to increase your capacity.",
  },
]

// Alternating accent per guide (blue / amber)
const accentFor = (i: number) => (i % 2 === 0 ? BLUE : AMBER)
const onAccent = (c: string) => (c === AMBER ? INK : "#fff")

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

//////////////////////////////////////////////////////
// HERO
//////////////////////////////////////////////////////
function Hero() {
  return (
    <section className="relative overflow-hidden pt-16" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
        <div className="absolute rounded-[22px] border-2" style={{ top: "30%", right: "-70px", width: 280, height: 78, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 pt-12 pb-14">
        <a href="/gym" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mb-8 hover:opacity-60" style={{ color: "#54514c" }}>
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to GymOS
        </a>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
          <BookOpen className="w-3 h-3" />
          User Guide
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
          GymOS Documentation
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed" style={{ color: "#54514c" }}>
          Everything you need to run your gym on Smapey — from registering your first member to reading your monthly analytics.
        </p>

        <div className="flex flex-wrap gap-2.5 mt-8">
          {GUIDES.map((g, i) => {
            const Icon = g.icon
            const c = accentFor(i)
            return (
              <a key={g.id} href={`#${g.id}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border-2 text-xs font-bold transition-transform hover:-translate-y-0.5" style={{ color: INK, borderColor: INK }}>
                <span className="w-4 h-4 rounded-[5px] border flex items-center justify-center" style={{ background: c, borderColor: INK }}>
                  <Icon className="w-2.5 h-2.5" style={{ color: onAccent(c) }} />
                </span>
                {g.title}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// STICKY SIDEBAR (TOC)
//////////////////////////////////////////////////////
function Sidebar() {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    )
    GUIDES.forEach((g) => {
      const el = document.getElementById(g.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <aside className="hidden lg:block w-60 shrink-0">
      <div className="sticky top-24">
        <p className="text-xs font-bold uppercase tracking-widest mb-4 px-3" style={{ color: "#9a948b" }}>
          On this page
        </p>
        <nav className="flex flex-col gap-1.5">
          {GUIDES.map((g, i) => {
            const Icon = g.icon
            const isActive = activeId === g.id
            const c = accentFor(i)
            return (
              <a key={g.id} href={`#${g.id}`} onClick={() => setActiveId(g.id)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-[12px] text-sm transition-all duration-200 border-2"
                style={isActive
                  ? { background: INK, color: "#fff", borderColor: INK, fontWeight: 700 }
                  : { background: "transparent", color: "#54514c", borderColor: "transparent", fontWeight: 600 }}>
                <span className="w-6 h-6 rounded-[7px] border flex items-center justify-center shrink-0" style={{ background: c, borderColor: INK }}>
                  <Icon className="w-3 h-3" style={{ color: onAccent(c) }} />
                </span>
                <span className="leading-snug">{g.title}</span>
              </a>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

//////////////////////////////////////////////////////
// GUIDE CARD
//////////////////////////////////////////////////////
function GuideCard({ guide, index }: { guide: (typeof GUIDES)[0]; index: number }) {
  const Icon = guide.icon
  const c = accentFor(index)

  return (
    <div id={guide.id} className="mb-16 scroll-mt-24">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-[14px] border-2 flex items-center justify-center shrink-0" style={{ background: c, borderColor: INK }}>
          <Icon className="w-6 h-6" style={{ color: onAccent(c) }} />
        </div>
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border-2 text-xs font-bold mb-2" style={{ background: "#fff", color: INK, borderColor: INK }}>
            {guide.badge}
          </span>
          <h2 className="text-xl font-extrabold" style={{ color: INK }}>{guide.title}</h2>
          <p className="text-sm mt-1 leading-relaxed" style={{ color: "#54514c" }}>{guide.description}</p>
        </div>
      </div>

      <div className="rounded-[20px] border-2 overflow-hidden" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>
        {guide.steps.map((step, i) => (
          <div key={i} className="flex gap-4 p-5" style={i < guide.steps.length - 1 ? { borderBottom: "1px solid rgba(22,22,22,.1)" } : undefined}>
            <span className="w-7 h-7 rounded-full border-2 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5" style={{ background: c, color: onAccent(c), borderColor: INK }}>
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-bold mb-1" style={{ color: INK }}>{step.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{step.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {guide.tip && (
        <div className="mt-4 flex items-start gap-3 px-4 py-3.5 rounded-[14px] border-2" style={{ background: "#fff7e8", borderColor: INK }}>
          <Zap className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#b06c00" }} />
          <p className="text-sm leading-relaxed" style={{ color: "#5c4a28" }}>
            <span className="font-bold">Tip: </span>
            {guide.tip}
          </p>
        </div>
      )}
    </div>
  )
}

//////////////////////////////////////////////////////
// CTA
//////////////////////////////////////////////////////
function CTA() {
  return (
    <section className="py-16 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[28px] border-2 p-10 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
          <div>
            <h3 className="text-2xl font-extrabold mb-2" style={{ color: INK }}>Ready to get started?</h3>
            <p className="text-sm font-medium" style={{ color: "#5c4a28" }}>Sign up free — no credit card required. Cancel anytime.</p>
          </div>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5 shrink-0" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
            Create your gym for free
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// FOOTER
//////////////////////////////////////////////////////
function Footer() {
  return (
    <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="GymOS" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-sm font-extrabold" style={{ color: INK }}>GymOS by Smapey</span>
        </div>
        <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </div>
    </footer>
  )
}

//////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////
export default function GymGuideContent() {
  useFont()
  return (
    <main>
      <Hero />

      <section className="py-16" style={{ background: CREAM }}>
        <div className="max-w-6xl mx-auto px-6 flex gap-12">
          <Sidebar />
          <div className="flex-1 min-w-0">
            {GUIDES.map((guide, i) => (
              <GuideCard key={guide.id} guide={guide} index={i} />
            ))}
          </div>
        </div>
      </section>

      <GymVideoSection />
      <CTA />
      <InternalLinks cluster="gym" currentPath="/gym/guide" />
      <Footer />
    </main>
  )
}
