"use client"

import { useState, useEffect } from "react"
import {
  Car, UserPlus, Key, CreditCard, AlertCircle, BarChart3,
  ChevronRight, Zap, BookOpen, ArrowLeft,
  Globe, Palette, MessageSquare, ArrowRightCircle,
} from "lucide-react"

//////////////////////////////////////////////////////
// DATA
//////////////////////////////////////////////////////
const GUIDES = [
  {
    id: "add-vehicle",
    icon: Car,
    title: "Add Your First Vehicle",
    badge: "Getting Started",
    badgeColor: "bg-blue-50 text-blue-600 border border-blue-100",
    accentColor: "from-orange-600 to-amber-500",
    description:
      "Learn how to register a vehicle in your fleet, set its status, and make it available for rentals.",
    steps: [
      {
        title: "Open the Fleet tab",
        detail:
          "From your car rental dashboard sidebar, click Fleet. This shows all your registered vehicles and their current status.",
      },
      {
        title: 'Click "Add Vehicle"',
        detail:
          "Hit the Add Vehicle button in the top-right corner. A form will open where you can enter all vehicle details.",
      },
      {
        title: "Enter vehicle details",
        detail:
          "Fill in the make, model, plate number, and daily rate. These details appear on every rental created for this vehicle.",
      },
      {
        title: "Set vehicle status",
        detail:
          "New vehicles default to Available. You can set them to Maintenance if they're not yet ready to rent.",
      },
      {
        title: "Save the vehicle",
        detail:
          "Click Save. The vehicle is now part of your fleet and can be selected when creating a new rental reservation.",
      },
    ],
    tip: "Add your daily rate when creating the vehicle — it auto-fills the rental amount field when you create a reservation for that car.",
  },
  {
    id: "register-customer",
    icon: UserPlus,
    title: "Register a Customer",
    badge: "All Plans",
    badgeColor: "bg-green-50 text-green-600 border border-green-100",
    accentColor: "from-blue-600 to-blue-400",
    description:
      "Create a customer profile before creating their first rental. Customer records store contact info and full rental history.",
    steps: [
      {
        title: "Open the Customers tab",
        detail:
          "Click Customers in the sidebar. This lists all registered customers along with their status and rental count.",
      },
      {
        title: 'Click "Add Customer"',
        detail:
          "Hit Add Customer to open the registration form. All fields you fill in here are linked to every future rental for this person.",
      },
      {
        title: "Enter customer details",
        detail:
          "Enter the customer's full name, phone number, email address, and driver's license number. License number is important for dispute tracking.",
      },
      {
        title: "Save the customer",
        detail:
          "Click Save. The customer is now in your system and can be assigned to new rental reservations.",
      },
    ],
    tip: "Customers with completed rentals can't be hard-deleted — use Deactivate instead to hide them from active views without losing their rental history.",
  },
  {
    id: "create-reservation",
    icon: Key,
    title: "Create a Rental Reservation",
    badge: "All Plans",
    badgeColor: "bg-green-50 text-green-600 border border-green-100",
    accentColor: "from-amber-600 to-orange-500",
    description:
      "Create a new rental by assigning a vehicle and customer, setting pickup and return dates, and recording a deposit.",
    steps: [
      {
        title: "Open the Rentals tab",
        detail:
          "Click Rentals in the sidebar. This shows all active, reserved, returned, overdue, and cancelled rentals.",
      },
      {
        title: 'Click "New Rental"',
        detail:
          "Hit New Rental to open the reservation form. You'll need a vehicle and customer already registered before proceeding.",
      },
      {
        title: "Select the vehicle and customer",
        detail:
          "Choose the vehicle from the dropdown — only Available vehicles appear. Then select the customer from your registered customers list.",
      },
      {
        title: "Set pickup and return dates",
        detail:
          "Enter the pickup date and expected return date. The system uses these to calculate the rental duration and flag overdue vehicles.",
      },
      {
        title: "Add deposit and location details",
        detail:
          "Enter the deposit amount collected and the pickup/return locations if applicable. These fields are optional but recommended.",
      },
      {
        title: "Save as Reserved or Active",
        detail:
          "Save as Reserved if the customer hasn't picked up the car yet. Change to Active when they do. The vehicle status updates automatically.",
      },
    ],
    tip: "Once a vehicle is in an Active or Reserved rental, it's removed from available inventory and can't be double-booked.",
  },
  {
    id: "track-deposits",
    icon: CreditCard,
    title: "Track Deposits",
    badge: "All Plans",
    badgeColor: "bg-green-50 text-green-600 border border-green-100",
    accentColor: "from-orange-500 to-yellow-500",
    description:
      "Record deposits at booking time so you always know what's been collected before a vehicle leaves the lot.",
    steps: [
      {
        title: "Enter deposit when creating a rental",
        detail:
          "The deposit amount field appears in the New Rental form. Enter the amount the customer paid upfront before picking up the vehicle.",
      },
      {
        title: "View deposit on the rental record",
        detail:
          "Open any rental to see the deposit amount alongside the total rental amount. Both figures are visible on the rental detail page.",
      },
      {
        title: "Update deposit if needed",
        detail:
          "If a customer pays an additional deposit, open the rental record and edit the deposit field. Changes save immediately.",
      },
      {
        title: "Review deposits in your revenue report",
        detail:
          "Your revenue dashboard shows total rental amounts. Cross-reference with deposit fields to track what's been pre-collected vs. still owed.",
      },
    ],
    tip: "Always record the deposit before marking a rental Active — this creates an accurate paper trail in case of disputes or damage claims.",
  },
  {
    id: "handle-overdue",
    icon: AlertCircle,
    title: "Handle Overdue Rentals",
    badge: "All Plans",
    badgeColor: "bg-green-50 text-green-600 border border-green-100",
    accentColor: "from-orange-700 to-amber-600",
    description:
      "Overdue rentals are automatically flagged when the return date passes. Here's how to find and resolve them quickly.",
    steps: [
      {
        title: "Check the Overdue count on your dashboard",
        detail:
          "Your car rental dashboard shows an Overdue count in the summary cards. Any non-zero value needs immediate attention.",
      },
      {
        title: "Filter by Overdue status in Rentals",
        detail:
          "Go to Rentals and filter by Overdue. The list shows every rental that's passed its return date and is still Active.",
      },
      {
        title: "Contact the customer",
        detail:
          "Open the rental record to see the customer's phone number and email. Reach out to confirm a new return date or report a vehicle issue.",
      },
      {
        title: "Update the return date if extended",
        detail:
          "If the customer is keeping the car longer, edit the rental and push the return date forward. This clears the overdue flag.",
      },
      {
        title: "Mark as Returned when the car comes back",
        detail:
          "When the vehicle is returned, open the rental and click Return. The vehicle status changes back to Available for the next booking.",
      },
    ],
    tip: "Overdue status is set automatically at midnight when the return date passes. Check your dashboard first thing each morning to catch them early.",
  },
  {
    id: "revenue-dashboard",
    icon: BarChart3,
    title: "Read Your Revenue Dashboard",
    badge: "All Plans",
    badgeColor: "bg-green-50 text-green-600 border border-green-100",
    accentColor: "from-amber-500 to-orange-400",
    description:
      "Understand your rental business performance through revenue totals, fleet utilization, and rental trends.",
    steps: [
      {
        title: "Open the Dashboard",
        detail:
          "The car rental dashboard loads automatically when you enter the module. Summary cards appear at the top with key real-time metrics.",
      },
      {
        title: "Read the summary cards",
        detail:
          "Cards show: Available vehicles, Active rentals, Overdue count, and Monthly revenue. These update live as rentals are created or returned.",
      },
      {
        title: "Check the Monthly Revenue chart",
        detail:
          "The bar chart shows rental revenue by month. Hover over a bar to see the exact figure. Compare months to spot seasonal trends.",
      },
      {
        title: "Review Upcoming Returns",
        detail:
          "The Upcoming Returns section lists active rentals sorted by return date — so you can prepare for handoffs today, tomorrow, and this week.",
      },
      {
        title: "Monitor fleet utilization",
        detail:
          "Divide active rentals by total fleet size to see your utilization rate. High utilization means your fleet is working. Low means idle inventory.",
      },
    ],
    tip: "If monthly revenue is flat but rental count is up, check your daily rates — vehicles might be underpriced relative to demand.",
  },
  {
    id: "public-booking-page",
    icon: Globe,
    title: "Set Up Your Public Booking Page",
    badge: "All Plans",
    badgeColor: "bg-green-50 text-green-600 border border-green-100",
    accentColor: "from-orange-500 to-amber-400",
    description:
      "Create a public page where customers can browse your fleet and submit booking inquiries — no login required on their end.",
    steps: [
      {
        title: "Open Public Page settings",
        detail:
          "In your car rental dashboard sidebar, click Public Page. This is where you configure your public-facing booking URL and design.",
      },
      {
        title: "Set your unique slug",
        detail:
          "Enter a short, memorable slug (e.g. your business name). Your public page will be live at smapey.com/rent/your-slug. Slugs must be unique across all Smapey accounts.",
      },
      {
        title: "Save the slug",
        detail:
          "Click Save Slug. Once saved, the public page is immediately live. Anyone with the link can browse your vehicles and submit an inquiry.",
      },
      {
        title: "Share your booking link",
        detail:
          "Copy the public page URL and add it to your Google Maps listing, Facebook page, Instagram bio, or wherever customers contact you. This is your 24/7 online booking intake.",
      },
    ],
    tip: "Put your public page link in your Google Maps Business profile under the website or booking URL field — customers searching nearby will see it directly in Google Maps.",
  },
  {
    id: "page-design",
    icon: Palette,
    title: "Choose a Page Design",
    badge: "PRO / ENTERPRISE",
    badgeColor: "bg-purple-50 text-purple-600 border border-purple-100",
    accentColor: "from-purple-600 to-violet-500",
    description:
      "Pick from 5 unique page designs to match your brand. PRO unlocks 3 designs; ENTERPRISE unlocks all 5.",
    steps: [
      {
        title: "Open Public Page settings",
        detail:
          "Go to Public Page in the sidebar. Below the slug field you'll find the Page Design section with a visual preview of each available theme.",
      },
      {
        title: "Preview the available designs",
        detail:
          "Five designs are shown: Midnight (dark, orange), Clean (minimal white), Ocean (navy glassmorphism), Forest (dark green angular), and Luxury (gold editorial). Locked designs show a lock icon with your required plan.",
      },
      {
        title: "Click a design to apply it",
        detail:
          "Clicking an unlocked design saves it immediately — your public page updates live. No separate save button needed.",
      },
      {
        title: "Upgrade to unlock more designs",
        detail:
          "FREE plan includes Midnight only. PRO adds Clean and Ocean. ENTERPRISE unlocks Forest and Luxury. Upgrade in Settings → Billing.",
      },
    ],
    tip: "Choose a design that matches your target market. Midnight and Ocean work well for premium fleets; Clean is ideal if most customers find you via Google Maps on mobile.",
  },
  {
    id: "manage-inquiries",
    icon: MessageSquare,
    title: "Manage Booking Inquiries",
    badge: "All Plans",
    badgeColor: "bg-green-50 text-green-600 border border-green-100",
    accentColor: "from-orange-600 to-red-500",
    description:
      "Review and respond to booking requests submitted through your public page. Approve to proceed, reject to decline with a record kept.",
    steps: [
      {
        title: "Open the Inquiries tab",
        detail:
          "Click Inquiries in the sidebar. All submissions from your public page appear here sorted by date, showing customer name, vehicle, dates, and status.",
      },
      {
        title: "Read the inquiry details",
        detail:
          "Each row shows the customer's name, phone, requested vehicle, pickup/return dates, and any notes they left. Click a row to expand full details.",
      },
      {
        title: "Approve or Reject",
        detail:
          "Hit Approve to confirm the request or Reject to decline it. Both actions update the inquiry status immediately. Rejected inquiries stay on record but are visually marked.",
      },
      {
        title: "Follow up with the customer",
        detail:
          "After approving, use the customer's phone number shown in the inquiry to confirm details directly. The customer isn't notified automatically — outreach is manual.",
      },
    ],
    tip: "FREE plan supports up to 15 inquiries per month. PRO supports 200. ENTERPRISE is unlimited. Check your plan limit in Public Page settings if inquiries stop coming through.",
  },
  {
    id: "convert-to-rental",
    icon: ArrowRightCircle,
    title: "Convert an Inquiry to a Rental",
    badge: "All Plans",
    badgeColor: "bg-green-50 text-green-600 border border-green-100",
    accentColor: "from-amber-600 to-orange-500",
    description:
      "Turn an approved inquiry into a live rental reservation in one click. Customer records are created automatically if the customer is new.",
    steps: [
      {
        title: "Find an approved inquiry",
        detail:
          "Go to Inquiries and filter by Approved, or look for the green Approved badge. Only approved inquiries can be converted.",
      },
      {
        title: 'Click "Convert to Rental"',
        detail:
          "The Convert to Rental button appears on every approved inquiry that hasn't been converted yet. Click it to start the conversion.",
      },
      {
        title: "Customer is created automatically",
        detail:
          "If the customer's phone number isn't already in your system, a new customer profile is created using the name and phone from the inquiry. No manual data entry needed.",
      },
      {
        title: "Rental is created and you're redirected",
        detail:
          "A new rental reservation is created with the vehicle, customer, and dates from the inquiry. You're taken to the Rentals tab automatically to review and activate it.",
      },
      {
        title: "Inquiry is marked as converted",
        detail:
          "The original inquiry shows a Rental Created badge. The Convert button disappears — each inquiry can only produce one rental to prevent duplicates.",
      },
    ],
    tip: "Converting an inquiry doesn't automatically mark the rental Active. Review the rental record, confirm any deposit details, then change the status to Active when the customer picks up the car.",
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
        background: "#1a0800",
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-20 -right-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-14">
        <a
          href="/car-rental"
          className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Car Rental
        </a>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-5">
          <BookOpen className="w-3 h-3" />
          User Guide
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
          Car Rental Documentation
        </h1>
        <p className="text-white/50 max-w-2xl text-lg leading-relaxed">
          Everything you need to run your car rental business on Smapey — from adding your first vehicle to reading your monthly revenue.
        </p>

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
      <div className="flex items-start gap-4 mb-6">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${guide.accentColor} flex items-center justify-center shrink-0 shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold mb-2 ${guide.badgeColor}`}>
            {guide.badge}
          </span>
          <h2 className="text-xl font-bold text-slate-800">{guide.title}</h2>
          <p className="text-slate-500 text-sm mt-1 leading-relaxed">{guide.description}</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
        {guide.steps.map((step, i) => (
          <div
            key={i}
            className={`flex gap-4 p-5 ${i < guide.steps.length - 1 ? "border-b border-slate-100" : ""}`}
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
        <div className="rounded-2xl bg-gradient-to-br from-[#1a0800] to-[#2d1200] p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)" }}
          />
          <div className="relative">
            <h3 className="text-2xl font-extrabold text-white mb-2">Ready to manage your fleet?</h3>
            <p className="text-white/40 text-sm">Start free — no credit card required. Cancel anytime.</p>
          </div>
          <a
            href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CAR_RENTAL&plan=FREE`}
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-semibold text-sm transition-all shadow-xl shadow-orange-600/20 shrink-0"
          >
            Start for free
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
    <footer className="bg-[#0f0500] border-t border-white/5 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Smapey Car Rental" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-white/60 text-sm font-semibold">Smapey Car Rental</span>
        </div>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </div>
    </footer>
  )
}

//////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////
export default function CarRentalGuideContent() {
  return (
    <main>
      <Hero />

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
