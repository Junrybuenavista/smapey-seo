import "../globals.css"
import Script from "next/script"

export const metadata = {
  title: "Smapey Blog - Small Business Tips & Stories",
  description:
    "Real insights, tips, and stories from small business owners using Smapey. Written by the community, for the community.",
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
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
