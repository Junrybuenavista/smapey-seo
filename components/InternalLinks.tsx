import Link from "next/link"
import { CLUSTERS, ClusterKey } from "../lib/routes"

type Props = {
  cluster?: ClusterKey
  heading?: string
  subheading?: string
  currentPath?: string
  limit?: number
}

const CLUSTER_ACCENT: Partial<Record<ClusterKey, {
  border: string; bg: string; text: string; badge: string; badgeBg: string
}>> = {
  "vet-clinic": {
    border: "hover:border-emerald-500",
    bg: "from-emerald-50",
    text: "group-hover:text-emerald-600",
    badge: "text-emerald-600",
    badgeBg: "bg-emerald-100",
  },
  clinic: {
    border: "hover:border-blue-500",
    bg: "from-blue-50",
    text: "group-hover:text-blue-600",
    badge: "text-blue-600",
    badgeBg: "bg-blue-100",
  },
  gym: {
    border: "hover:border-violet-500",
    bg: "from-violet-50",
    text: "group-hover:text-violet-600",
    badge: "text-violet-600",
    badgeBg: "bg-violet-100",
  },
}

const DEFAULT_ACCENT = {
  border: "hover:border-yellow-500",
  bg: "from-yellow-50",
  text: "group-hover:text-yellow-600",
  badge: "text-yellow-600",
  badgeBg: "bg-yellow-100",
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
  const accent = CLUSTER_ACCENT[cluster] ?? DEFAULT_ACCENT

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
              className={`group relative border rounded-2xl p-6 bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${accent.border} overflow-hidden`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r ${accent.bg} to-transparent`} />

              <div className="relative z-10">
                <span className={`text-xs font-medium ${accent.badge} ${accent.badgeBg} px-2 py-1 rounded-md`}>
                  {data.label}
                </span>

                <h3 className={`font-semibold text-lg mt-3 ${accent.text} transition`}>
                  {route.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  {route.desc}
                </p>

                <div className={`mt-4 flex items-center text-sm font-medium ${accent.badge} group-hover:translate-x-1 transition`}>
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
