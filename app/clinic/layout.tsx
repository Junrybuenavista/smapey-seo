import "../globals.css"

export const metadata = {
  title: "Smapey Clinic Manager",
  description: "Clinic management system for patients, doctors, appointments, and live queue boards.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
