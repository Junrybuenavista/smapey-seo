export const metadata = {
  title: "Smapey Blog — Small Business Tips & Stories",
  description:
    "Real insights, tips, and stories from small business owners using Smapey. Written by the community, for the community.",
  alternates: {
    canonical: "https://smapey.com/blog",
  },
  openGraph: {
    title: "Smapey Blog — Small Business Tips & Stories",
    description:
      "Real insights, tips, and stories from small business owners using Smapey. Written by the community, for the community.",
    url: "https://smapey.com/blog",
    type: "website",
  },
}

import BlogContent from "./BlogContent"

export default function Page() {
  return <BlogContent />
}
