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
      {
        // The sample page moved to a fresh URL to escape a stuck verdict.
        //
        // Google called the old path "Duplicate without user-selected
        // canonical" on 10 Sep and then stopped crawling it entirely - the
        // last crawl never moved in the four weeks after, through two indexing
        // requests and a fix to the thing that most likely caused it. A URL in
        // that state is self-reinforcing: Google will not recrawl what it has
        // already filed as redundant.
        //
        // It was never indexed, so the move costs nothing, and `sales invoice
        // sample` - 5,400 searches a month, the biggest term in the cluster -
        // is currently served by no page at all. The shorter slug also matches
        // that term more closely than the -philippines one did.
        source: "/invoice/sales-invoice-sample-philippines",
        destination: "/invoice/sales-invoice-sample",
        permanent: true,
      },

      // ── The four car rental software spokes, folded into the hub ──
      //
      // These chased "best", "booking", "management" and "for small business"
      // car rental software. Between them they earned one click in the 28 days
      // to 4 October: 971 of the cluster's 1,040 impressions sat on
      // best-car-rental-software at average position 51 - seen by nobody - and
      // car-rental-booking-software recorded no impressions at all.
      //
      // They were also the same page four times. Measured on the prose with
      // the JSX stripped, their 8-gram overlap with each other is 87-89%, and
      // 75% against the hub, on bodies of roughly 460 words each. Four
      // near-identical thin pages competing with the hub for one term is the
      // shape of problem that cost the invoice cluster its best page, so they
      // consolidate upward instead. The hub carries the software terms; the
      // owner-intent guide carries the demand that actually exists.
      { source: "/car-rental/best-car-rental-software", destination: "/car-rental", permanent: true },
      { source: "/car-rental/car-rental-booking-software", destination: "/car-rental", permanent: true },
      { source: "/car-rental/car-rental-management-software", destination: "/car-rental", permanent: true },
      { source: "/car-rental/car-rental-software-for-small-business", destination: "/car-rental", permanent: true },
    ]
  },
}

module.exports = nextConfig
