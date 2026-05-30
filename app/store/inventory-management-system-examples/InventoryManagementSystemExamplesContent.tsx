import StoreLanding, { type StoreVariant } from "@/components/store/StoreLanding"

const variant: StoreVariant = {
  currentPath: "/store/inventory-management-system-examples",
  navMode: "page",
  hero: {
    badge: "Inventory management system examples",
    titleLead: "Inventory management system examples",
    titleAccent: "for every store type.",
    subtitle:
      "A sari-sari store tracking 40 products. A boutique watching stock on 120 SKUs. A hardware shop reordering nuts and bolts before they run out. These are real inventory management system examples — and Smapey handles all of them, free.",
  },
  features: {
    eyebrow: "Inventory System Examples",
    heading: "How different stores use an inventory management system",
    sub: "Whether you sell beverages, clothes, or hardware, the core job is the same: know what you have, know when to reorder, and know what's selling.",
  },
  cta: {
    heading: "See your own inventory management system in action.",
    sub: "Add your products, set reorder points, and start selling — free forever, no card required.",
  },
}

export default function InventoryManagementSystemExamplesContent() {
  return <StoreLanding variant={variant} />
}
