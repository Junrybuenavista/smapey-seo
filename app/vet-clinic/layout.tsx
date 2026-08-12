import "../globals.css"

export const metadata = {
  title: "Smapey Vet Clinic Manager",
  description: "Veterinary clinic management system for pets, appointments, vaccinations, and billing.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
