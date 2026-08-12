import "../globals.css"

export const metadata = {
  title: "Smapey Lending - Loan & Lending Management Software",
  description: "Lending management software for lenders, borrowers, loans, amortization schedules, payment tracking, and collections analytics.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
