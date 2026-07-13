import "../globals.css"
import Script from "next/script"


export const metadata = {
  title: "Smapey Airbnb / Short-term Rentals",
  description: "Airbnb and short-term rental management software, properties, guests, reservations, and revenue analytics.",
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

        {children}
      </body>
    </html>
  )
}
