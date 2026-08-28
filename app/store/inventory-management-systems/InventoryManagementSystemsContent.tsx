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
  unique: {
    eyebrow: "Choosing a system",
    heading: "Four kinds of inventory management system, and who each one suits",
    intro:
      "The term describes everything from a paper ledger to enterprise software costing more per month than a small shop clears in profit. The honest answer is that the right one depends on your size.",
    blocks: [
      {
        h: "The notebook",
        p: "Free, instant, and genuinely fine until more than one person is selling or you carry more products than you can hold in your head. It fails quietly: the count drifts a little at a time, and you only find out during an inventory.",
      },
      {
        h: "The spreadsheet",
        p: "A real step up, and adequate for a slow-moving catalogue. It breaks when two people need it at once, when you are away from the computer, or when a formula gets overwritten and nobody notices for a month.",
      },
      {
        h: "Cloud POS with inventory built in",
        p: "Stock, sales, and customers in one place, reachable from a phone at the counter. This is where Smapey sits and where most small retail shops land, because the selling and the counting are the same act.",
      },
      {
        h: "ERP and warehouse systems",
        p: "Purchase orders, multi-site transfers, demand forecasting, and an implementation project to match. Worth it if you run distribution across locations. Considerable overkill for a shop with one counter.",
      },
    ],
  },
}

export default function InventoryManagementSystemsContent() {
  return <StoreLanding variant={variant} />
}
