// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "What should a laundry shop business plan include?",
    a: "The standard sections, with laundry-specific content in each: an executive summary written last; a statement of which of the three models you are opening; a market section that counts the surrounding blocks rather than describing the national market; services and pricing including your turnaround promise; an operations and capacity section; compliance covering permits and laundry-specific sanitation; financials with startup capital, working capital, monthly costs, revenue projections and break-even; and a risks section naming the real risks of this trade. The capacity section is the one generic templates omit and the one that decides whether the plan holds together.",
  },
  {
    q: "How do I calculate break-even for a laundry business?",
    a: "Work out your contribution per kilo, which is the price you charge per kilo minus the variable cost of washing that kilo. Divide your monthly fixed costs by that contribution to get the kilos per month you must process to break even, then divide by operating days for a daily figure. Then compare that daily number against two things: your machine capacity, and how many kilos plausibly exist within walking distance. If break-even needs more than your machines can move, the plan is impossible. If it needs more than your catchment holds, you are betting on drawing customers from further away.",
  },
  {
    q: "Why does a laundry business plan need a capacity section?",
    a: "Because a laundry is a throughput business. Its ceiling is not demand in the abstract but the number of kilos the machines can physically move in a day, and no amount of marketing gets past it. State daily capacity in kilos and show the calculation, state dryer capacity separately since drying usually takes longer than washing and therefore sets the real ceiling, show the week rather than a flat average because laundries are busy at the start and end of the week, and say what happens to capacity when a machine is down.",
  },
  {
    q: "Do I need a business plan to start a laundry shop in the Philippines?",
    a: "You need one if you are borrowing from a bank or lending cooperative, buying into a franchise, or taking money from an investor or family member. Even with none of those, the plan is worth writing for yourself: arguing with your own assumptions before spending money is considerably cheaper than discovering they were wrong afterwards. Write the section you least want to write, which is usually the one about what goes wrong.",
  },
  {
    q: "What makes lenders reject a laundry business plan?",
    a: "The recurring problems are not naming which of the three models you are opening, which makes every later number unreadable; a flat revenue line from month one, which signals inexperience immediately since laundries fill gradually; omitting capacity, so the reader cannot tell whether the revenue is physically possible; no working capital, meaning the plan funds the opening and nothing after it; no owner's salary; borrowed figures with no source or date; and a risks section that says competition and stops.",
  },
  {
    q: "How should I project revenue for a laundry business?",
    a: "Build it from realistic kilos per day times your price per kilo times operating days, using a volume you can defend from your capacity calculation and your catchment count rather than your capacity ceiling, since nobody runs at full capacity. Then ramp it: show month one lower than month twelve, because a laundry fills as the surrounding streets discover it and that takes months. Label every assumption so a sceptical reader can test individual ones instead of dismissing the whole projection.",
  },
]
