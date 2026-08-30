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

      // ── Invoice pages that moved from the root into /invoice/* ──
      //
      // These were 404ing rather than redirecting, and Search Console showed
      // Google still recrawling them months later - /how-to-create-invoice in
      // July, /freelance-invoice as late as April. A 404 drops whatever history
      // the old URL earned; a 301 passes it to the page that replaced it.
      //
      // The first four are exact slug matches. Every destination below was
      // confirmed to return 200 before being written here, same as the
      // smapeyinvoicingsoftware.com map - a redirect to a 404 is worse than the
      // 404 it replaced, because it hides the problem.
      { source: "/how-to-create-invoice", destination: "/invoice/how-to-create-invoice", permanent: true },
      { source: "/how-to-make-invoice", destination: "/invoice/how-to-make-invoice", permanent: true },
      { source: "/invoice-example", destination: "/invoice/invoice-example", permanent: true },
      { source: "/freelance-invoice", destination: "/invoice/freelance-invoice", permanent: true },

      // No page carries these slugs any more, so each goes to its closest
      // surviving equivalent rather than to the hub by default - a redirect
      // that lands on the topic the visitor asked for is worth more than one
      // that dumps them at the top of the cluster.
      {
        // "Invoice generator" is the online generator page's own subject.
        source: "/invoice-generator",
        destination: "/invoice/invoice-generation-online",
        permanent: true,
      },
      {
        // A template guide belongs with the template, not the generator.
        source: "/invoice-template-guide",
        destination: "/invoice/free-invoice-template",
        permanent: true,
      },
      {
        // "Invoicing app" is a product-level term with no single article behind
        // it, so the hub genuinely is the right destination here.
        source: "/invoicing-app",
        destination: "/invoice",
        permanent: true,
      },
      {
        // An old homepage route. www already 307s to the apex, so the www
        // variant Search Console reported resolves through this too.
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
