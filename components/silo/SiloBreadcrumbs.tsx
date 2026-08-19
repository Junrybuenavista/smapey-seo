import Link from "next/link"
import { trailFor, type SiloContext } from "@/lib/silo"
import { INK, BLUE, MUTED, display } from "./tokens"

/**
 * Visible breadcrumb bar for every page inside the silo.
 *
 * The trail follows the silo hierarchy rather than the URL, which is the whole
 * point - a Tier 4 post sits at /blog/<slug> but reads as
 * Home > Boarding House Management System > Rent & Billing > Utility Billing > Post.
 * Pair it with breadcrumbSchema(path) so the markup and the JSON-LD agree.
 */
export default function SiloBreadcrumbs({ ctx }: { ctx: SiloContext | null }) {
  if (!ctx) return null
  const trail = trailFor(ctx)

  const crumbs = [{ path: "/", title: "Home" }, ...trail]

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full border-b-2 bg-white"
      style={{ borderColor: INK, ...display }}
    >
      <ol className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="font-bold" style={{ color: INK }}>
                  {crumb.title}
                </span>
              ) : (
                <>
                  <Link href={crumb.path} className="hover:underline" style={{ color: BLUE }}>
                    {crumb.title}
                  </Link>
                  <span aria-hidden style={{ color: MUTED }}>
                    ›
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
