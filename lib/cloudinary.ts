/**
 * Showcase photographs.
 *
 * Every one of these is a KlingAI render stored on Cloudinary, and they all
 * need the same two things done to them. Doing it in the URL rather than at
 * upload time means the masters stay untouched and a change here reaches
 * every product page at once.
 *
 * Order matters: the repair runs on the full-resolution original, the
 * delivery settings run on the result.
 */

const BASE = "https://res.cloudinary.com/dxhwfv0jo/image/upload"

/**
 * The generator stamps "KlingAI 3.0" into the bottom-right corner of every
 * render, always in the same spot. e_gen_remove reconstructs what belongs
 * underneath rather than covering it, so nothing has to be cropped away.
 *
 * Cropping the strip instead would have cost the bottom 7% of every frame,
 * and a CSS overlay would leave the badge in the file for anyone who opens
 * the image directly - or for Google Images.
 *
 * Masters are 1360x768. The one exception is twice that, so its box is at
 * twice the coordinates.
 */
const DEWATERMARK = {
  "1x": "e_gen_remove:region_(x_1185;y_708;w_172;h_52)",
  "2x": "e_gen_remove:region_(x_2370;y_1416;w_344;h_104)",
} as const

/**
 * f_auto serves AVIF or WebP by browser, q_auto sets the quality per image,
 * and w_1200 covers a retina render of a showcase frame that is only ~528px
 * wide on desktop. c_limit means a smaller original is never upscaled.
 *
 * The masters run 1.1-3.7MB as PNG. This hands over roughly 50-130KB each.
 */
const DELIVERY = "f_auto,q_auto,w_1200,c_limit"

export type ShotScale = keyof typeof DEWATERMARK

/** Build a delivery URL for a showcase photograph from its Cloudinary public id. */
export function shot(publicId: string, scale: ShotScale = "1x") {
  return `${BASE}/${DEWATERMARK[scale]}/${DELIVERY}/${publicId}`
}

/**
 * Every master is 16:9, including the 2720x1536 one. These never drive layout
 * - the CSS is always w-full h-auto - they exist so the frame reserves its
 * height before the image arrives. Without them a column of showcase images
 * shifts the page as each one lands, which is a CLS penalty on pages whose
 * whole purpose is ranking.
 */
export const SHOT_W = 1360
export const SHOT_H = 768
