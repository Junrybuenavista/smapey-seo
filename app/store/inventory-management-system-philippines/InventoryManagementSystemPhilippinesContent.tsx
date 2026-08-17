import StoreLanding, { type StoreVariant } from "@/components/store/StoreLanding"

const variant: StoreVariant = {
  currentPath: "/store/inventory-management-system-philippines",
  navMode: "page",
  hero: {
    badge: "Inventory management system · Philippines",
    titleLead: "Inventory management system",
    titleAccent: "for Philippine stores.",
    subtitle:
      "Built for sari-sari stores, hardware shops, mini groceries, and retail boutiques across the Philippines. Track stock in real time, ring up sales in pesos, accept GCash and Maya, record suki utang without a notebook, and get low stock alerts before you run out.",
  },
  features: {
    eyebrow: "Philippines Inventory System",
    heading: "Made for Filipino small businesses",
    sub: "Peso pricing, GCash and Maya at POS, a proper utang ledger that replaces the lista notebook, and Philippine-friendly plan pricing, Smapey is the inventory management system Filipino store owners have been looking for.",
  },
  cta: {
    heading: "The inventory management system Philippine stores need.",
    sub: "Free forever. Philippine peso pricing. GCash and Maya at POS. Unlimited utang tracking. No credit card required.",
  },
}

export default function InventoryManagementSystemPhilippinesContent() {
  return <StoreLanding variant={variant} />
}
