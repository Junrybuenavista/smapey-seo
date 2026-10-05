// Kept out of the client content module so the server page can count the names
// for its title and description. The count is never typed by hand.
//
// Every name is a generic idea, not a known chain's brand. Readers are told to
// check DTI and IPOPHL before using one, because generic names get registered.

export interface NameIdea { name: string; note?: string }
export interface NameGroup { id: string; title: string; heading: string; intro: string; names: NameIdea[] }

export const NAME_GROUPS: NameGroup[] = [
  {
    id: "classic",
    title: "Classic and clean",
    heading: "Classic and clean car wash names",
    intro: "Easy to remember and clear about what you do. These read well on a tarpaulin and on a map pin.",
    names: [
      { name: "Spotless Car Wash" }, { name: "Clean Slate Car Wash" }, { name: "Sparkle Point Car Wash" },
      { name: "Fresh Coat Car Wash" }, { name: "Shine Station" }, { name: "Crystal Clear Car Wash" },
      { name: "Clean Lane Car Wash" }, { name: "Gleam Team Car Wash" }, { name: "Pristine Auto Wash" },
      { name: "True Shine Car Wash" }, { name: "Brightside Car Wash" }, { name: "Daily Shine Car Wash" },
      { name: "Neat Street Car Wash" }, { name: "Mirror Image Car Wash" }, { name: "Clean Machine Car Wash" },
      { name: "Simply Clean Car Wash" },
    ],
  },
  {
    id: "catchy",
    title: "Catchy and fun",
    heading: "Catchy and funny car wash names",
    intro: "A pun people repeat to their friends. Funny names work best when the service is still obvious.",
    names: [
      { name: "Suds City" }, { name: "Bubble Trouble Car Wash" }, { name: "Foam Sweet Foam" },
      { name: "Rinse & Repeat Car Wash" }, { name: "Wash & Roll" }, { name: "The Suds Stop" },
      { name: "Soap Opera Car Wash" }, { name: "Lather Up Car Wash" }, { name: "Splash Point" },
      { name: "Good Clean Fun Car Wash" }, { name: "Scrub Hub" }, { name: "Drip Drop Car Wash" },
      { name: "Hose & Shine" }, { name: "Clean Getaway Car Wash" }, { name: "Mud to Mint Car Wash" },
      { name: "Squeaky Clean Car Wash" },
    ],
  },
  {
    id: "filipino",
    title: "Filipino and Taglish",
    heading: "Filipino and Taglish car wash names",
    intro: "A local word sticks, and it tells customers you're from here. Pick one that's easy to spell when someone searches for you.",
    names: [
      { name: "Kintab Car Wash", note: "kintab means shine" },
      { name: "Kislap Car Wash", note: "kislap means sparkle" },
      { name: "Kinis Auto Spa", note: "kinis means smoothness" },
      { name: "Kinang Car Wash", note: "kinang means gleam" },
      { name: "Bula Bros Car Wash", note: "bula means foam" },
      { name: "Linis Agad Car Wash", note: "cleaned right away" },
      { name: "Kuskos Car Wash", note: "kuskos means scrub" },
      { name: "Banlaw Car Wash", note: "banlaw means rinse" },
      { name: "Hugas Kotse Express", note: "hugas kotse means car wash" },
      { name: "Ningning Car Wash", note: "ningning means brilliance" },
      { name: "Bagong Ligo Car Wash", note: "freshly bathed" },
      { name: "Pogi Car Wash", note: "pogi means good-looking" },
      { name: "Ganda Lagi Auto Spa", note: "always beautiful" },
      { name: "Bango Car Wash", note: "bango means fragrance" },
      { name: "Bida Car Wash", note: "bida means the star" },
      { name: "Suki Car Wash", note: "suki means a regular customer" },
      { name: "Kumikinang Car Wash", note: "kumikinang means shining" },
      { name: "Sulit Wash", note: "sulit means worth it" },
    ],
  },
  {
    id: "motor-wash",
    title: "Motor wash names",
    heading: "Motor wash names",
    intro: "For a shop that washes motorcycles, or wants riders to know they're welcome.",
    names: [
      { name: "Moto Kintab" }, { name: "Rider's Rinse" }, { name: "Two-Wheel Shine" },
      { name: "Bike Bath Motor Wash" }, { name: "Moto Spa" }, { name: "Chain & Shine Motor Wash" },
      { name: "Throttle Shine" }, { name: "Kickstand Motor Wash" }, { name: "Revv & Rinse" },
      { name: "Ride Clean Motor Wash" }, { name: "Motor Kislap" },
      { name: "Gulong Shine", note: "gulong means wheel" },
    ],
  },
  {
    id: "detailing",
    title: "Detailing and premium",
    heading: "Car detailing and premium names",
    intro: "For a shop that sells detailing, ceramic coating or a premium wash, where the name has to justify the price.",
    names: [
      { name: "Gloss Lab Auto Detailing" }, { name: "Detail District" }, { name: "Showroom Shine Auto Spa" },
      { name: "Mirror Finish Detailing" }, { name: "Ceramic Corner" }, { name: "Paint Perfect Auto Spa" },
      { name: "Fine Line Detailing" }, { name: "Deep Clean Auto Studio" }, { name: "The Detail Garage" },
      { name: "Clear Coat Club" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile and home service",
    heading: "Mobile car wash names",
    intro: "For washes that come to the customer's home or office.",
    names: [
      { name: "Wash on Wheels" }, { name: "Doorstep Detail" }, { name: "Suds to You" },
      { name: "We Come to Wash" }, { name: "Park & Shine Mobile Wash" }, { name: "Driveway Detailing" },
      { name: "Mobile Kintab" },
      { name: "Hugas sa Bahay Mobile Wash", note: "sa bahay means at home" },
    ],
  },
]

export const NAME_COUNT = NAME_GROUPS.reduce((n, g) => n + g.names.length, 0)

export const PACKAGE_SETS: { names: string[]; note?: string }[] = [
  { names: ["Quick Rinse", "Full Shine", "Showroom"] },
  { names: ["Express", "Deluxe", "Signature"] },
  { names: ["Basic", "Plus", "Kintab Special"] },
  { names: ["Banlaw", "Kuskos", "Kinang"], note: "rinse, scrub, gleam" },
  { names: ["Bronze", "Silver", "Gold"] },
]

export const TAGLINES: { line: string; note?: string }[] = [
  { line: "Pulled in dusty, drive out proud." },
  { line: "Linis na, kintab pa.", note: "clean, and shiny too" },
  { line: "Your car, looking new again." },
  { line: "From dusty to dazzling." },
  { line: "Every car, every time, spotless." },
  { line: "We do the scrubbing. You do the driving." },
  { line: "Sulit na linis, every visit.", note: "a clean that's worth it" },
  { line: "Shine you can see from the road." },
]
