import "../globals.css"

export const metadata = {
  title: "Smapey Catering Manager",
  description: "Catering management software for Philippine catering businesses, bookings, packages, supply catalog, payment milestones, and staff assignment.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
