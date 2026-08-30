import Link from "next/link"
import type { BlogPost } from "@/lib/blog"

/**
 * The guides a product cluster is responsible for.
 *
 * This is the missing half of the link graph. InternalLinks already points a
 * hub at its sibling product pages; nothing pointed a hub at the blog posts
 * that actually earn its traffic - six of the site's top ten pages by clicks
 * are /blog/* guides, and until now no page linked to any of them.
 *
 * Takes plain data rather than fetching, because it renders inside the client
 * Content components. The fetch happens in the hub's server page.tsx (see
 * postsForHub in lib/blog.ts) and the array is passed down; a client component
 * still server-renders its first paint, so these links ship in the HTML.
 */

const HUB_COPY: Record<string, { heading: string; sub: string }> = {
  "/water-refilling": {
    heading: "Starting a water refilling station?",
    sub: "Permits, equipment, capital and the DOH rules, written for Philippine owners.",
  },
  "/laundry": {
    heading: "Starting a laundry business?",
    sub: "Capital, machines, sanitation permits and the three business models, for Philippine owners.",
  },
  "/massage": {
    heading: "Starting a massage or spa business?",
    sub: "Permits, pricing, therapists and day-to-day operations, for Philippine owners.",
  },
  "/school-desk": {
    heading: "Starting a tutorial center?",
    sub: "Requirements, setup and enrolment, written for Philippine owners.",
  },
  "/clinic": {
    heading: "Running a clinic?",
    sub: "Practical guides on records, scheduling and clinic operations.",
  },
  "/vet-clinic": {
    heading: "Running a veterinary clinic?",
    sub: "Practical guides on patient records, scheduling and clinic operations.",
  },
  "/catering": {
    heading: "Starting a catering business?",
    sub: "Costing, packages and operations, written for Philippine owners.",
  },
  "/store": {
    heading: "Running a store?",
    sub: "Inventory, utang, suppliers and daily sales, for Philippine retailers.",
  },
  "/restaurant": {
    heading: "Running a restaurant?",
    sub: "Ordering, kitchen flow and payments, written for Philippine owners.",
  },
  "/airbnb": {
    heading: "Running a short-term rental?",
    sub: "Turnover, cleaning and guest management for Philippine hosts.",
  },
  "/car-rental": {
    heading: "Running a car rental business?",
    sub: "Bookings, fleet and operations, written for Philippine owners.",
  },
  "/lending": {
    heading: "Running a lending business?",
    sub: "Practical guides on collections, records and day-to-day operations.",
  },
}

// ── Layered Pop tokens, matching InternalLinks.tsx ──
const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

export default function HubGuides({
  posts,
  hubPath,
}: {
  posts: BlogPost[]
  hubPath: string
}) {
  if (!posts || posts.length === 0) return null

  const copy = HUB_COPY[hubPath] ?? {
    heading: "Guides for your business",
    sub: "Practical guides from the Smapey blog.",
  }

  return (
    <section className="py-20 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: AMBER }}>
          From the blog
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: INK }}>
          {copy.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed" style={{ color: "#54514c" }}>
          {copy.sub}
        </p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => {
            const c = i % 2 === 0 ? BLUE : AMBER
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-[22px] p-6 border-2 bg-white transition-transform hover:-translate-y-1 flex flex-col"
                style={{ borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}
              >
                <h3 className="font-extrabold text-lg leading-snug mb-2" style={{ color: INK }}>
                  {post.title}
                </h3>
                <span
                  className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-bold group-hover:translate-x-1 transition-transform"
                  style={{ color: c === AMBER ? INK : BLUE }}
                >
                  Read the guide →
                </span>
              </Link>
            )
          })}
        </div>

        <Link
          href="/blog"
          className="mt-10 inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full border-2 transition-transform hover:-translate-y-0.5"
          style={{ background: "#fff", color: INK, borderColor: INK }}
        >
          Browse all guides →
        </Link>
      </div>
    </section>
  )
}
