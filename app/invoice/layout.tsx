import "../globals.css"
import Script from "next/script"
import Navbar from "./Navbar"

export const metadata = {
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
        <Navbar /> {/* ✅ This is fine */}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QN3CFDFYNB"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-QN3CFDFYNB');
          `}
        </Script>

        {children}
      </body>
    </html>
  )
}