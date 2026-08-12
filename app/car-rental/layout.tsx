import "../globals.css"

export const metadata = {
  title: "Smapey Car Rental",
  description: "Car rental software for small businesses, manage your fleet, customers, and rentals in one place.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
