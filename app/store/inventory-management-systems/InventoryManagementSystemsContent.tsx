import StoreLanding, { type StoreVariant } from "@/components/store/StoreLanding"

const variant: StoreVariant = {
  currentPath: "/store/inventory-management-systems",
  navMode: "page",
  hero: {
    badge: "Inventory management systems",
    titleLead: "Inventory management systems",
    titleAccent: "made simple.",
    subtitle:
      "Most inventory management systems are over-engineered and overpriced. Smapey gives small stores real-time stock tracking, low stock alerts, a built-in POS, and daily revenue summaries, without the complexity or the cost.",
  },
  features: {
    eyebrow: "Inventory Management Systems",
    heading: "What a good inventory management system actually needs",
    sub: "You need to know what you have, when to reorder, and what's selling. Smapey does exactly that, nothing more, nothing less.",
  },
  cta: {
    heading: "The inventory management system your store actually needs.",
    sub: "Free plan forever. No implementation project, no training course, no annual contract.",
  },
}

export default function InventoryManagementSystemsContent() {
  return <StoreLanding variant={variant} />
}
