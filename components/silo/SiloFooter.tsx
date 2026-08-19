import Link from "next/link"
import { INK, CREAM, display } from "./tokens"

/**
 * Minimal footer for pages inside the boarding-house silo.
 *
 * The shared site footer renders every page of all eighteen product clusters -
 * 120 links, which on a silo page came to about 89% of every link on it,
 * pointing at invoicing, salons, and lending. That works directly against what
 * the silo is for: the structure exists to concentrate authority on one page,
 * and a sitewide link dump spreads it everywhere instead. It also blurs the
 * topic, since outbound links are one of the signals for what a page is about.
 *
 * Navigation within the topic is already handled in-content, and better -
 * breadcrumbs, deeper guides, related hubs, and the upward modules. This keeps
 * only what a footer genuinely needs. Mirrors the money page, which has always
 * carried its own minimal footer.
 */
export default function SiloFooter() {
  return (
    <footer
      className="px-6 py-8"
      style={{ background: CREAM, borderTop: `2px solid ${INK}`, ...display }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-sm font-extrabold" style={{ color: INK }}>
            Boarding House by Smapey
          </span>
        </div>

        <div className="flex items-center gap-5 text-xs font-semibold" style={{ color: "#6b6660" }}>
          <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
          <Link href="/terms-and-conditions" className="hover:underline">Terms</Link>
          <Link href="/invoice/contact" className="hover:underline">Contact</Link>
        </div>

        <p className="text-xs" style={{ color: "#9a948b" }}>
          © {new Date().getFullYear()} Smapey. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
