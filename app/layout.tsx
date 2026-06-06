import "./globals.css"
import Script from "next/script"
import PageTracker from "../components/PageTracker"

export const metadata = {
  metadataBase: new URL("https://smapey.com"),
  title: "Smapey",
  description: "Invoicing software that helps you get paid faster",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>

        {/* Google Analytics */}
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

        <PageTracker page="home" />
        {children}
      </body>
    </html>
  )
}