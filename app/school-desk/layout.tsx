import "../globals.css"
import Script from "next/script"

export const metadata = {
  title: "Smapey SchoolDesk",
  description: "Tutorial center and tutor management software for the Philippines",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-QN3CFDFYNB" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QN3CFDFYNB');`}
        </Script>
        {children}
      </body>
    </html>
  )
}
