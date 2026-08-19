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
    ]
  },
}

module.exports = nextConfig
