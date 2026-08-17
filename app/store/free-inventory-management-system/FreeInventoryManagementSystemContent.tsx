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
}

export default function FreeInventoryManagementSystemContent() {
  return <StoreLanding variant={variant} />
}
