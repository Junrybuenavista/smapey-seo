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
  unique: {
    eyebrow: "Built for Philippine retail",
    heading: "What a Philippine store needs that generic inventory software leaves out",
    intro:
      "Most inventory systems assume every sale is paid in full, on the spot, by card. Philippine retail does not work that way, and the gaps show up on day one.",
    blocks: [
      {
        h: "Utang is a feature, not a workaround",
        p: "Suki credit is normal here, so it is built into the POS rather than bolted on afterwards. Pick the customer, enter what they are paying now, and the rest is recorded as their balance. Payments apply to the oldest unpaid sale first, and each sale moves from Utang to Partial to Paid on its own. Set a credit limit per customer and checkout is blocked before you ring up a sale they cannot cover.",
      },
      {
        h: "GCash and Maya at the counter",
        p: "Upload a screenshot of your own GCash, Maya, or bank QR once. When a customer picks QR at checkout, your code fills the screen with the total, they scan it on their phone, and you tap Payment Received. No merchant account, no card terminal, and no per-transaction cut to a payment processor.",
      },
      {
        h: "Pesos, including the change math",
        p: "Prices, costs, profit, and every dashboard total are in pesos. For cash sales you enter the amount tendered and the change is calculated for you, which is the part that actually slows down a busy counter.",
      },
      {
        h: "Sized for a sari-sari store, not a warehouse",
        p: "The free plan covers 50 products and 200 sales a month, which is a real small shop rather than a trial that expires. Customer records and utang stay unlimited on every plan, including the free one.",
      },
    ],
  },
}

export default function InventoryManagementSystemPhilippinesContent() {
  return <StoreLanding variant={variant} />
}
