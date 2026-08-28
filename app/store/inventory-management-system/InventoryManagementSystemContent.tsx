import StoreLanding, { type StoreVariant } from "@/components/store/StoreLanding"

const variant: StoreVariant = {
  currentPath: "/store/inventory-management-system",
  navMode: "page",
  hero: {
    badge: "Inventory management system",
    titleLead: "The inventory management system",
    titleAccent: "built for small stores.",
    subtitle:
      "Smapey is an inventory management system for sari-sari stores, boutiques, hardware shops, and mini groceries. Track stock in real time, get low stock alerts, run a POS, and view daily sales, all from one browser-based dashboard.",
  },
  features: {
    eyebrow: "Inventory Management System",
    heading: "Manage your inventory without the enterprise price tag",
    sub: "Most inventory management systems are built for warehouses with a thousand SKUs. Smapey is built for the store with one shelf, and priced accordingly.",
  },
  cta: {
    heading: "An inventory management system that fits your store.",
    sub: "Free forever for small retailers. No setup cost, no long-term contract, no IT team required.",
  },
  unique: {
    eyebrow: "How it works",
    heading: "What an inventory management system actually does",
    intro:
      "The phrase covers a lot of ground. In practice a system earns its place by handling four things a notebook or a spreadsheet cannot do reliably once you get busy.",
    blocks: [
      {
        h: "Stock that moves by itself",
        p: "Every completed sale deducts the right quantity from the right product automatically, and voiding a sale puts the stock back. The count stops depending on someone remembering to update it, which is where manual tracking always breaks down first.",
      },
      {
        h: "Reorder points that warn you early",
        p: "Set a threshold per product and the system tells you what is running low before it runs out, with the supplier already linked so you know who to call. Running out of your best seller costs more than carrying it did.",
      },
      {
        h: "A history you can audit",
        p: "Restocks, sales, manual adjustments, and stock returned by voided sales are logged with the date, quantity, supplier, and any note you added. When a physical count does not match, you can trace where the units went instead of guessing.",
      },
      {
        h: "Real profit, not just revenue",
        p: "The cost price is captured at the moment of each sale, so your margin stays accurate even after you change a price later. Revenue tells you how busy you were; this tells you whether it was worth it.",
      },
    ],
  },
}

export default function InventoryManagementSystemContent() {
  return <StoreLanding variant={variant} />
}
