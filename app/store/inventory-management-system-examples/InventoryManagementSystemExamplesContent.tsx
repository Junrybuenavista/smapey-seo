import StoreLanding, { type StoreVariant } from "@/components/store/StoreLanding"

const variant: StoreVariant = {
  currentPath: "/store/inventory-management-system-examples",
  navMode: "page",
  hero: {
    badge: "Inventory management system examples",
    titleLead: "Inventory management system examples",
    titleAccent: "for every store type.",
    subtitle:
      "A sari-sari store tracking 40 products. A boutique watching stock on 120 SKUs. A hardware shop reordering nuts and bolts before they run out. These are real inventory management system examples, and Smapey handles all of them, free.",
  },
  features: {
    eyebrow: "Inventory System Examples",
    heading: "How different stores use an inventory management system",
    sub: "Whether you sell beverages, clothes, or hardware, the core job is the same: know what you have, know when to reorder, know what's selling, and know who still owes you.",
  },
  cta: {
    heading: "See your own inventory management system in action.",
    sub: "Add your products, set reorder points, and start selling, free forever, no card required.",
  },
  unique: {
    eyebrow: "Worked examples",
    heading: "What the same system looks like in four different shops",
    intro:
      "Feature lists read the same everywhere. What is useful is seeing which features actually carry the day in a particular kind of store.",
    blocks: [
      {
        h: "Sari-sari store",
        p: "High transaction count, low value per sale, and a lot of suki credit. The utang ledger and the change calculator do the heavy lifting here; barcode scanning matters less when much of the catalogue is loose goods you know by sight.",
      },
      {
        h: "Hardware store",
        p: "Hundreds of items that look alike and a real cost to stocking out. Barcode scanning, reorder thresholds, and a supplier linked to each product are the difference between a fast counter and a slow one.",
      },
      {
        h: "Mini grocery",
        p: "Fast-moving goods on margins thin enough that mispricing hurts. Capturing cost price at the point of sale keeps the profit figure honest, and the top-sellers report tells you what to keep deep.",
      },
      {
        h: "Boutique or specialty shop",
        p: "Fewer items, higher value, and customers who come back. Product photos taken in the app make the catalogue browsable, and customer history turns a one-time buyer into a regular you can recognize by name.",
      },
    ],
  },
}

export default function InventoryManagementSystemExamplesContent() {
  return <StoreLanding variant={variant} />
}
