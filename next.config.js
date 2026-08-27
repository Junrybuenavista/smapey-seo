/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        // The boarding house money page moved up to the cluster root. A 301
        // passes on the ranking and links the old URL earned, and stops the
        // two pages competing for the same term.
        source: "/boarding-house/boarding-house-management-system",
        destination: "/boarding-house",
        permanent: true,
      },
      {
        // The in-app Guide buttons and onboarding emails point at the product
        // hub. There are two trade pages rather than one hub page, so send the
        // bare path to the higher-volume of the two instead of 404ing.
        source: "/repair-shop-software",
        destination: "/auto-repair-shop-software-philippines",
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
