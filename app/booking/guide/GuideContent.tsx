"use client"

import { useState } from "react"
import {
  CalendarDays, Briefcase, Clock, UserCheck, CreditCard,
  CheckCircle2, ChevronRight, ArrowLeft, BarChart3, Bell,
  Users, Menu, X, BookOpen, Zap, Settings, AlertCircle,
  CircleDot, Check,
} from "lucide-react"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOOKING&plan=FREE`
const cardStyle: React.CSSProperties = { background: "#fff", borderColor: INK }

const SECTIONS = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "services", label: "Setting up Services", icon: Briefcase },
  { id: "availability", label: "Defining Availability", icon: Clock },
  { id: "appointments", label: "Creating Appointments", icon: CalendarDays },
  { id: "managing", label: "Managing Bookings", icon: CheckCircle2 },
  { id: "deposits", label: "Tracking Deposits", icon: CreditCard },
  { id: "staff", label: "Staff Assignment", icon: UserCheck },
  { id: "team", label: "Team & Roles", icon: Users },
  { id: "dashboard", label: "Dashboard & Analytics", icon: BarChart3 },
  { id: "tips", label: "Tips & Best Practices", icon: Zap },
]

function Sidebar({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <aside className="w-64 shrink-0">
      <div className="sticky top-24">
        <p className="text-xs font-bold uppercase tracking-widest mb-3 px-2" style={{ color: "#9a948b" }}>Contents</p>
        <nav className="flex flex-col gap-1">
          {SECTIONS.map(({ id, label, icon: Icon }) => {
            const isActive = active === id
            return (
              <button key={id} onClick={() => onSelect(id)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-[12px] text-sm text-left transition-all border-2"
                style={isActive ? { background: INK, color: "#fff", borderColor: INK, fontWeight: 700 } : { background: "transparent", color: "#54514c", borderColor: "transparent", fontWeight: 600 }}>
                <Icon className="w-4 h-4 shrink-0" style={{ color: isActive ? "#fff" : BLUE }} />
                {label}
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full border-2 text-sm font-bold flex items-center justify-center shrink-0" style={{ background: BLUE, color: "#fff", borderColor: INK }}>{n}</div>
        <div className="w-px flex-1 mt-2" style={{ background: "rgba(22,22,22,.15)" }} />
      </div>
      <div className="pb-8">
        <p className="font-bold mb-1" style={{ color: INK }}>{title}</p>
        <div className="text-sm leading-relaxed space-y-2" style={{ color: "#54514c" }}>{children}</div>
      </div>
    </div>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5 rounded-[14px] border-2 px-4 py-3 text-sm my-4" style={{ background: "#fff7e8", borderColor: INK, color: "#5c4a28" }}>
      <Zap className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#b06c00" }} />
      <span>{children}</span>
    </div>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5 rounded-[14px] border-2 px-4 py-3 text-sm my-4" style={{ background: "#eaf1ff", borderColor: INK, color: "#21314f" }}>
      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: BLUE }} />
      <span>{children}</span>
    </div>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mt-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#54514c" }}>
          <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: BLUE }} />
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

const SECTION_CONTENT: Record<string, React.ReactNode> = {
  overview: (
    <div className="space-y-6">
      <p className="leading-relaxed" style={{ color: "#54514c" }}>
        Smapey Booking is an internal appointment management tool for service-based businesses, dental clinics, hair salons, massage studios, tutoring centers, and more. Your staff manages everything from the dashboard. Clients book by calling or walking in, and your team enters the appointment.
      </p>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Briefcase, title: "Services", desc: "Define what you offer with duration, price & capacity" },
          { icon: Clock, title: "Availability", desc: "Set open hours and assign staff to time slots" },
          { icon: CalendarDays, title: "Appointments", desc: "Book, confirm, track deposits & mark complete" },
        ].map(({ icon: Icon, title, desc }, i) => (
          <div key={title} className="rounded-[14px] p-4 border-2" style={{ ...cardStyle, boxShadow: `5px 5px 0 ${i % 2 === 0 ? BLUE : AMBER}` }}>
            <div className="w-9 h-9 rounded-[10px] border-2 flex items-center justify-center mb-3" style={{ background: BLUE, borderColor: INK }}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <p className="font-extrabold text-sm" style={{ color: INK }}>{title}</p>
            <p className="text-xs mt-1" style={{ color: "#54514c" }}>{desc}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="font-extrabold mb-3" style={{ color: INK }}>Quick start flow</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm" style={{ color: "#54514c" }}>
          {["Add services", "Set availability", "Book appointments", "Manage & complete"].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 font-bold" style={{ background: "#fff", color: INK, borderColor: INK }}>
                <span className="w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0" style={{ background: BLUE }}>{i + 1}</span>
                {step}
              </span>
              {i < arr.length - 1 && <ChevronRight className="w-4 h-4 shrink-0" style={{ color: "#c9c3ba" }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  services: (
    <div className="space-y-4">
      <p className="leading-relaxed" style={{ color: "#54514c" }}>
        Services are the foundation of your booking system. Before you can create any appointment, you need at least one active service.
      </p>
      <div className="space-y-0">
        <Step n={1} title="Go to Services"><p>From the sidebar, click <strong>Services</strong> under the Booking section.</p></Step>
        <Step n={2} title="Click 'Add Service'">
          <p>Fill in the service details:</p>
          <CheckList items={[
            "Name, e.g. \"Dental Checkup\", \"30-min Massage\", \"Haircut\"",
            "Duration, how long the service takes in minutes",
            "Price, the full price clients pay",
            "Capacity, how many clients can be booked at the same time slot",
            "Description (optional), internal notes about the service",
          ]} />
        </Step>
        <Step n={3} title="Set status to Active"><p>Only <strong>Active</strong> services can be selected when creating appointments. You can deactivate a service anytime without deleting it - useful for seasonal or retired services.</p></Step>
      </div>
      <Tip>Start with your 3–5 most common services. You can always add more later.</Tip>
      <Note>Capacity controls how many simultaneous appointments can exist for that service in the same time slot. Set it to 1 for one-on-one services.</Note>
    </div>
  ),

  availability: (
    <div className="space-y-4">
      <p className="leading-relaxed" style={{ color: "#54514c" }}>
        Availability defines when your business is open and who is working. You set this per day of the week.
      </p>
      <div className="space-y-0">
        <Step n={1} title="Go to Availability"><p>From the sidebar, click <strong>Availability</strong> under Booking.</p></Step>
        <Step n={2} title="Add availability slots">
          <p>For each day you&apos;re open, add a slot with:</p>
          <CheckList items={[
            "Day of the week, Monday through Sunday",
            "Start time and End time, your operating hours for that day",
            "Staff name (optional), which team member covers this slot",
          ]} />
        </Step>
        <Step n={3} title="Multiple slots per day"><p>You can add more than one availability slot per day. For example, a morning shift (8am–12pm) and an afternoon shift (1pm–6pm), each assigned to different staff.</p></Step>
      </div>
      <Tip>If you have the same schedule every day, just add 7 slots (one per day) with the same hours.</Tip>
      <Note>Availability is for your reference and dashboard display. The system doesn&apos;t automatically block bookings outside these hours, that&apos;s handled by your staff at entry time.</Note>
    </div>
  ),

  appointments: (
    <div className="space-y-4">
      <p className="leading-relaxed" style={{ color: "#54514c" }}>
        Appointments are created by your staff through the dashboard, not by clients online. When a client calls or walks in, your receptionist enters the booking.
      </p>
      <div className="space-y-0">
        <Step n={1} title="Click 'New Appointment'"><p>From the Appointments page or Dashboard, click the <strong>New Appointment</strong> button.</p></Step>
        <Step n={2} title="Fill in the appointment details">
          <CheckList items={[
            "Client name, who the appointment is for",
            "Service, select from your active services",
            "Date & Time, when the appointment is scheduled",
            "Staff (optional), which team member will handle it",
            "Deposit amount (optional), how much was paid upfront",
            "Notes (optional), any special instructions or reminders",
          ]} />
        </Step>
        <Step n={3} title="Save the appointment"><p>New appointments are saved with a <strong>Pending</strong> status by default. You can change the status immediately if the client is confirmed.</p></Step>
      </div>
      <Tip>Use the Notes field for things like allergies, preferences, or follow-up reminders so any staff member can handle the client smoothly.</Tip>
    </div>
  ),

  managing: (
    <div className="space-y-4">
      <p className="leading-relaxed" style={{ color: "#54514c" }}>
        Appointments move through a status workflow. This keeps your team aligned on what&apos;s happening with each booking.
      </p>
      <div className="flex flex-wrap gap-2 my-4">
        <StatusBadge label="Pending" color="bg-yellow-100 text-yellow-700" />
        <ChevronRight className="w-4 h-4 self-center" style={{ color: "#c9c3ba" }} />
        <StatusBadge label="Confirmed" color="bg-blue-100 text-blue-700" />
        <ChevronRight className="w-4 h-4 self-center" style={{ color: "#c9c3ba" }} />
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
          <div key={status} className="flex gap-3 items-start p-3 rounded-[14px] border-2" style={cardStyle}>
            <StatusBadge label={status} color={color} />
            <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{desc}</p>
          </div>
        ))}
      </div>
      <Tip>Mark appointments as Completed at end-of-day to keep your dashboard stats accurate.</Tip>
    </div>
  ),

  deposits: (
    <div className="space-y-4">
      <p className="leading-relaxed" style={{ color: "#54514c" }}>
        Deposit tracking lets you record upfront payments from clients, no payment processing involved. It&apos;s a simple record-keeping field so your team knows who has paid and who hasn&apos;t.
      </p>
      <div className="space-y-0">
        <Step n={1} title="Add a deposit when booking"><p>When creating or editing an appointment, enter the deposit amount in the <strong>Deposit</strong> field.</p></Step>
        <Step n={2} title="Mark deposit status">
          <p>Toggle the deposit status between:</p>
          <div className="flex gap-3 mt-2">
            <span className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-semibold">Paid</span>
            <span className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-semibold">Unpaid</span>
          </div>
        </Step>
        <Step n={3} title="View on the appointment card"><p>The deposit amount and status are visible on each appointment card in the list view, so any staff member can see at a glance who still owes a deposit.</p></Step>
      </div>
      <Note>Smapey Booking does not process payments. The deposit field is for tracking purposes only, your staff collects deposits in person or via your own payment method (GCash, cash, etc.).</Note>
    </div>
  ),

  staff: (
    <div className="space-y-4">
      <p className="leading-relaxed" style={{ color: "#54514c" }}>
        Each appointment can be assigned to a specific staff member. This helps with coordination, especially if you have multiple practitioners or service staff.
      </p>
      <div className="space-y-0">
        <Step n={1} title="Enter the staff name when booking"><p>When creating an appointment, fill in the <strong>Staff</strong> field with the name of the person handling the appointment - e.g. &quot;Dr. Santos&quot;, &quot;Maria&quot;, &quot;James&quot;.</p></Step>
        <Step n={2} title="View by staff on the dashboard"><p>The Appointments list shows the assigned staff on each card. Your team can filter or scan by name to see their own schedule for the day.</p></Step>
        <Step n={3} title="Set staff in Availability"><p>In the Availability section, you can also assign staff names to specific time slots. This serves as your shift schedule - who works Monday morning vs. Tuesday afternoon.</p></Step>
      </div>
      <Tip>Use consistent staff name formats (e.g. always &quot;Dr. Reyes&quot; not sometimes &quot;Reyes&quot; or &quot;Doc Reyes&quot;) so filtering stays clean.</Tip>
    </div>
  ),

  team: (
    <div className="space-y-4">
      <p className="leading-relaxed" style={{ color: "#54514c" }}>
        You can invite your team members to the dashboard so they can manage bookings alongside you. Each member gets a role that controls what they can do.
      </p>
      <div className="space-y-0">
        <Step n={1} title="Go to Team Settings"><p>From the bottom of the sidebar, click your name → <strong>Team Collaboration</strong>.</p></Step>
        <Step n={2} title="Invite a team member">
          <p>Enter their email address and choose a role:</p>
          <div className="space-y-2 mt-3">
            {[
              { role: "Owner", desc: "Full access, billing, settings, team management, all features" },
              { role: "Admin", desc: "Can manage appointments, services, and availability. Cannot manage billing." },
              { role: "Member", desc: "Can view and create appointments. Cannot edit services or settings." },
            ].map(({ role, desc }) => (
              <div key={role} className="flex gap-3 p-3 rounded-[14px] border-2" style={cardStyle}>
                <span className="text-xs font-bold px-2 py-1 rounded-full border-2 shrink-0 h-fit" style={{ background: AMBER, color: INK, borderColor: INK }}>{role}</span>
                <p className="text-sm" style={{ color: "#54514c" }}>{desc}</p>
              </div>
            ))}
          </div>
        </Step>
        <Step n={3} title="They accept the invite"><p>The invited person receives an email with a link to set up their password and join your organization.</p></Step>
      </div>
      <Note>Only the Owner can manage billing and subscription plans. If you need to change plan tiers, only account owners can do that from the Plans page.</Note>
    </div>
  ),

  dashboard: (
    <div className="space-y-4">
      <p className="leading-relaxed" style={{ color: "#54514c" }}>
        The Booking Dashboard gives you a real-time overview of your appointment activity, what&apos;s happening today, this month, and across your whole schedule.
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
          <div key={label} className="flex gap-3 p-3 rounded-[14px] border-2" style={cardStyle}>
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: BLUE }} />
            <div>
              <p className="text-sm font-bold" style={{ color: INK }}>{label}</p>
              <p className="text-xs mt-0.5" style={{ color: "#54514c" }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
      <Tip>Check the dashboard at the start of each day to confirm today&apos;s lineup and spot any pending appointments that need to be confirmed.</Tip>
    </div>
  ),

  tips: (
    <div className="space-y-4">
      <p className="leading-relaxed" style={{ color: "#54514c" }}>Get the most out of Smapey Booking with these practical tips.</p>
      <div className="space-y-4">
        {[
          { icon: Zap, title: "Set up everything before your first booking", desc: "Add all your services and availability slots before you start entering appointments. This avoids having to go back and edit things mid-workflow." },
          { icon: CalendarDays, title: "Use consistent naming", desc: "Keep service names, staff names, and client names consistent. \"Dr. Santos\" vs \"Doc Santos\" creates confusion when filtering." },
          { icon: CheckCircle2, title: "Mark completed appointments daily", desc: "Don't let 'Confirmed' appointments pile up. Mark them as Completed at end of day so your dashboard stats stay accurate." },
          { icon: CreditCard, title: "Record deposits at booking time", desc: "Enter the deposit amount immediately when the client pays. Don't rely on memory - it'll be lost." },
          { icon: Users, title: "Assign staff at every booking", desc: "Even if you only have one staff member, always fill in the staff field. It creates better records and makes it easier to scale your team later." },
          { icon: Bell, title: "Use the Notes field generously", desc: "Add allergies, preferences, follow-up reminders, or special instructions. Any staff member who opens the appointment will see this context." },
          { icon: Settings, title: "Deactivate, don't delete", desc: "If you stop offering a service temporarily, deactivate it instead of deleting. Your historical appointments that used that service will stay intact." },
        ].map(({ icon: Icon, title, desc }, i) => (
          <div key={title} className="flex gap-4 p-4 rounded-[14px] border-2" style={{ ...cardStyle, boxShadow: `5px 5px 0 ${i % 2 === 0 ? BLUE : AMBER}` }}>
            <div className="w-8 h-8 rounded-[10px] border-2 flex items-center justify-center shrink-0" style={{ background: BLUE, borderColor: INK }}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-extrabold text-sm" style={{ color: INK }}>{title}</p>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: "#54514c" }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

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
    <div className="min-h-screen" style={{ background: CREAM, fontFamily: display.fontFamily }}>

      {/* TOP NAV */}
      <nav className="sticky top-0 z-40" style={{ background: CREAM, borderBottom: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="/booking" className="flex items-center gap-1.5 text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: "#54514c" }}>
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Booking</span>
            </a>
            <span style={{ color: "rgba(22,22,22,.2)" }}>|</span>
            <div className="flex items-center gap-2 font-extrabold text-sm" style={{ color: INK }}>
              <BookOpen className="w-4 h-4" style={{ color: BLUE }} />
              Booking Guide
            </div>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden flex items-center gap-1.5 text-sm border-2 px-3 py-1.5 rounded-full font-bold" style={{ color: INK, borderColor: INK }}>
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>{activeSection?.label}</span>
          </button>
          <a href={REGISTER_URL} className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full border-2 text-sm font-bold transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>
            Get started free <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
        {mobileOpen && (
          <div className="lg:hidden px-4 py-3 flex flex-col gap-1" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
            {SECTIONS.map(({ id, label, icon: Icon }) => {
              const isActive = active === id
              return (
                <button key={id} onClick={() => scrollToSection(id)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-sm text-left transition-all"
                  style={isActive ? { background: INK, color: "#fff", fontWeight: 700 } : { color: "#54514c", fontWeight: 600 }}>
                  <Icon className="w-4 h-4 shrink-0" style={{ color: isActive ? "#fff" : BLUE }} />
                  {label}
                </button>
              )
            })}
          </div>
        )}
      </nav>

      {/* PAGE HEADER */}
      <div className="relative overflow-hidden py-16 px-6" style={{ background: CREAM, borderBottom: `2px solid ${INK}` }}>
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2" style={{ top: "28%", right: "-70px", width: 260, height: 72, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-4" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <BookOpen className="w-3 h-3" /> User Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3" style={{ color: INK }}>How to use Smapey Booking</h1>
          <p className="max-w-xl leading-relaxed" style={{ color: "#54514c" }}>Everything you need to know, from setting up your services to managing appointments and tracking your team.</p>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-6xl mx-auto px-6 py-12 flex gap-12">
        <div className="hidden lg:block">
          <Sidebar active={active} onSelect={scrollToSection} />
        </div>
        <main className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-8 pb-4" style={{ borderBottom: `2px solid ${INK}` }}>
            {activeSection && (
              <>
                <div className="w-10 h-10 rounded-[12px] border-2 flex items-center justify-center shrink-0" style={{ background: BLUE, borderColor: INK }}>
                  <activeSection.icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-extrabold" style={{ color: INK }}>{activeSection.label}</h2>
              </>
            )}
          </div>
          <div className="max-w-none">{SECTION_CONTENT[active]}</div>
          <div className="mt-12 pt-6 flex items-center justify-between gap-4" style={{ borderTop: `2px solid ${INK}` }}>
            {(() => {
              const idx = SECTIONS.findIndex((s) => s.id === active)
              const prev = SECTIONS[idx - 1]
              const next = SECTIONS[idx + 1]
              return (
                <>
                  {prev ? (
                    <button onClick={() => scrollToSection(prev.id)} className="flex items-center gap-2 text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: "#54514c" }}>
                      <ArrowLeft className="w-4 h-4" />{prev.label}
                    </button>
                  ) : <div />}
                  {next && (
                    <button onClick={() => scrollToSection(next.id)} className="flex items-center gap-2 text-sm font-bold hover:opacity-60 transition-opacity ml-auto" style={{ color: BLUE }}>
                      {next.label}<ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </>
              )
            })()}
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-sm font-extrabold" style={{ color: INK }}>Booking by Smapey</span>
          </div>
          <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
