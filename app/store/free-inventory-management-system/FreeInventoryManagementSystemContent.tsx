import StoreLanding, { type StoreVariant } from "@/components/store/StoreLanding"

const variant: StoreVariant = {
  currentPath: "/store/free-inventory-management-system",
  navMode: "page",
  hero: {
    badge: "Free inventory management system",
    titleLead: "Free inventory management",
    titleAccent: "for small stores.",
    subtitle:
      "Smapey's free plan gives you 50 products, 200 sales per month, low stock alerts, a built-in POS, supplier management, and unlimited customer utang tracking, permanently free, no credit card, no trial expiry.",
  },
  features: {
    eyebrow: "Free Inventory Management",
    heading: "Everything you need, free forever",
    sub: "The free plan isn't a 14-day trial. It's a real plan with real limits that work for most small stores, upgrade only when your volume grows.",
  },
  cta: {
    heading: "Start with a free inventory management system today.",
    sub: "50 products, 200 sales per month, full POS, unlimited utang tracking, free forever. No card needed.",
  },
  unique: {
    eyebrow: "The free plan, in full",
    heading: "What free actually includes here, and exactly where it stops",
    intro:
      "Free plans are usually a trial with the clock hidden. This one is not, so it is worth being precise about the real limits rather than letting you discover them later.",
    blocks: [
      {
        h: "What you get, permanently",
        p: "50 products with full stock tracking, 200 sales a month through the POS, reorder thresholds, low stock alerts, stock adjustment logs, supplier links, and 2 team members. No credit card to sign up and no expiry date.",
      },
      {
        h: "What stays unlimited",
        p: "Customer records and utang tracking are unlimited on every plan, free included. The limits are on products and monthly sales, never on how many people you extend credit to or how much of it you are tracking.",
      },
      {
        h: "Where you would outgrow it",
        p: "The product count is usually what you hit first: a hardware store passes 50 items quickly, while a food stall may never get there. The 200-sale ceiling works out to roughly seven sales a day, so a busy counter reaches it long before a quiet one does.",
      },
      {
        h: "What does not change when you upgrade",
        p: "The POS, the utang ledger, barcode scanning, and the analytics are the same tools on every plan. Paying lifts the ceilings; it does not unlock a different product.",
      },
    ],
  },
}

export default function FreeInventoryManagementSystemContent() {
  return <StoreLanding variant={variant} />
}
