import Link from "next/link"
import { SEO_ROUTES } from "../lib/routes"

function formatTitle(route: string) {
  if (!route) return "Home"

  return route
    .replace(/\//g, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
}

export default function InternalLinks() {
  // 🔀 shuffle
  const shuffled = [...SEO_ROUTES].sort(() => 0.5 - Math.random())

  // 🎯 pick 3
  const selected = shuffled.slice(0, 3)

  return (
   <section className="py-16 bg-gradient-to-b from-white to-gray-50">
  <div className="max-w-6xl mx-auto px-6">

    {/* HEADER */}
    <div className="text-center mb-10">
      <h2 className="text-2xl md:text-3xl font-bold">
        Continue Exploring Invoicing Tools
      </h2>
      <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
        Discover more guides, tools, and software to help you create invoices faster, track payments, and grow your business.
      </p>
    </div>

    {/* CARDS */}
    <div className="grid md:grid-cols-3 gap-6">
      {selected.map((route) => (
        <Link
          key={route}
          href={route}
          className="group relative border rounded-2xl p-6 bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-yellow-500 overflow-hidden"
        >

          {/* subtle hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-yellow-50 to-transparent" />

          {/* content */}
          <div className="relative z-10">

            {/* badge */}
            <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded-md">
              Guide
            </span>

            {/* title */}
            <h3 className="font-semibold text-lg mt-3 group-hover:text-yellow-600 transition">
              {formatTitle(route)}
            </h3>

            {/* description */}
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Learn how to use {formatTitle(route).toLowerCase()} to simplify invoicing, manage clients, and get paid faster.
            </p>

            {/* CTA */}
            <div className="mt-4 flex items-center text-sm font-medium text-yellow-600 group-hover:translate-x-1 transition">
              Read Guide →
            </div>

          </div>
        </Link>
      ))}
    </div>

  </div>
</section>
  )
}