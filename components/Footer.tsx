import Link from "next/link"
import { ALL_CLUSTERS, CLUSTERS } from "../lib/routes"

/**
 * The footer links to each product's hub, not to every page inside it.
 *
 * It used to render six pages per cluster - about 120 links on every page of
 * the site, which on a given page came to roughly 89% of all its links, nearly
 * all pointing at unrelated products. That spreads link equity thinly across
 * the whole site rather than letting it settle where a page is actually about
 * something, and outbound links are one of the signals search engines use to
 * work out what a page covers.
 *
 * Eighteen hub links keep discovery and cross-linking intact - each hub already
 * links to its own pages, so nothing becomes unreachable.
 */
export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-10">
          {/* BRAND */}
          <div className="lg:col-span-1 md:col-span-3 sm:col-span-2">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="SMAPEY Logo" className="w-6 h-6 object-contain" />
              <h3 className="text-xl font-extrabold text-blue-600">SMAPEY</h3>
            </div>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              Simple business software built for small businesses. Invoicing,
              gym management, booking, car rental, and essay grading, all in
              one place.
            </p>
            <Link
              href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
              className="inline-block mt-5 px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started Free
            </Link>
          </div>

          {/* PRODUCTS - one link per cluster, to its hub */}
          <div className="lg:col-span-5 md:col-span-3 sm:col-span-2">
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 text-sm text-gray-600">
              {ALL_CLUSTERS.map((key) => (
                <li key={key}>
                  <Link href={CLUSTERS[key].hub.path} className="hover:text-blue-600 transition">
                    {CLUSTERS[key].label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* LEGAL */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
            <Link href="/privacy-policy" className="hover:text-blue-600 transition">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-blue-600 transition">
              Terms of Service
            </Link>
            <Link href="/invoice/contact" className="hover:text-blue-600 transition">
              Contact
            </Link>
            <Link href="/invoice/faq" className="hover:text-blue-600 transition">
              FAQ
            </Link>
          </div>
          <p className="text-xs text-gray-500">
            🔒 Secure payments • Trusted by growing businesses
          </p>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Smapey. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
