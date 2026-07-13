import Link from "next/link"
import { ALL_CLUSTERS, CLUSTERS } from "../lib/routes"

const FOOTER_LINKS_PER_CLUSTER = 6

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* TOP: brand + per-cluster link columns */}
        <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-10">
          {/* BRAND */}
          <div className="lg:col-span-1 md:col-span-3 sm:col-span-2">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="SMAPEY Logo"
                className="w-6 h-6 object-contain"
              />
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

          {/* CLUSTERS */}
          {ALL_CLUSTERS.map((key) => {
            const cluster = CLUSTERS[key]
            const links = cluster.pages.slice(0, FOOTER_LINKS_PER_CLUSTER)
            return (
              <div key={key}>
                <h4 className="font-semibold mb-4">
                  <Link
                    href={cluster.hub.path}
                    className="hover:text-blue-600 transition"
                  >
                    {cluster.label}
                  </Link>
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {links.map((p) => (
                    <li key={p.path}>
                      <Link
                        href={p.path}
                        className="hover:text-blue-600 transition"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
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
