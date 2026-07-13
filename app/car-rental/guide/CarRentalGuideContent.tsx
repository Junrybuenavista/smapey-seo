"use client"

import { useState, useEffect } from "react"
import { CheckCircle2,
  Car, UserPlus, Key, CreditCard, AlertCircle, BarChart3,
  ChevronRight, Zap, BookOpen, ArrowLeft,
  Globe, Palette, MessageSquare, ArrowRightCircle, QrCode, Bell, ImagePlus,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

const GUIDES = [
  {
    id: "add-vehicle",
    icon: Car,
    title: "Add Your First Vehicle",
    badge: "Getting Started",
    description: "Learn how to register a vehicle in your fleet, set its status, and make it available for rentals.",
    steps: [
      { title: "Open the Fleet tab", detail: "From your car rental dashboard sidebar, click Fleet. This shows all your registered vehicles and their current status." },
      { title: 'Click "Add Vehicle"', detail: "Hit the Add Vehicle button in the top-right corner. A form will open where you can enter all vehicle details." },
      { title: "Enter vehicle details", detail: "Fill in the make, model, plate number, and daily rate. These details appear on every rental created for this vehicle." },
      { title: "Set vehicle status", detail: "New vehicles default to Available. You can set them to Maintenance if they're not yet ready to rent." },
      { title: "Save the vehicle", detail: "Click Save. The vehicle is now part of your fleet and can be selected when creating a new rental reservation." },
    ],
    tip: "Add your daily rate when creating the vehicle, it auto-fills the rental amount field when you create a reservation for that car.",
  },
  {
    id: "register-customer",
    icon: UserPlus,
    title: "Register a Customer",
    badge: "All Plans",
    description: "Create a customer profile before creating their first rental. Customer records store contact info and full rental history.",
    steps: [
      { title: "Open the Customers tab", detail: "Click Customers in the sidebar. This lists all registered customers along with their status and rental count." },
      { title: 'Click "Add Customer"', detail: "Hit Add Customer to open the registration form. All fields you fill in here are linked to every future rental for this person." },
      { title: "Enter customer details", detail: "Enter the customer's full name, phone number, email address, and driver's license number. License number is important for dispute tracking." },
      { title: "Save the customer", detail: "Click Save. The customer is now in your system and can be assigned to new rental reservations." },
    ],
    tip: "Customers with completed rentals can't be hard-deleted, use Deactivate instead to hide them from active views without losing their rental history.",
  },
  {
    id: "create-reservation",
    icon: Key,
    title: "Create a Rental Reservation",
    badge: "All Plans",
    description: "Create a new rental by assigning a vehicle and customer, setting pickup and return dates, and recording a deposit.",
    steps: [
      { title: "Open the Rentals tab", detail: "Click Rentals in the sidebar. This shows all active, reserved, returned, overdue, and cancelled rentals." },
      { title: 'Click "New Rental"', detail: "Hit New Rental to open the reservation form. You'll need a vehicle and customer already registered before proceeding." },
      { title: "Select the vehicle and customer", detail: "Choose the vehicle from the dropdown - only Available vehicles appear. Then select the customer from your registered customers list." },
      { title: "Set pickup and return dates", detail: "Enter the pickup date and expected return date. The system uses these to calculate the rental duration and flag overdue vehicles." },
      { title: "Add deposit and location details", detail: "Enter the deposit amount collected and the pickup/return locations if applicable. These fields are optional but recommended." },
      { title: "Save as Reserved or Active", detail: "Save as Reserved if the customer hasn't picked up the car yet. Change to Active when they do. The vehicle status updates automatically." },
    ],
    tip: "Once a vehicle is in an Active or Reserved rental, it's removed from available inventory and can't be double-booked.",
  },
  {
    id: "track-deposits",
    icon: CreditCard,
    title: "Track Deposits",
    badge: "All Plans",
    description: "Record deposits at booking time so you always know what's been collected before a vehicle leaves the lot.",
    steps: [
      { title: "Enter deposit when creating a rental", detail: "The deposit amount field appears in the New Rental form. Enter the amount the customer paid upfront before picking up the vehicle." },
      { title: "View deposit on the rental record", detail: "Open any rental to see the deposit amount alongside the total rental amount. Both figures are visible on the rental detail page." },
      { title: "Update deposit if needed", detail: "If a customer pays an additional deposit, open the rental record and edit the deposit field. Changes save immediately." },
      { title: "Review deposits in your revenue report", detail: "Your revenue dashboard shows total rental amounts. Cross-reference with deposit fields to track what's been pre-collected vs. still owed." },
    ],
    tip: "Always record the deposit before marking a rental Active, this creates an accurate paper trail in case of disputes or damage claims.",
  },
  {
    id: "handle-overdue",
    icon: AlertCircle,
    title: "Handle Overdue Rentals",
    badge: "All Plans",
    description: "Overdue rentals are automatically flagged when the return date passes. Here's how to find and resolve them quickly.",
    steps: [
      { title: "Check the Overdue count on your dashboard", detail: "Your car rental dashboard shows an Overdue count in the summary cards. Any non-zero value needs immediate attention." },
      { title: "Filter by Overdue status in Rentals", detail: "Go to Rentals and filter by Overdue. The list shows every rental that's passed its return date and is still Active." },
      { title: "Contact the customer", detail: "Open the rental record to see the customer's phone number and email. Reach out to confirm a new return date or report a vehicle issue." },
      { title: "Update the return date if extended", detail: "If the customer is keeping the car longer, edit the rental and push the return date forward. This clears the overdue flag." },
      { title: "Mark as Returned when the car comes back", detail: "When the vehicle is returned, open the rental and click Return. The vehicle status changes back to Available for the next booking." },
    ],
    tip: "Overdue status is set automatically at midnight when the return date passes. Check your dashboard first thing each morning to catch them early.",
  },
  {
    id: "revenue-dashboard",
    icon: BarChart3,
    title: "Read Your Revenue Dashboard",
    badge: "All Plans",
    description: "Understand your rental business performance through revenue totals, fleet utilization, and rental trends.",
    steps: [
      { title: "Open the Dashboard", detail: "The car rental dashboard loads automatically when you enter the module. Summary cards appear at the top with key real-time metrics." },
      { title: "Read the summary cards", detail: "Cards show: Available vehicles, Active rentals, Overdue count, and Monthly revenue. These update live as rentals are created or returned." },
      { title: "Check the Monthly Revenue chart", detail: "The bar chart shows rental revenue by month. Hover over a bar to see the exact figure. Compare months to spot seasonal trends." },
      { title: "Review Upcoming Returns", detail: "The Upcoming Returns section lists active rentals sorted by return date - so you can prepare for handoffs today, tomorrow, and this week." },
      { title: "Monitor fleet utilization", detail: "Divide active rentals by total fleet size to see your utilization rate. High utilization means your fleet is working. Low means idle inventory." },
    ],
    tip: "If monthly revenue is flat but rental count is up, check your daily rates, vehicles might be underpriced relative to demand.",
  },
  {
    id: "public-booking-page",
    icon: Globe,
    title: "Set Up Your Public Booking Page",
    badge: "All Plans",
    description: "Create a public page where customers can browse your fleet and submit booking inquiries, no login required on their end.",
    steps: [
      { title: "Open Public Page settings", detail: "In your car rental dashboard sidebar, click Public Page. This is where you configure your public-facing booking URL and design." },
      { title: "Set your unique slug", detail: "Enter a short, memorable slug (e.g. your business name). Your public page will be live at smapey.com/rent/your-slug. Slugs must be unique across all Smapey accounts." },
      { title: "Save the slug", detail: "Click Save Slug. Once saved, the public page is immediately live. Anyone with the link can browse your vehicles and submit an inquiry." },
      { title: "Share your booking link", detail: "Copy the public page URL and add it to your Google Maps listing, Facebook page, Instagram bio, or wherever customers contact you. This is your 24/7 online booking intake." },
    ],
    tip: "Put your public page link in your Google Maps Business profile under the website or booking URL field, customers searching nearby will see it directly in Google Maps.",
  },
  {
    id: "deposit-qr",
    icon: QrCode,
    title: "Set Up a Deposit QR Code",
    badge: "All Plans",
    description: "Upload a QR code to your public booking page so customers can scan and pay their deposit directly, no manual payment link sharing needed.",
    steps: [
      { title: "Open Public Page settings", detail: "Go to Public Page in the sidebar. Scroll down to the Deposit section below the page design selector." },
      { title: "Upload your QR code image", detail: "Click the QR code upload area and select your payment QR image - typically your GCash, Maya, or bank QR code. PNG or JPG files both work." },
      { title: "Your QR appears on your booking page", detail: "Once uploaded, a Deposit Required section appears on your public booking page. Customers can scan the QR code to pay their deposit before pickup - without any back-and-forth messaging." },
      { title: "Update or remove the QR code", detail: "To swap it out, upload a new image - the old one is replaced immediately. To remove it entirely, click the remove button next to the uploaded QR image." },
    ],
    tip: "Use your GCash or Maya QR code for the fastest customer experience. Displaying it directly on your booking page cuts the number of messages you receive asking for payment details.",
  },
  {
    id: "page-design",
    icon: Palette,
    title: "Choose & Personalize Your Page Design",
    badge: "PRO / ENTERPRISE",
    description: "Pick from 5 unique page designs to match your brand, then personalize any theme with a cover photo, tagline, and accent color. PRO unlocks 3 designs; ENTERPRISE unlocks all 5.",
    steps: [
      { title: "Open Public Page settings", detail: "Go to Public Page in the sidebar. Below the slug field you'll find the Page Design section with a visual preview of each available theme." },
      { title: "Preview the available designs", detail: "Five designs are shown: Midnight (dark, orange), Clean (minimal white), Ocean (navy glassmorphism), Forest (dark green angular), and Luxury (gold editorial). Locked designs show a lock icon with your required plan." },
      { title: "Click a design to apply it", detail: "Clicking an unlocked design saves it immediately - your public page updates live. No separate save button needed." },
      { title: "Set a cover photo", detail: "In the Personalize section below the theme selector, upload a cover photo. It displays as a full-width hero image at the top of your public page. Works on all 5 themes." },
      { title: "Add a tagline", detail: "Enter a short tagline (e.g. \"Affordable rides across the city\"). It appears below your business name on the public page - a quick way to set your brand tone." },
      { title: "Pick an accent color", detail: "Choose a hex color for your accent. Buttons, borders, and highlights on your public page will use this color. Works on all themes so your brand color always comes through." },
      { title: "Upgrade to unlock more designs", detail: "FREE plan includes Midnight only. PRO adds Clean and Ocean. ENTERPRISE unlocks Forest and Luxury. Upgrade in Settings → Billing." },
    ],
    tip: "Midnight and Ocean work well for premium fleets; Clean is ideal if most customers find you on mobile. Set your accent color to match your logo for a fully branded booking page.",
  },
  {
    id: "manage-inquiries",
    icon: MessageSquare,
    title: "Manage Booking Inquiries",
    badge: "All Plans",
    description: "Review and respond to booking requests submitted through your public page. Approve to proceed, reject to decline with a record kept.",
    steps: [
      { title: "Open the Inquiries tab", detail: "Click Inquiries in the sidebar. All submissions from your public page appear here sorted by date, showing customer name, vehicle, dates, and status." },
      { title: "Read the inquiry details", detail: "Each row shows the customer's name, phone, requested vehicle, pickup/return dates, and any notes they left. Click a row to expand full details." },
      { title: "Approve or Reject", detail: "Hit Approve to confirm the request or Reject to decline it. Both actions update the inquiry status immediately. Rejected inquiries stay on record but are visually marked." },
      { title: "Follow up with the customer", detail: "After approving, use the customer's phone number shown in the inquiry to confirm details directly. The customer isn't notified automatically - outreach is manual." },
    ],
    tip: "FREE plan supports up to 15 inquiries per month. PRO supports 200. ENTERPRISE is unlimited. Check your plan limit in Public Page settings if inquiries stop coming through.",
  },
  {
    id: "convert-to-rental",
    icon: ArrowRightCircle,
    title: "Convert an Inquiry to a Rental",
    badge: "All Plans",
    description: "Turn an approved inquiry into a live rental reservation in one click. Customer records are created automatically if the customer is new.",
    steps: [
      { title: "Find an approved inquiry", detail: "Go to Inquiries and filter by Approved, or look for the green Approved badge. Only approved inquiries can be converted." },
      { title: 'Click "Convert to Rental"', detail: "The Convert to Rental button appears on every approved inquiry that hasn't been converted yet. Click it to start the conversion." },
      { title: "Customer is created automatically", detail: "If the customer's phone number isn't already in your system, a new customer profile is created using the name and phone from the inquiry. No manual data entry needed." },
      { title: "Rental is created and you're redirected", detail: "A new rental reservation is created with the vehicle, customer, and dates from the inquiry. You're taken to the Rentals tab automatically to review and activate it." },
      { title: "Inquiry is marked as converted", detail: "The original inquiry shows a Rental Created badge. The Convert button disappears - each inquiry can only produce one rental to prevent duplicates." },
    ],
    tip: "Converting an inquiry doesn't automatically mark the rental Active. Review the rental record, confirm any deposit details, then change the status to Active when the customer picks up the car.",
  },
  {
    id: "booking-notifications",
    icon: Bell,
    title: "Get Notified of New Inquiries",
    badge: "All Plans",
    description: "Smapey notifies you instantly when a customer submits a booking inquiry from your public page, no manual refreshing needed.",
    steps: [
      { title: "A customer submits an inquiry", detail: "When someone fills out and submits the booking form on your public page, the system creates the inquiry and immediately sends a notification to your account." },
      { title: "The bell badge lights up", detail: "A red badge with a count appears on the notification bell in your dashboard header. You'll see it the next time you're on any page in the dashboard - no refresh needed." },
      { title: "Click the bell to see the notification", detail: "Click the bell icon to open the notification panel. You'll see a card that shows the customer's name, vehicle, and dates - along with a \"Tap to view inquiries →\" hint." },
      { title: "Click the notification to go directly to inquiries", detail: "Clicking the notification closes the panel, navigates you to the Booking Inquiries page, and refreshes the list automatically - so the new inquiry is always at the top." },
    ],
    tip: "Notifications are delivered to all OWNER and ADMIN accounts in your organization, so your whole team stays in the loop when a new booking request comes in.",
  },
  {
    id: "vehicle-photos",
    icon: ImagePlus,
    title: "Upload Vehicle Photos",
    badge: "All Plans",
    description: "Add a photo to each vehicle so customers can see exactly what they're renting on your public booking page, before they submit an inquiry.",
    steps: [
      { title: "Open the Fleet tab", detail: "Go to Fleet in the sidebar. Your registered vehicles are listed here with their current status and a thumbnail if a photo has been uploaded." },
      { title: "Open Add Vehicle or Edit an existing one", detail: "Click Add Vehicle to create a new one, or click the edit icon on any existing vehicle. The vehicle form includes a photo upload area at the top." },
      { title: "Upload a vehicle photo", detail: "Click the photo upload zone and select an image file from your device. You'll see a preview of the photo immediately inside the form before saving." },
      { title: "Save the vehicle", detail: "Click Save. The photo is uploaded to the cloud and linked to that vehicle. It now shows as a thumbnail in the fleet list and as a full image on your public booking page." },
      { title: "Replace or remove a photo", detail: "To replace a photo, open the vehicle edit form and upload a new image - the old one is overwritten. To remove it entirely, click the remove button that appears on the photo preview." },
    ],
    tip: "Use clean, well-lit photos taken from the front or 3/4 angle, customers decide faster when they can clearly see the car. Photos display at full width on your public booking page across all 5 themes.",
  },
]

const accentFor = (i: number) => (i % 2 === 0 ? BLUE : AMBER)
const onAccent = (c: string) => (c === AMBER ? INK : "#fff")

function useFont() {
  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link"); l.id = id; l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-16" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
        <div className="absolute rounded-[22px] border-2" style={{ top: "30%", right: "-70px", width: 280, height: 78, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 pt-12 pb-14">
        <a href="/car-rental" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mb-8 hover:opacity-60" style={{ color: "#54514c" }}>
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Car Rental
        </a>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
          <BookOpen className="w-3 h-3" /> User Guide
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
          Car Rental Documentation
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed" style={{ color: "#54514c" }}>
          Everything you need to run your car rental business on Smapey, from adding your first vehicle to reading your monthly revenue.
        </p>
          <div className="flex flex-wrap items-center justify-start gap-6 text-xs font-semibold mt-8" style={{ color: "#54514c" }}>
            {["5-minute setup", "No training required", "Free plan available"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />{t}</span>
            ))}
          </div>
        <div className="flex flex-wrap gap-2.5 mt-8">
          {GUIDES.map((g, i) => {
            const Icon = g.icon
            const c = accentFor(i)
            return (
              <a key={g.id} href={`#${g.id}`} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border-2 text-xs font-bold transition-transform hover:-translate-y-0.5" style={{ color: INK, borderColor: INK }}>
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

function Sidebar() {
  const [activeId, setActiveId] = useState<string>("")
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { for (const entry of entries) { if (entry.isIntersecting) setActiveId(entry.target.id) } },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    )
    GUIDES.forEach((g) => { const el = document.getElementById(g.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])
  return (
    <aside className="hidden lg:block w-60 shrink-0">
      <div className="sticky top-24">
        <p className="text-xs font-bold uppercase tracking-widest mb-4 px-3" style={{ color: "#9a948b" }}>On this page</p>
        <nav className="flex flex-col gap-1.5">
          {GUIDES.map((g, i) => {
            const Icon = g.icon
            const isActive = activeId === g.id
            const c = accentFor(i)
            return (
              <a key={g.id} href={`#${g.id}`} onClick={() => setActiveId(g.id)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-[12px] text-sm transition-all duration-200 border-2"
                style={isActive ? { background: INK, color: "#fff", borderColor: INK, fontWeight: 700 } : { background: "transparent", color: "#54514c", borderColor: "transparent", fontWeight: 600 }}>
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
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border-2 text-xs font-bold mb-2" style={{ background: "#fff", color: INK, borderColor: INK }}>{guide.badge}</span>
          <h2 className="text-xl font-extrabold" style={{ color: INK }}>{guide.title}</h2>
          <p className="text-sm mt-1 leading-relaxed" style={{ color: "#54514c" }}>{guide.description}</p>
        </div>
      </div>
      <div className="rounded-[20px] border-2 overflow-hidden" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>
        {guide.steps.map((step, i) => (
          <div key={i} className="flex gap-4 p-5" style={i < guide.steps.length - 1 ? { borderBottom: "1px solid rgba(22,22,22,.1)" } : undefined}>
            <span className="w-7 h-7 rounded-full border-2 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5" style={{ background: c, color: onAccent(c), borderColor: INK }}>{i + 1}</span>
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
            <span className="font-bold">Tip: </span>{guide.tip}
          </p>
        </div>
      )}
    </div>
  )
}

function CTA() {
  return (
    <section className="py-16 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[28px] border-2 p-10 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
          <div>
            <h3 className="text-2xl font-extrabold mb-2" style={{ color: INK }}>Ready to manage your fleet?</h3>
            <p className="text-sm font-medium" style={{ color: "#5c4a28" }}>Start free, no credit card required. Cancel anytime.</p>
          </div>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CAR_RENTAL&plan=FREE`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5 shrink-0" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
            Start for free <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Smapey Car Rental" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-sm font-extrabold" style={{ color: INK }}>Car Rental by Smapey</span>
        </div>
        <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function CarRentalGuideContent() {
  useFont()
  return (
    <main style={{ fontFamily: display.fontFamily }}>
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
      <CTA />
      <InternalLinks cluster="car-rental" currentPath="/car-rental/guide" />
      <Footer />
    </main>
  )
}
