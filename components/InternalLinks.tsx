import Link from "next/link"
import { CLUSTERS, ClusterKey } from "../lib/routes"

type Props = {
  cluster?: ClusterKey
  heading?: string
  subheading?: string
  currentPath?: string
  limit?: number
}

export default function InternalLinks({
  cluster = "invoice",
  heading,
  subheading,
  currentPath,
  limit,
}: Props) {
  const data = CLUSTERS[cluster]
  const pool = data.pages.filter((p) => p.path !== currentPath)
  const selected = typeof limit === "number" ? pool.slice(0, limit) : pool

  const defaultHeading =
    cluster === "invoice"
      ? "Continue Exploring Invoicing Tools"
      : `More from ${data.label}`
  const defaultSub =
    cluster === "invoice"
      ? "Guides, tools, and software to help you invoice faster, track payments, and grow your business."
      : `Guides and tools to help you make the most of ${data.label}.`

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">{heading ?? defaultHeading}</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{subheading ?? defaultSub}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {selected.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="group relative border rounded-2xl p-6 bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-yellow-500 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-yellow-50 to-transparent" />

              <div className="relative z-10">
                <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded-md">
                  {data.label}
                </span>

                <h3 className="font-semibold text-lg mt-3 group-hover:text-yellow-600 transition">
                  {route.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  {route.desc}
                </p>

                <div className="mt-4 flex items-center text-sm font-medium text-yellow-600 group-hover:translate-x-1 transition">
                  Read more →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
