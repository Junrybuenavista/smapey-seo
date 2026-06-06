import "../globals.css"
import Script from "next/script"
import PageTracker from "../../components/PageTracker"

export const metadata = {
  title: "Smapey Lending — Loan & Lending Management Software",
  description: "Lending management software for lenders — borrowers, loans, amortization schedules, payment tracking, and collections analytics.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KJHG5R9G1S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KJHG5R9G1S');
          `}
        </Script>
        <PageTracker />
        {children}
      </body>
    </html>
  )
}
