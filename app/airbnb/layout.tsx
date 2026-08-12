import "../globals.css"

export const metadata = {
  title: "Smapey Airbnb / Short-term Rentals",
  description: "Airbnb and short-term rental management software, properties, guests, reservations, and revenue analytics.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
