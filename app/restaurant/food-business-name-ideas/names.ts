// Kept out of the client content module so the server page can count the names
// for its title and description. The count is never typed by hand.
//
// Every name is a generic idea, not a known chain's brand. Readers are told to
// check DTI and IPOPHL before using one, because generic names get registered.
//
// Groups are chosen to match how Filipinos actually describe a food business —
// carinderia, food cart, bakery, milk tea, home kitchen — rather than the
// American categories a generic listicle uses.

export interface NameIdea { name: string; note?: string }
export interface NameGroup { id: string; title: string; heading: string; intro: string; names: NameIdea[] }

export const NAME_GROUPS: NameGroup[] = [
  {
    id: "carinderia",
    title: "Carinderia and silog",
    heading: "Carinderia, silog and turo-turo names",
    intro: "For a neighbourhood eatery serving rice meals. The name should feel like somewhere you eat every day, not somewhere you book a table.",
    names: [
      { name: "Lutong Bahay Carinderia", note: "lutong bahay means home-cooked" },
      { name: "Kusina ni Nanay", note: "kusina means kitchen" },
      { name: "Busog Carinderia", note: "busog means full after eating" },
      { name: "Sarap Silog House", note: "sarap means delicious" },
      { name: "Silog Avenue" },
      { name: "Ulam Express", note: "ulam is the dish eaten with rice" },
      { name: "Kainan sa Kanto", note: "the eatery on the corner" },
      { name: "Tapsi Corner", note: "tapsi is short for tapsilog" },
      { name: "Hain Carinderia", note: "hain means to serve the food" },
      { name: "Sabaw at Kanin", note: "soup and rice" },
      { name: "Handa ni Ate", note: "handa means prepared food" },
      { name: "Masarap Turo-Turo", note: "masarap means delicious" },
      { name: "Panlasang Pinoy Eatery", note: "panlasa means palate" },
      { name: "Unli Rice Carinderia" },
      { name: "Lami Kaayo Eatery", note: "Bisaya for very delicious" },
      { name: "Subo Carinderia", note: "subo means a mouthful" },
    ],
  },
  {
    id: "street-food",
    title: "Street food and food cart",
    heading: "Street food and food cart names",
    intro: "A cart name has to work shouted across a street and printed small. Short wins. Two syllables wins more.",
    names: [
      { name: "Siomai Stop" }, { name: "Ihaw Ihaw Express", note: "ihaw means to grill" },
      { name: "Kwek Kwek Korner" }, { name: "Fishball Station" },
      { name: "Sizzling Streets" }, { name: "Grill Sarge" },
      { name: "Takaw Cart", note: "takaw means to crave" },
      { name: "Isaw King" }, { name: "Snack Attack Cart" },
      { name: "Gutom Buster", note: "gutom means hungry" },
      { name: "Pares Point" }, { name: "Street Bites PH" },
    ],
  },
  {
    id: "catchy",
    title: "Catchy and punny",
    heading: "Catchy and funny food business names",
    intro: "A pun customers repeat. It works as long as the food type is still obvious somewhere on the sign.",
    names: [
      { name: "Wok This Way" }, { name: "Grill Power" }, { name: "Pound Cake Town" },
      { name: "Lord of the Wings" }, { name: "Curry On" }, { name: "Rice Rice Baby" },
      { name: "Pita Pan" }, { name: "The Codfather" }, { name: "Life of Pie" },
      { name: "Brew Can Do It" }, { name: "Nacho Average Kitchen" }, { name: "Sarap Happens", note: "sarap means delicious" },
    ],
  },
  {
    id: "filipino",
    title: "Filipino and Taglish",
    heading: "Filipino and Taglish food business names",
    intro: "A Tagalog or Bisaya word says you cook like home, and it is far less likely to be registered already. Choose one that spells itself when a customer searches.",
    names: [
      { name: "Sarap Kitchen", note: "sarap means deliciousness" },
      { name: "Timplada Foods", note: "timpla means the blend or mix" },
      { name: "Lasa Lokal", note: "lasa means taste" },
      { name: "Luto ni Lola", note: "luto means cooking" },
      { name: "Tikim Food House", note: "tikim means a taste or sample" },
      { name: "Merienda Manila", note: "merienda is the afternoon snack" },
      { name: "Pasalubong Pantry", note: "pasalubong is a treat brought home" },
      { name: "Tindahan ni Tita", note: "tindahan means store" },
      { name: "Ihawan sa Baryo", note: "the grill house in the village" },
      { name: "Bagong Luto", note: "freshly cooked" },
      { name: "Gutom na Gutom Grill", note: "very hungry" },
      { name: "Sarap Sarap Foods", note: "doubled for emphasis" },
    ],
  },
  {
    id: "bakery",
    title: "Bakery, cakes and desserts",
    heading: "Bakery, cake and dessert business names",
    intro: "Sweet businesses sell on warmth. The name can be softer than a grill house and still say what is in the case.",
    names: [
      { name: "Flour & Butter" }, { name: "The Daily Loaf" }, { name: "Sugar Lane Bakeshop" },
      { name: "Crumb & Co." }, { name: "Panaderia Luz", note: "panaderia means bakery" },
      { name: "Sweet Hain Desserts", note: "hain means to serve" },
      { name: "Mantika at Asukal", note: "butter and sugar" },
      { name: "Rise & Bake" }, { name: "Little Oven Bakeshop" },
      { name: "Matamis Dessert Bar", note: "matamis means sweet" },
      { name: "Buttercream Barrio" }, { name: "Pandesal Pantry" },
    ],
  },
  {
    id: "drinks",
    title: "Milk tea, coffee and drinks",
    heading: "Milk tea, coffee and drinks business names",
    intro: "Drinks shops live on the cup and the Instagram tag, so the name has to look good small and typed as a hashtag.",
    names: [
      { name: "Timpla Coffee", note: "timpla means the blend" },
      { name: "Cup & Kettle" }, { name: "Sip Street" }, { name: "Boba Barrio" },
      { name: "Kape Kanto", note: "kape means coffee" },
      { name: "The Shake Shed" }, { name: "Chill & Sip" },
      { name: "Lamig Drinks Co.", note: "lamig means cold" },
      { name: "Brew Barrio" }, { name: "Milk Tea Lane" },
    ],
  },
  {
    id: "homemade",
    title: "Homemade, online and rice retail",
    heading: "Homemade, online food and bigasan names",
    intro: "For a kitchen that sells through Facebook and Messenger, or a rice store. Put your own name in it: customers buy from a person, and your name is almost never taken.",
    names: [
      { name: "Luto ni Maria Home Kitchen" }, { name: "Kusina Delivered" },
      { name: "Bahay Bakeshop", note: "bahay means house" },
      { name: "Order sa Messenger Kitchen" }, { name: "Home Cooked PH" },
      { name: "Bigasan ni Mang Tonyo", note: "bigasan means rice store" },
      { name: "Sako't Salop Bigasan", note: "sack and the rice measure" },
      { name: "Kanin Korner Rice Store", note: "kanin means cooked rice" },
      { name: "Premium Grains Bigasan" }, { name: "Rice Haven" },
    ],
  },
]

export const NAME_COUNT = NAME_GROUPS.reduce((n, g) => n + g.names.length, 0)

// Food businesses name their menu groupings, not service tiers. These are the
// sets that actually appear on a Philippine price board.
export const MENU_SETS: { names: string[]; note?: string }[] = [
  { names: ["Solo", "Barkada", "Family"], note: "sized by how many are eating" },
  { names: ["Silog Classics", "Ihaw Specials", "Merienda"], note: "grouped by when people order" },
  { names: ["Budget Meal", "Regular", "Sulit Meal"], note: "sulit means worth the money" },
  { names: ["Short Order", "Rice Meals", "Pampalamig"], note: "pampalamig means cold drinks" },
  { names: ["Starter", "Ulam", "Panghimagas"], note: "panghimagas means dessert" },
]

export const TAGLINES: { line: string; note?: string }[] = [
  { line: "Lutong bahay, araw-araw.", note: "home cooking, every day" },
  { line: "Sulit na sarap.", note: "deliciousness worth the price" },
  { line: "Cooked fresh, served hot." },
  { line: "Busog ka, balik ka.", note: "eat your fill, come back again" },
  { line: "Masarap. Mura. Malapit.", note: "delicious, cheap, nearby" },
  { line: "The taste of home, two streets away." },
  { line: "Kain na!", note: "let's eat" },
  { line: "Every plate, like we cooked it for family." },
]
