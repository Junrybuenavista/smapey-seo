// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Can I use a regular washing machine for a laundry business?",
    a: "You can start with one, and many Philippine drop-off shops genuinely do, but plan for it to wear out quickly. The limit is not build quality in the abstract, it is duty cycle: a household machine is designed around a handful of loads a week, and a shop runs that many before lunch. The parts that fail first are the ones under constant load, meaning bearings, the drive belt or motor coupling, the suspension and the pump. If you start this way, treat it as a deliberate temporary step and put the replacement cost in your plan from the beginning rather than being surprised by it.",
  },
  {
    q: "How many washing machines do I need for a laundry shop?",
    a: "Work it out rather than guessing. Weigh a few real customer bags to get your average, decide how many bags a day you are targeting, then divide your operating hours by the machine's full cycle time to get cycles per machine per day, subtracting a realistic allowance for loading, unloading and gaps when nobody is free to swap a load. Capacity in kilos times realistic cycles gives kilos per machine per day; divide your daily target by that for the machine count. Then add one, because a machine down for repair on a Monday costs more than the machine did.",
  },
  {
    q: "What size washing machine is best for a laundry business?",
    a: "Capacity is quoted as the dry weight of clothes the drum is rated for, not the wet weight and not the drum volume. The right size is whatever matches your actual bags: if a typical drop-off in your area is five to eight kilos, a machine that forces you to split every bag across two cycles is costing you throughput, and one so large you run it half empty is wasting water and power on every load. Weigh real bags from your own neighbourhood before deciding.",
  },
  {
    q: "Should I buy front load or top load machines for a laundry business?",
    a: "For a shop the argument usually runs toward front loaders. They generally use less water per kilo and reach higher spin speeds, which extracts more water and shortens drying time, and they are gentler on fabric with no agitator. Top loaders are usually cheaper to buy, easier to load without bending, and often have shorter cycles. At shop volumes the water and electricity difference is not a rounding error, which is why the higher purchase price of a front loader frequently makes sense in a business where a household buyer would choose the top loader.",
  },
  {
    q: "How many dryers do I need compared to washers?",
    a: "Usually more dryer capacity than you expect, and this is the mistake that quietly caps a shop's throughput. Drying generally takes longer than washing, so a shop that buys washers and dryers one for one ends up with washers finishing loads that have nowhere to go and wet laundry stacking in baskets. Plan dryer capacity against washer output rather than washer count. A higher spin speed on the washer helps directly, because every litre the washer extracts is one the dryer does not have to evaporate.",
  },
  {
    q: "Can I air dry instead of buying dryers in the Philippines?",
    a: "Not if you are promising a turnaround time. In much of the country the rainy season makes line drying unreliable for months at a stretch, and humidity slows it considerably even when it is not raining. A shop that commits to same-day or next-day service needs drying it controls, which means machines. Air drying can supplement on good days; it cannot be the plan.",
  },
  {
    q: "Are second-hand or reconditioned commercial laundry machines worth buying?",
    a: "Often yes, and plenty of working Philippine shops run on them. The real question is not whether reconditioned machines are acceptable but whether the seller will still answer the phone when a bearing goes. Ask what specifically was replaced during reconditioning, whether spare parts are stocked in the country, who services the machine, how quickly they can come out and what a call-out costs. A cheap machine with no parts supply is not cheap.",
  },
  {
    q: "What does my building need before I can install laundry machines?",
    a: "Check all of it before signing a lease, because none of it is cheap to change afterwards. You need a water supply that arrives fast enough for several machines running at once, which often means a storage tank and pump; drainage that can take several machines discharging together; an electrical supply that matches what the machines draw, including three-phase power if they need it; safe LPG storage and siting if you are using gas dryers; and a floor that can carry heavy, vibrating machines with working room around them for loading and servicing. Confirm the specifics with your City or Municipal Engineering Office and the Bureau of Fire Protection, since requirements vary by location.",
  },
]
