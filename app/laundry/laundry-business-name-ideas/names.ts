// Kept out of the client content module so the server page can count the names
// for its title and description. The count is never typed by hand.
//
// Every name is a generic idea, not a known chain's brand. Readers are told to
// check DTI and IPOPHL before using one, because generic names get registered.
//
// Tagalog glosses are given for every Filipino name. A reader who does not
// speak the word should still understand why it suits a laundry shop.

export interface NameIdea { name: string; note?: string }
export interface NameGroup { id: string; title: string; heading: string; intro: string; names: NameIdea[] }

export const NAME_GROUPS: NameGroup[] = [
  {
    id: "classic",
    title: "Classic and clean",
    heading: "Classic laundry shop names",
    intro: "Clear about what you do and easy to read on a tarpaulin from across the street. These age well and never need explaining.",
    names: [
      { name: "Fresh Fold Laundry" }, { name: "Clean Press Laundry" }, { name: "Daily Wash Laundry Shop" },
      { name: "Pure Linen Laundry" }, { name: "The Laundry Room" }, { name: "Crisp & Clean Laundry" },
      { name: "Soft Touch Laundry" }, { name: "Clear Water Laundry" }, { name: "Neat Stack Laundry" },
      { name: "First Rinse Laundry" }, { name: "White Label Laundry" }, { name: "Everyday Laundry Shop" },
      { name: "Clean Cotton Laundry" }, { name: "The Wash House" }, { name: "Bright Linen Laundry" },
      { name: "Simply Fresh Laundry" },
    ],
  },
  {
    id: "catchy",
    title: "Catchy and fun",
    heading: "Catchy and funny laundry business names",
    intro: "A pun customers repeat to a neighbour. Funny works as long as the word laundry is still somewhere on the sign.",
    names: [
      { name: "Suds & Buds Laundry" }, { name: "Spin Doctor Laundry" }, { name: "Load & Go Laundry" },
      { name: "Tumble Time Laundry" }, { name: "Soap Opera Laundry" }, { name: "The Spin Cycle" },
      { name: "Lost Sock Laundry" }, { name: "Fold Mine Laundry" }, { name: "Wash Wash Baby" },
      { name: "Dirty Laundry Shop", note: "works as a joke only if the signage is spotless" },
      { name: "Sud's Up Laundry" }, { name: "Rub a Dub Laundry" },
      { name: "Spin City Laundry" }, { name: "Fluff Enough Laundry" }, { name: "Press Start Laundry" },
      { name: "Hang Time Laundry" },
    ],
  },
  {
    id: "filipino",
    title: "Filipino and Taglish",
    heading: "Filipino and Taglish laundry business names",
    intro: "A Tagalog word tells customers you are from here, and it sticks in the memory better than an English one. Choose a word that is easy to spell, because people will type it to find you.",
    names: [
      { name: "Labada Express", note: "labada means laundry" },
      { name: "Mabango Laundry", note: "mabango means fragrant" },
      { name: "Presko Laundry Shop", note: "presko means fresh" },
      { name: "Malinis Laundry", note: "malinis means clean" },
      { name: "Banlaw Laundry", note: "banlaw means rinse" },
      { name: "Puting Puti Laundry", note: "puting puti means pure white" },
      { name: "Labandera's Laundry", note: "labandera means laundrywoman" },
      { name: "Bagong Labada", note: "freshly laundered" },
      { name: "Plantsadong Perfect", note: "plantsado means pressed" },
      { name: "Tupi Laundry Shop", note: "tupi means fold" },
      { name: "Sabon at Tubig Laundry", note: "soap and water" },
      { name: "Amoy Bago Laundry", note: "smells brand new" },
      { name: "Labahan ni Aling Rosa", note: "labahan means washing place" },
      { name: "Linis Lahat Laundry", note: "everything clean" },
      { name: "Araw-Araw Laundry", note: "araw-araw means every day" },
      { name: "Suki Laundry Shop", note: "suki means a regular customer" },
    ],
  },
  {
    id: "self-service",
    title: "Self-service and coin",
    heading: "Self-service and coin laundry names",
    intro: "For a shop where customers run the machines themselves. The name should say so, or you will spend all day explaining it at the counter.",
    names: [
      { name: "Coin & Spin Laundromat" }, { name: "Self Serve Suds" }, { name: "Drop a Coin Laundry" },
      { name: "24/7 Wash Station" }, { name: "Quick Coin Laundromat" }, { name: "Wash Bar Self-Service" },
      { name: "Sarili Mong Labada", note: "your own laundry" },
      { name: "Piso Wash Laundromat", note: "piso is the one-peso coin" },
    ],
  },
  {
    id: "premium",
    title: "Premium and dry cleaning",
    heading: "Dry cleaning and premium laundry names",
    intro: "For a shop taking barongs, gowns, suits and uniforms. The name has to sound careful with an expensive garment.",
    names: [
      { name: "The Garment Care Co." }, { name: "Atelier Clean" }, { name: "Fine Fabric Laundry & Dry Clean" },
      { name: "Heritage Dry Cleaners" }, { name: "Barong & Co. Garment Care" },
      { name: "Signature Press Dry Cleaning" }, { name: "Silk & Linen Care" },
      { name: "Ingat Garment Care", note: "ingat means take care" },
    ],
  },
  {
    id: "delivery",
    title: "Pickup and delivery",
    heading: "Pickup and delivery laundry names",
    intro: "For a service that collects from the customer's door. Put the collection in the name and you answer the first question before they ask it.",
    names: [
      { name: "Wash on Wheels" }, { name: "Doorstep Laundry" }, { name: "Pickup & Press" },
      { name: "We Collect Laundry" }, { name: "Sundo Labada", note: "sundo means to fetch" },
      { name: "Laundry Delivered" }, { name: "Hatid Labada", note: "hatid means to deliver" },
      { name: "Door to Door Laundry Co." },
    ],
  },
]

export const NAME_COUNT = NAME_GROUPS.reduce((n, g) => n + g.names.length, 0)

// Laundry shops sell by service, not by vehicle size, so the tiers name what
// happens to the clothes rather than how long it takes.
export const SERVICE_SETS: { names: string[]; note?: string }[] = [
  { names: ["Wash & Fold", "Wash, Dry & Fold", "Full Service"], note: "the plainest set, and the easiest to price per kilo" },
  { names: ["Basic Labada", "Labada Plus", "Labada Premium"] },
  { names: ["Quick Wash", "Everyday", "Deluxe Care"] },
  { names: ["Banlaw", "Tupi", "Plantsa"], note: "rinse, fold, press" },
  { names: ["Student Bundle", "Family Bundle", "Household Bundle"], note: "sized by load, not by service" },
]

export const TAGLINES: { line: string; note?: string }[] = [
  { line: "Drop it off. Pick it up folded." },
  { line: "Labada tapos, araw mo libre.", note: "laundry done, your day is free" },
  { line: "Clean clothes, zero effort." },
  { line: "Mabango, malinis, mabilis.", note: "fragrant, clean, fast" },
  { line: "Same day in by 9, out by 6." },
  { line: "We wash. You rest." },
  { line: "Your clothes, treated like ours." },
  { line: "Sulit na labada, every kilo.", note: "laundry that's worth it" },
]
