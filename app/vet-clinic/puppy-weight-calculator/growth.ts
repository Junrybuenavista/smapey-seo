/**
 * Puppy growth curves.
 *
 * A puppy's adult weight is estimated from how far through its growth it
 * already is: if a breed is typically 47% of its adult weight at 16 weeks, a
 * 16-week puppy weighing 9.4kg projects to about 20kg. That framing beats the
 * "double the 14-week weight" rules of thumb, because the multiplier a rule
 * bakes in is only correct for one size of dog at one age - the whole reason
 * small breeds finish growing months before giant ones.
 *
 * Anchors below are percentage of adult weight at a given age in weeks, read
 * off standard veterinary growth charts and linearly interpolated between
 * points. They are population averages: an individual puppy can sit well off
 * the curve and still be perfectly healthy, which is why the calculator shows
 * a range rather than a single confident number.
 */

export type SizeKey = "toy" | "small" | "medium" | "large" | "giant"

export type SizeCategory = {
  key: SizeKey
  label: string
  adultRange: string
  breeds: string
  /** [ageInWeeks, percentOfAdultWeight] */
  curve: [number, number][]
}

export const SIZES: SizeCategory[] = [
  {
    key: "toy",
    label: "Toy",
    adultRange: "under 4 kg / 9 lb",
    breeds: "Chihuahua, Pomeranian, Yorkshire Terrier, Maltese, Papillon",
    curve: [
      [4, 18], [8, 27], [12, 45], [16, 60], [20, 72], [24, 82],
      [28, 88], [32, 93], [36, 96], [40, 98], [44, 99], [48, 100],
    ],
  },
  {
    key: "small",
    label: "Small",
    adultRange: "4-11 kg / 9-24 lb",
    breeds: "Beagle, French Bulldog, Miniature Schnauzer, Jack Russell, Shih Tzu",
    curve: [
      [4, 14], [8, 22], [12, 40], [16, 55], [20, 66], [24, 76],
      [28, 83], [32, 89], [36, 93], [40, 96], [44, 98], [48, 99], [52, 100],
    ],
  },
  {
    key: "medium",
    label: "Medium",
    adultRange: "11-25 kg / 24-55 lb",
    breeds: "Border Collie, Cocker Spaniel, Australian Shepherd, Bull Terrier, Whippet",
    curve: [
      [4, 12], [8, 18], [12, 33], [16, 47], [20, 58], [24, 68],
      [28, 76], [32, 83], [36, 88], [40, 92], [44, 95], [48, 97], [52, 99], [56, 100],
    ],
  },
  {
    key: "large",
    label: "Large",
    adultRange: "25-45 kg / 55-100 lb",
    breeds: "Labrador, German Shepherd, Golden Retriever, Boxer, Doberman, Husky",
    curve: [
      [4, 10], [8, 15], [12, 28], [16, 40], [20, 50], [24, 60],
      [28, 68], [32, 75], [36, 81], [40, 86], [44, 90], [48, 93], [52, 95], [60, 98], [68, 100],
    ],
  },
  {
    key: "giant",
    label: "Giant",
    adultRange: "over 45 kg / 100 lb",
    breeds: "Great Dane, Saint Bernard, Mastiff, Newfoundland, Irish Wolfhound",
    curve: [
      [4, 8], [8, 12], [12, 23], [16, 33], [20, 42], [24, 51],
      [28, 59], [32, 66], [36, 72], [40, 78], [44, 83], [48, 87], [52, 90], [60, 95], [70, 98], [78, 100],
    ],
  },
]

/** Percentage of adult weight reached at a given age, interpolated between anchors. */
export function percentGrown(size: SizeCategory, weeks: number): number {
  const c = size.curve
  if (weeks <= c[0][0]) return c[0][1]
  if (weeks >= c[c.length - 1][0]) return 100

  for (let i = 0; i < c.length - 1; i++) {
    const [w0, p0] = c[i]
    const [w1, p1] = c[i + 1]
    if (weeks >= w0 && weeks <= w1) {
      const t = (weeks - w0) / (w1 - w0)
      return p0 + t * (p1 - p0)
    }
  }
  return 100
}

/**
 * How wide to draw the range. Prediction from an eight-week puppy is close to
 * guesswork - it has barely started growing and litter variation dominates -
 * while a six-month puppy is mostly there and the estimate tightens. Showing a
 * flat +/-10% at every age would overstate confidence exactly where owners are
 * most likely to act on the number.
 */
export function uncertaintyPct(percent: number): number {
  if (percent < 25) return 22
  if (percent < 40) return 17
  if (percent < 60) return 13
  if (percent < 80) return 10
  return 7
}

/** The age at which this size is essentially done growing. */
export function fullyGrownWeeks(size: SizeCategory): number {
  return size.curve[size.curve.length - 1][0]
}
