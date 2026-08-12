import "../globals.css"
import Navbar from "./Navbar"

export const metadata = {
  title: "Smapey",
  description: "Invoicing software that helps you get paid faster",
}

export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}