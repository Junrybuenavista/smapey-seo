import "../globals.css"

export const metadata = {
  title: "Smapey Food Ordering Manager",
  description: "Food ordering management software, menu builder, order tracking, kitchen queue, and daily sales for small restaurants and cafés.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
