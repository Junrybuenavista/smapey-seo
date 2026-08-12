// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Does Smapey track physical product inventory like shampoo or hair dye?", a: "Smapey SalonOS is focused on service management, appointments, clients, and your service catalogue. It does not currently track physical product stock levels. If you need physical inventory tracking, you would need a separate tool for that." },
  { q: "How do I track which services are most popular?", a: "Your appointments dashboard shows completed appointments by service type. Over time, this data tells you which services generate the most bookings and revenue, your most important business intelligence." },
  { q: "Can I add service categories or group services?", a: "Yes. You can name and organize your services however makes sense for your salon, hair services, nail services, skin treatments, etc. Each service has its own name, price, and duration." },
  { q: "How many services can I add on the free plan?", a: "The free plan supports up to 5 services. The Pro plan supports up to 20, and the Enterprise plan has unlimited services, suitable for full-service beauty salons with a wide menu." },
]

