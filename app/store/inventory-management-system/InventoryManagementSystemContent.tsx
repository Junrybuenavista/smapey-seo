import StoreLanding, { type StoreVariant } from "@/components/store/StoreLanding"

const variant: StoreVariant = {
  currentPath: "/store/inventory-management-system",
  navMode: "page",
  hero: {
    badge: "Inventory management system",
    titleLead: "The inventory management system",
    titleAccent: "built for small stores.",
    subtitle:
      "Smapey is an inventory management system for sari-sari stores, boutiques, hardware shops, and mini groceries. Track stock in real time, get low stock alerts, run a POS, and view daily sales — all from one browser-based dashboard.",
  },
  features: {
    eyebrow: "Inventory Management System",
    heading: "Manage your inventory without the enterprise price tag",
    sub: "Most inventory management systems are built for warehouses with a thousand SKUs. Smapey is built for the store with one shelf — and priced accordingly.",
  },
  cta: {
    heading: "An inventory management system that fits your store.",
    sub: "Free forever for small retailers. No setup cost, no long-term contract, no IT team required.",
  },
}

export default function InventoryManagementSystemContent() {
  return <StoreLanding variant={variant} />
}
