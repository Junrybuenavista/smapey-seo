import StoreLanding, { type StoreVariant } from "@/components/store/StoreLanding"

import type { BlogPost } from "@/lib/blog"

const variant: StoreVariant = {
  currentPath: "/store",
  navMode: "anchors",
  hero: {
    badge: "Inventory & POS management",
    titleLead: "Smarter inventory,",
    titleAccent: "faster sales.",
    subtitle:
      "Track stock levels, ring up sales on a tap-to-add POS, record who owes you utang, manage suppliers, and get daily revenue summaries, everything a small retail store needs, free forever.",
  },
  features: {
    eyebrow: "Features",
    heading: "Built for sari-sari stores, retail shops, and boutiques",
    sub: "From your first product to your hundredth daily sale, and every peso of utang in between, every essential a small store needs, without the enterprise price tag.",
  },
  cta: {
    heading: "Ready to take control of your inventory?",
    sub: "Free forever. No card, no trial. Add your products and start selling in under five minutes.",
  },
}

export default function StoreContent({ guides = [] }: { guides?: BlogPost[] }) {
  return <StoreLanding variant={variant} guides={guides} />
}
