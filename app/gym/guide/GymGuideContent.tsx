"use client"

import { useState, useEffect } from "react"
import {
  UserPlus, QrCode, UserCheck, CreditCard, Dumbbell, BarChart3,
  ChevronRight, Zap, BookOpen, ArrowLeft,
} from "lucide-react"

//////////////////////////////////////////////////////
// DATA
//////////////////////////////////////////////////////
const GUIDES = [
  {
    id: "add-member",
    icon: UserPlus,
    title: "Add Your First Member",
    badge: "Getting Started",
    badgeColor: "bg-blue-50 text-blue-600 border border-blue-100",
    accentColor: "from-blue-600 to-blue-400",
    description:
      "Learn how to register a new gym member, assign a subscription plan, and generate their QR check-in code.",
    steps: [
      {
        title: "Open the Members tab",
        detail:
          "From your gym dashboard sidebar, click Members. This shows a list of all your registered members with their status and plan.",
      },
      {
        title: 'Click "Add Member"',
        detail:
          "Hit the Add Member button in the top-right corner. A registration modal will open with all the required fields.",
      },
      {
        title: "Fill in member details",
        detail:
          "Enter the member's full name, phone number, email (optional), and emergency contact information.",
      },
      {
        title: "Select a subscription plan",
        detail:
          "Choose from your existing plans. The membership start date defaults to today but can be adjusted.",
      },
      {
        title: "Save the member",
        detail:
          "Click Save. A unique QR code is automatically generated and attached to this member's profile — no extra steps required.",
      },
    ],
    tip: "You can view and download any member's QR code from their profile page under the \"QR Code\" tab.",
  },
  {
    id: "qr-check-in",
    icon: QrCode,
    title: "Enable QR Code Check-in",
    badge: "PRO / ENTERPRISE",
    badgeColor: "bg-amber-50 text-amber-600 border border-amber-100",
    accentColor: "from-amber-500 to-orange-400",
    description:
      "Set up contactless QR code check-in for your members. Available on PRO and ENTERPRISE plans only.",
    steps: [
      {
        title: "Upgrade your plan",
        detail:
          "Go to Settings → Billing and upgrade to PRO or ENTERPRISE. QR check-in is locked on the FREE plan.",
      },
      {
        title: "Share each member's QR code",
        detail:
          "Open a member's profile and click \"View QR Code\". Members can save it to their phone's photos or print a copy.",
      },
      {
        title: "Set up a check-in station",
        detail:
          "Open the Check-in page on a tablet or front-desk monitor. The page activates the device camera automatically.",
      },
      {
        title: "Members scan to check in",
        detail:
          "When a member holds their QR code in front of the camera, the system logs their check-in instantly with a precise timestamp.",
      },
    ],
    tip: "Place a tablet near the gym entrance and keep the Check-in page open in full-screen for a smooth, queue-free member flow.",
  },
  {
    id: "walk-ins",
    icon: UserCheck,
    title: "Record Walk-in Visits",
    badge: "All Plans",
    badgeColor: "bg-green-50 text-green-600 border border-green-100",
    accentColor: "from-blue-500 to-cyan-400",
    description:
      "Record one-day visitors quickly without creating a full membership. Track walk-in revenue and monitor your monthly quota.",
    steps: [
      {
        title: "Go to the Check-in page",
        detail:
          "From the sidebar, open Check-in and switch to the Walk-in tab at the top of the page.",
      },
      {
        title: "Enter visitor details",
        detail:
          "Type the visitor's name. You can optionally add a phone number for follow-up marketing.",
      },
      {
        title: "Select a walk-in plan",
        detail:
          "Choose from your walk-in plans (created under Plans → Walk-in Plans). The fee is automatically recorded.",
      },
      {
        title: "Submit the walk-in",
        detail:
          "Click Record Walk-in. The visit is logged and counted toward your monthly walk-in quota.",
      },
    ],
    tip: "Your walk-in quota resets on the 1st of every month. Check your current usage vs. limit in the Analytics insight cards.",
  },
  {
    id: "subscriptions",
    icon: CreditCard,
    title: "Manage Subscriptions & Plans",
    badge: "All Plans",
    badgeColor: "bg-green-50 text-green-600 border border-green-100",
    accentColor: "from-orange-500 to-amber-400",
    description:
      "Create flexible membership plans, assign them to members, and handle renewals when subscriptions expire.",
    steps: [
      {
        title: "Create a plan",
        detail:
          'Go to Plans → click Create Plan. Set a name (e.g. "Monthly"), duration in days, and price.',
      },
      {
        title: "Assign a plan to a member",
        detail:
          "From the Members Overview, click Subscribe next to a member. Select a plan from the dropdown — the subscription starts from today.",
      },
      {
        title: "Adjust for days already consumed (optional)",
        detail:
          "If a member started using a plan before you set up the app, enter how many days they've already used in the \"Days already consumed\" field. The system recalculates the expiry automatically — for example, 8 days used on a 12-day plan means 4 days remaining from today. The same field is available in the Renew modal.",
      },
      {
        title: "Monitor expiring memberships",
        detail:
          "Your dashboard automatically flags members whose subscriptions are nearing expiry or have already lapsed.",
      },
      {
        title: "Renew with one click",
        detail:
          "From a member's row, click Renew when a subscription has expired. Pick a plan and optionally adjust consumed days before confirming.",
      },
    ],
    tip: "Use the \"Days already consumed\" field when migrating existing members into the app — it prevents them from getting a full reset and keeps expiry dates accurate from day one.",
  },
  {
    id: "trainers",
    icon: Dumbbell,
    title: "Assign Trainers to Members",
    badge: "All Plans",
    badgeColor: "bg-green-50 text-green-600 border border-green-100",
    accentColor: "from-amber-600 to-yellow-400",
    description:
      "Add your gym's trainers, track their specialties and contact details, and assign them to specific members.",
    steps: [
      {
        title: "Add a trainer",
        detail:
          'Go to Trainers → Add Trainer. Fill in their name, specialty (e.g. "Strength & Conditioning"), and contact number.',
      },
      {
        title: "Set the trainer as active",
        detail:
          "Only active trainers appear in the assignment dropdown. Toggle a trainer's status from the trainer list.",
      },
      {
        title: "Assign to a member",
        detail:
          "Open a member's profile, scroll to the Trainer section, and click Assign Trainer. Pick from the active trainers list.",
      },
      {
        title: "Update or reassign",
        detail:
          "You can change a member's trainer at any time from their profile. The new assignment takes effect immediately.",
      },
    ],
    tip: "Specialty tags on trainer profiles help you quickly match the right trainer to each member's fitness goal.",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Read Your Analytics",
    badge: "All Plans",
    badgeColor: "bg-green-50 text-green-600 border border-green-100",
    accentColor: "from-blue-700 to-blue-500",
    description:
      "Understand your gym's performance through revenue charts, attendance trends, and real-time usage insight cards.",
    steps: [
      {
        title: "Open the Analytics card",
        detail:
          "The Analytics card appears at the top of your Gym Dashboard and loads automatically when you enter the gym module.",
      },
      {
        title: "Read the Revenue chart",
        detail:
          "The bar chart shows monthly revenue from both subscriptions and walk-ins. Hover over a bar to see exact figures.",
      },
      {
        title: "Read the Attendance chart",
        detail:
          "The area chart tracks daily check-ins over the past 30 days. Spikes indicate your busiest days.",
      },
      {
        title: "Check the insight cards",
        detail:
          "Four insight cards show: Revenue Growth, Peak Hour, Members used vs. plan limit, and Walk-ins used vs. monthly limit.",
      },
    ],
    tip: "If the Members or Walk-ins insight card turns red, you've hit your plan's limit. Upgrade to increase your capacity.",
  },
]

//////////////////////////////////////////////////////
// HERO
//////////////////////////////////////////////////////
function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#0a0f1e",
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Glows */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-20 -right-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-14">
        {/* Back link */}
        <a
          href="/gym"
          className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to GymOS
        </a>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-5">
          <BookOpen className="w-3 h-3" />
          User Guide
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
          GymOS Documentation
        </h1>
        <p className="text-white/50 max-w-2xl text-lg leading-relaxed">
          Everything you need to run your gym on Smapey — from registering your first member to reading your monthly analytics.
        </p>

        {/* Quick-jump chips */}
        <div className="flex flex-wrap gap-2 mt-8">
          {GUIDES.map((g) => {
            const Icon = g.icon
            return (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white text-xs font-medium transition-all"
              >
                <Icon className="w-3 h-3" />
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
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
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
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 px-3">
          On this page
        </p>
        <nav className="flex flex-col gap-1">
          {GUIDES.map((g) => {
            const Icon = g.icon
            const isActive = activeId === g.id
            return (
              <a
                key={g.id}
                href={`#${g.id}`}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-slate-900 text-white font-medium shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md bg-gradient-to-tr ${g.accentColor} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-3 h-3 text-white" />
                </div>
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
function GuideCard({ guide }: { guide: (typeof GUIDES)[0] }) {
  const Icon = guide.icon

  return (
    <div id={guide.id} className="mb-16 scroll-mt-24">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${guide.accentColor} flex items-center justify-center shrink-0 shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold mb-2 ${guide.badgeColor}`}
          >
            {guide.badge}
          </span>
          <h2 className="text-xl font-bold text-slate-800">{guide.title}</h2>
          <p className="text-slate-500 text-sm mt-1 leading-relaxed">{guide.description}</p>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
        {guide.steps.map((step, i) => (
          <div
            key={i}
            className={`flex gap-4 p-5 ${
              i < guide.steps.length - 1 ? "border-b border-slate-100" : ""
            }`}
          >
            <span
              className={`w-7 h-7 rounded-full bg-gradient-to-tr ${guide.accentColor} text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm`}
            >
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-800 mb-1">{step.title}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tip */}
      {guide.tip && (
        <div className="mt-4 flex items-start gap-3 px-4 py-3.5 rounded-xl bg-amber-50 border border-amber-100">
          <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700 leading-relaxed">
            <span className="font-semibold">Tip: </span>
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
    <section className="py-16 border-t border-slate-100 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-[#0a0f1e] p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle glow */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)" }}
          />
          <div className="relative">
            <h3 className="text-2xl font-extrabold text-white mb-2">Ready to get started?</h3>
            <p className="text-white/40 text-sm">Sign up free — no credit card required. Cancel anytime.</p>
          </div>
          <a
            href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`}
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-blue-500 hover:from-amber-300 hover:to-blue-400 text-white font-semibold text-sm transition-all shadow-xl shadow-blue-600/20 shrink-0"
          >
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
    <footer className="bg-[#060b16] border-t border-white/5 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="GymOS" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-white/60 text-sm font-semibold">GymOS by Smapey</span>
        </div>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </div>
    </footer>
  )
}

//////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////
export default function GymGuideContent() {
  return (
    <main>
      <Hero />

      {/* Main docs layout */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 flex gap-12">
          <Sidebar />
          <div className="flex-1 min-w-0">
            {GUIDES.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  )
}
