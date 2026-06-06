import "../globals.css"
import Script from "next/script"
import PageTracker from "../../components/PageTracker"

export const metadata = {
  title: "Smapey Food Ordering Manager",
  description: "Food ordering management software — menu builder, order tracking, kitchen queue, and daily sales for small restaurants and cafés.",
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
