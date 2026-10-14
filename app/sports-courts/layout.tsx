import "../globals.css"

export const metadata = {
  title: "Smapey Sports Courts",
  description: "Court booking system for Philippine pickleball, badminton, tennis and padel venues",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
