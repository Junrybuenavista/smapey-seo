import "../globals.css"

export const metadata = {
  title: "Smapey Blog - Small Business Tips & Stories",
  description:
    "Real insights, tips, and stories from small business owners using Smapey. Written by the community, for the community.",
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
