import "./globals.css"
import Script from "next/script"
import PageTracker from "../components/PageTracker"
import SiloClickTracker from "../components/silo/SiloClickTracker"
import ReferralCapture from "../components/ReferralCapture"
import JsonLd from "../components/JsonLd"
import { organizationSchema, webSiteSchema } from "../lib/seo"

export const metadata = {
  metadataBase: new URL("https://smapey.com"),
  // No `template` here on purpose: all 148 pages already carry their own
  // brand suffix (including sub-brands like "Smapey GymOS"), so a template
  // would double it. This default only covers pages that set no title.
  title: "Smapey - Simple Management Software for Small Businesses",
  description:
    "Smapey builds simple management software for small businesses - invoicing, gyms, salons, rentals, clinics, boarding houses, and more. Free plan available.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <JsonLd schema={[organizationSchema(), webSiteSchema()]} />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KJHG5R9G1S"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Skip the config call inside an iframe, so the thumbnails on the
            // app's Site Pages screen don't register as pageviews. gtag.js
            // sends nothing until a property is configured. See PageTracker.
            if (window.top === window.self) {
              gtag('js', new Date());
              gtag('config', 'G-KJHG5R9G1S');
            }
          `}
        </Script>

        <PageTracker />
        {/* Inert unless a link carries data-silo-*, so it costs nothing off-silo */}
        <SiloClickTracker />
        <ReferralCapture />
        {children}
      </body>
    </html>
  )
}