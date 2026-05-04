"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import {
  CalendarDays, Briefcase, Clock, UserCheck, CreditCard,
  CheckCircle2, ChevronRight, ArrowLeft, BarChart3, Bell,
  Users, Menu, X, BookOpen, Zap, Settings, AlertCircle,
  CircleDot, Check,
} from "lucide-react"

//////////////////////////////////////////////////////
// SECTIONS DATA
//////////////////////////////////////////////////////
const SECTIONS = [
  {
    id: "overview",
    label: "Overview",
    icon: BarChart3,
  },
  {
    id: "services",
    label: "Setting up Services",
    icon: Briefcase,
  },
  {
    id: "availability",
    label: "Defining Availability",
    icon: Clock,
  },
  {
    id: "appointments",
    label: "Creating Appointments",
    icon: CalendarDays,
  },
  {
    id: "managing",
    label: "Managing Bookings",
    icon: CheckCircle2,
  },
  {
    id: "deposits",
    label: "Tracking Deposits",
    icon: CreditCard,
  },
  {
    id: "staff",
    label: "Staff Assignment",
    icon: UserCheck,
  },
  {
    id: "team",
    label: "Team & Roles",
    icon: Users,
  },
  {
    id: "dashboard",
    label: "Dashboard & Analytics",
    icon: BarChart3,
  },
  {
    id: "tips",
    label: "Tips & Best Practices",
    icon: Zap,
  },
]

//////////////////////////////////////////////////////
// SIDEBAR
//////////////////////////////////////////////////////
function Sidebar({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <aside className="w-64 shrink-0">
      <div className="sticky top-24">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 px-2">Contents</p>
        <nav className="flex flex-col gap-0.5">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-all ${
                active === id
                  ? "bg-teal-50 text-teal-700 font-semibold"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active === id ? "text-teal-500" : "text-slate-400"}`} />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}

//////////////////////////////////////////////////////
// STEP COMPONENT
//////////////////////////////////////////////////////
function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
          {n}
        </div>
        <div className="w-px flex-1 bg-slate-100 mt-2" />
      </div>
      <div className="pb-8">
        <p className="font-semibold text-slate-800 mb-1">{title}</p>
        <div className="text-sm text-slate-500 leading-relaxed space-y-2">{children}</div>
      </div>
    </div>
  )
}

//////////////////////////////////////////////////////
// TIP / NOTE COMPONENTS
//////////////////////////////////////////////////////
function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5 bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 text-sm text-teal-800 my-4">
      <Zap className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-sm text-amber-800 my-4">
      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mt-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
          <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function StatusBadge({ label, color }: { label: string; color: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${color}`}>
      <CircleDot className="w-3 h-3" />
      {label}
    </span>
  )
}

//////////////////////////////////////////////////////
// SECTION CONTENT
//////////////////////////////////////////////////////
const SECTION_CONTENT: Record<string, React.ReactNode> = {
  overview: (
    <div className="space-y-6">
      <p className="text-slate-600 leading-relaxed">
        Smapey Booking is an internal appointment management tool for service-based businesses — dental clinics, hair salons, massage studios, tutoring centers, and more. Your staff manages everything from the dashboard. Clients book by calling or walking in, and your team enters the appointment.
      </p>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Briefcase, title: "Services", desc: "Define what you offer with duration, price & capacity" },
          { icon: Clock, title: "Availability", desc: "Set open hours and assign staff to time slots" },
          { icon: CalendarDays, title: "Appointments", desc: "Book, confirm, track deposits & mark complete" },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center mb-3">
              <Icon className="w-4 h-4 text-white" />
            </div>
            <p className="font-semibold text-slate-800 text-sm">{title}</p>
            <p className="text-xs text-slate-500 mt-1">{desc}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="font-semibold text-slate-800 mb-3">Quick start flow</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm text-slate-600">
          {["Add services", "Set availability", "Book appointments", "Manage & complete"].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 font-medium">
                <span className="w-4 h-4 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                {step}
              </span>
              {i < arr.length - 1 && <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  services: (
    <div className="space-y-4">
      <p className="text-slate-600 leading-relaxed">
        Services are the foundation of your booking system. Before you can create any appointment, you need at least one active service.
      </p>

      <div className="space-y-0">
        <Step n={1} title="Go to Services">
          <p>From the sidebar, click <strong>Services</strong> under the Booking section.</p>
        </Step>
        <Step n={2} title="Click 'Add Service'">
          <p>Fill in the service details:</p>
          <CheckList items={[
            "Name — e.g. \"Dental Checkup\", \"30-min Massage\", \"Haircut\"",
            "Duration — how long the service takes in minutes",
            "Price — the full price clients pay",
            "Capacity — how many clients can be booked at the same time slot",
            "Description (optional) — internal notes about the service",
          ]} />
        </Step>
        <Step n={3} title="Set status to Active">
          <p>Only <strong>Active</strong> services can be selected when creating appointments. You can deactivate a service anytime without deleting it — useful for seasonal or retired services.</p>
        </Step>
      </div>

      <Tip>Start with your 3–5 most common services. You can always add more later.</Tip>
      <Note>Capacity controls how many simultaneous appointments can exist for that service in the same time slot. Set it to 1 for one-on-one services.</Note>
    </div>
  ),

  availability: (
    <div className="space-y-4">
      <p className="text-slate-600 leading-relaxed">
        Availability defines when your business is open and who is working. You set this per day of the week.
      </p>

      <div className="space-y-0">
        <Step n={1} title="Go to Availability">
          <p>From the sidebar, click <strong>Availability</strong> under Booking.</p>
        </Step>
        <Step n={2} title="Add availability slots">
          <p>For each day you're open, add a slot with:</p>
          <CheckList items={[
            "Day of the week — Monday through Sunday",
            "Start time and End time — your operating hours for that day",
            "Staff name (optional) — which team member covers this slot",
          ]} />
        </Step>
        <Step n={3} title="Multiple slots per day">
          <p>You can add more than one availability slot per day. For example, a morning shift (8am–12pm) and an afternoon shift (1pm–6pm), each assigned to different staff.</p>
        </Step>
      </div>

      <Tip>If you have the same schedule every day, just add 7 slots — one per day — with the same hours.</Tip>
      <Note>Availability is for your reference and dashboard display. The system doesn't automatically block bookings outside these hours — that's handled by your staff at entry time.</Note>
    </div>
  ),

  appointments: (
    <div className="space-y-4">
      <p className="text-slate-600 leading-relaxed">
        Appointments are created by your staff through the dashboard — not by clients online. When a client calls or walks in, your receptionist enters the booking.
      </p>

      <div className="space-y-0">
        <Step n={1} title="Click 'New Appointment'">
          <p>From the Appointments page or Dashboard, click the <strong>New Appointment</strong> button.</p>
        </Step>
        <Step n={2} title="Fill in the appointment details">
          <CheckList items={[
            "Client name — who the appointment is for",
            "Service — select from your active services",
            "Date & Time — when the appointment is scheduled",
            "Staff (optional) — which team member will handle it",
            "Deposit amount (optional) — how much was paid upfront",
            "Notes (optional) — any special instructions or reminders",
          ]} />
        </Step>
        <Step n={3} title="Save the appointment">
          <p>New appointments are saved with a <strong>Pending</strong> status by default. You can change the status immediately if the client is confirmed.</p>
        </Step>
      </div>

      <Tip>Use the Notes field for things like allergies, preferences, or follow-up reminders so any staff member can handle the client smoothly.</Tip>
    </div>
  ),

  managing: (
    <div className="space-y-4">
      <p className="text-slate-600 leading-relaxed">
        Appointments move through a status workflow. This keeps your team aligned on what's happening with each booking.
      </p>

      <div className="flex flex-wrap gap-2 my-4">
        <StatusBadge label="Pending" color="bg-yellow-100 text-yellow-700" />
        <ChevronRight className="w-4 h-4 text-slate-300 self-center" />
        <StatusBadge label="Confirmed" color="bg-blue-100 text-blue-700" />
        <ChevronRight className="w-4 h-4 text-slate-300 self-center" />
        <StatusBadge label="Completed" color="bg-green-100 text-green-700" />
      </div>

      <div className="space-y-3">
        {[
          { status: "Pending", color: "bg-yellow-100 text-yellow-700", desc: "Default when an appointment is first created. Waiting for confirmation from the client or staff." },
          { status: "Confirmed", color: "bg-blue-100 text-blue-700", desc: "The appointment is locked in. Client has confirmed and staff is ready." },
          { status: "Completed", color: "bg-green-100 text-green-700", desc: "The service was rendered. Moves the appointment to your history and counts toward monthly stats." },
          { status: "Cancelled", color: "bg-gray-100 text-gray-600", desc: "The appointment was cancelled by the client or your team. Stays in records but excluded from active view." },
          { status: "No-show", color: "bg-red-100 text-red-700", desc: "The client didn't arrive. Tracked separately so you can spot repeat no-shows." },
        ].map(({ status, color, desc }) => (
          <div key={status} className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl border border-slate-100">
            <StatusBadge label={status} color={color} />
            <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <Tip>Mark appointments as Completed at end-of-day to keep your dashboard stats accurate.</Tip>
    </div>
  ),

  deposits: (
    <div className="space-y-4">
      <p className="text-slate-600 leading-relaxed">
        Deposit tracking lets you record upfront payments from clients — no payment processing involved. It's a simple record-keeping field so your team knows who has paid and who hasn't.
      </p>

      <div className="space-y-0">
        <Step n={1} title="Add a deposit when booking">
          <p>When creating or editing an appointment, enter the deposit amount in the <strong>Deposit</strong> field.</p>
        </Step>
        <Step n={2} title="Mark deposit status">
          <p>Toggle the deposit status between:</p>
          <div className="flex gap-3 mt-2">
            <span className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-semibold">Paid</span>
            <span className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-semibold">Unpaid</span>
          </div>
        </Step>
        <Step n={3} title="View on the appointment card">
          <p>The deposit amount and status are visible on each appointment card in the list view, so any staff member can see at a glance who still owes a deposit.</p>
        </Step>
      </div>

      <Note>Smapey Booking does not process payments. The deposit field is for tracking purposes only — your staff collects deposits in person or via your own payment method (GCash, cash, etc.).</Note>
    </div>
  ),

  staff: (
    <div className="space-y-4">
      <p className="text-slate-600 leading-relaxed">
        Each appointment can be assigned to a specific staff member. This helps with coordination, especially if you have multiple practitioners or service staff.
      </p>

      <div className="space-y-0">
        <Step n={1} title="Enter the staff name when booking">
          <p>When creating an appointment, fill in the <strong>Staff</strong> field with the name of the person handling the appointment — e.g. "Dr. Santos", "Maria", "James".</p>
        </Step>
        <Step n={2} title="View by staff on the dashboard">
          <p>The Appointments list shows the assigned staff on each card. Your team can filter or scan by name to see their own schedule for the day.</p>
        </Step>
        <Step n={3} title="Set staff in Availability">
          <p>In the Availability section, you can also assign staff names to specific time slots. This serves as your shift schedule — who works Monday morning vs. Tuesday afternoon.</p>
        </Step>
      </div>

      <Tip>Use consistent staff name formats (e.g. always "Dr. Reyes" not sometimes "Reyes" or "Doc Reyes") so filtering stays clean.</Tip>
    </div>
  ),

  team: (
    <div className="space-y-4">
      <p className="text-slate-600 leading-relaxed">
        You can invite your team members to the dashboard so they can manage bookings alongside you. Each member gets a role that controls what they can do.
      </p>

      <div className="space-y-0">
        <Step n={1} title="Go to Team Settings">
          <p>From the bottom of the sidebar, click your name → <strong>Team Collaboration</strong>.</p>
        </Step>
        <Step n={2} title="Invite a team member">
          <p>Enter their email address and choose a role:</p>
          <div className="space-y-2 mt-3">
            {[
              { role: "Owner", desc: "Full access — billing, settings, team management, all features" },
              { role: "Admin", desc: "Can manage appointments, services, and availability. Cannot manage billing." },
              { role: "Member", desc: "Can view and create appointments. Cannot edit services or settings." },
            ].map(({ role, desc }) => (
              <div key={role} className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs font-bold px-2 py-1 rounded-lg bg-teal-100 text-teal-700 shrink-0 h-fit">{role}</span>
                <p className="text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </Step>
        <Step n={3} title="They accept the invite">
          <p>The invited person receives an email with a link to set up their password and join your organization.</p>
        </Step>
      </div>

      <Note>Only the Owner can manage billing and subscription plans. If you need to change plan tiers, only account owners can do that from the Plans page.</Note>
    </div>
  ),

  dashboard: (
    <div className="space-y-4">
      <p className="text-slate-600 leading-relaxed">
        The Booking Dashboard gives you a real-time overview of your appointment activity — what's happening today, this month, and across your whole schedule.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 my-4">
        {[
          { label: "Today's appointments", desc: "All bookings scheduled for today, grouped by status" },
          { label: "Upcoming schedule", desc: "Next 7 days of confirmed appointments at a glance" },
          { label: "Monthly totals", desc: "How many appointments this month vs. last month" },
          { label: "Completion rate", desc: "Percentage of appointments marked as Completed" },
          { label: "No-show rate", desc: "Track clients who consistently don't show up" },
          { label: "Revenue summary", desc: "Total appointment value based on service prices" },
        ].map(({ label, desc }) => (
          <div key={label} className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-slate-700">{label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Tip>Check the dashboard at the start of each day to confirm today's lineup and spot any pending appointments that need to be confirmed.</Tip>
    </div>
  ),

  tips: (
    <div className="space-y-4">
      <p className="text-slate-600 leading-relaxed">
        Get the most out of Smapey Booking with these practical tips.
      </p>

      <div className="space-y-4">
        {[
          {
            icon: Zap,
            title: "Set up everything before your first booking",
            desc: "Add all your services and availability slots before you start entering appointments. This avoids having to go back and edit things mid-workflow.",
          },
          {
            icon: CalendarDays,
            title: "Use consistent naming",
            desc: "Keep service names, staff names, and client names consistent. \"Dr. Santos\" vs \"Doc Santos\" creates confusion when filtering.",
          },
          {
            icon: CheckCircle2,
            title: "Mark completed appointments daily",
            desc: "Don't let 'Confirmed' appointments pile up. Mark them as Completed at end of day so your dashboard stats stay accurate.",
          },
          {
            icon: CreditCard,
            title: "Record deposits at booking time",
            desc: "Enter the deposit amount immediately when the client pays. Don't rely on memory — it'll be lost.",
          },
          {
            icon: Users,
            title: "Assign staff at every booking",
            desc: "Even if you only have one staff member, always fill in the staff field. It creates better records and makes it easier to scale your team later.",
          },
          {
            icon: Bell,
            title: "Use the Notes field generously",
            desc: "Add allergies, preferences, follow-up reminders, or special instructions. Any staff member who opens the appointment will see this context.",
          },
          {
            icon: Settings,
            title: "Deactivate, don't delete",
            desc: "If you stop offering a service temporarily, deactivate it instead of deleting. Your historical appointments that used that service will stay intact.",
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-sm">{title}</p>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

//////////////////////////////////////////////////////
// MAIN
//////////////////////////////////////////////////////
export default function GuideContent() {
  const [active, setActive] = useState("overview")
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollToSection = (id: string) => {
    setActive(id)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const activeSection = SECTIONS.find((s) => s.id === active)

  return (
    <div className="min-h-screen bg-white">

      {/* TOP NAV */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/booking" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Booking</span>
            </Link>
            <span className="text-slate-200">|</span>
            <div className="flex items-center gap-2 text-teal-700 font-semibold text-sm">
              <BookOpen className="w-4 h-4" />
              Booking Guide
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>{activeSection?.label}</span>
          </button>

          <Link
            href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOOKING&plan=FREE`}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold transition-colors"
          >
            Get started free
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile sidebar dropdown */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-3 flex flex-col gap-1">
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-all ${
                  active === id
                    ? "bg-teal-50 text-teal-700 font-semibold"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active === id ? "text-teal-500" : "text-slate-400"}`} />
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* PAGE HEADER */}
      <div className="bg-gradient-to-br from-[#0a1a1a] to-[#0d2626] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-4">
            <BookOpen className="w-3 h-3" />
            User Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            How to use Smapey Booking
          </h1>
          <p className="text-white/50 max-w-xl leading-relaxed">
            Everything you need to know — from setting up your services to managing appointments and tracking your team.
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-6xl mx-auto px-6 py-12 flex gap-12">

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar active={active} onSelect={scrollToSection} />
        </div>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {/* Section title */}
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
            {activeSection && (
              <>
                <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center shrink-0">
                  <activeSection.icon className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">{activeSection.label}</h2>
              </>
            )}
          </div>

          {/* Section body */}
          <div className="prose-sm max-w-none">
            {SECTION_CONTENT[active]}
          </div>

          {/* Prev / Next */}
          <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            {(() => {
              const idx = SECTIONS.findIndex((s) => s.id === active)
              const prev = SECTIONS[idx - 1]
              const next = SECTIONS[idx + 1]
              return (
                <>
                  {prev ? (
                    <button
                      onClick={() => scrollToSection(prev.id)}
                      className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {prev.label}
                    </button>
                  ) : <div />}
                  {next && (
                    <button
                      onClick={() => scrollToSection(next.id)}
                      className="flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-500 transition-colors ml-auto"
                    >
                      {next.label}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </>
              )
            })()}
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 px-6 py-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-5 h-5 rounded object-cover" />
            <span className="text-slate-400 text-sm">Smapey Booking Guide</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <Link href="/booking" className="hover:text-teal-600 transition-colors">Back to product page</Link>
            <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOOKING&plan=FREE`} className="hover:text-teal-600 transition-colors">
              Get started free
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
