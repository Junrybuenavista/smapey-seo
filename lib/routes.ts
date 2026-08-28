export type RouteInfo = {
  path: string
  title: string
  desc: string
}

export type ClusterKey = "invoice" | "booking" | "gym" | "essay" | "car-rental" | "laundry" | "salon" | "massage" | "airbnb" | "lending" | "restaurant" | "store" | "clinic" | "vet-clinic" | "boarding-house" | "catering" | "water-refilling" | "school-desk" | "repair-shop"

export type RouteCluster = {
  label: string
  hub: RouteInfo
  pages: RouteInfo[]
}

export const CLUSTERS: Record<ClusterKey, RouteCluster> = {
  invoice: {
    label: "Invoicing",
    hub: {
      path: "/invoice",
      title: "Invoicing Software",
      desc: "Create professional invoices, track payments, and get paid faster.",
    },
    pages: [
      { path: "/invoice/how-it-works", title: "How It Works", desc: "See how Smapey Invoice fits into your daily billing workflow." },
      { path: "/invoice/pricing", title: "Pricing", desc: "Simple plans for solo operators, freelancers, and growing teams." },
      { path: "/invoice/free-invoice-template", title: "Free Invoice Template", desc: "Download a free, ready-to-fill invoice template you can use today." },
      { path: "/invoice/invoice-example", title: "Invoice Example", desc: "Real invoice examples that show what to include and how to format them." },
      { path: "/invoice/how-to-make-invoice", title: "How to Make an Invoice", desc: "Step-by-step walkthrough of writing a professional invoice from scratch." },
      { path: "/invoice/how-to-create-invoice", title: "How to Create an Invoice", desc: "Build a complete invoice in minutes, including taxes and terms." },
      { path: "/invoice/how-to-send-invoice", title: "How to Send an Invoice", desc: "Best practices for delivering invoices and getting paid on time." },
      { path: "/invoice/invoice-generation-online", title: "Online Invoice Generator", desc: "Generate downloadable PDF invoices online without installing anything." },
      { path: "/invoice/invoice-free-tool", title: "Free Invoice Tool", desc: "A free browser-based tool for creating and downloading invoices." },
      { path: "/invoice/google-docs-invoice-template", title: "Google Docs Invoice Template", desc: "Copy-and-edit Google Docs invoice templates for quick billing." },
      { path: "/invoice/pro-forma-invoice", title: "Pro Forma Invoice", desc: "What a pro forma invoice is, when to use it, and how to format one." },
      { path: "/invoice/sales-invoice-vs-official-receipt-philippines", title: "Sales Invoice vs Official Receipt (Philippines)", desc: "What RA 11976 and RR 7-2024 changed, what must be on a valid invoice, and where the costly mistakes are." },
      { path: "/invoice/what-is-an-invoice", title: "What Is an Invoice?", desc: "A plain-English explanation of invoices and how they work." },
      { path: "/invoice/freelance-invoice", title: "Freelance Invoice", desc: "Invoicing built around the way freelancers actually get paid." },
      { path: "/invoice/invoicing-software-for-freelancers", title: "Invoicing Software for Freelancers", desc: "Lightweight invoicing tools designed for solo freelancers." },
      { path: "/invoice/invoicing-software-for-consultants", title: "Invoicing Software for Consultants", desc: "Hourly, retainer, and milestone billing for consultants." },
      { path: "/invoice/invoicing-software-for-contractors", title: "Invoicing Software for Contractors", desc: "Job-based invoicing for independent contractors." },
      { path: "/invoice/invoicing-software-for-plumbers", title: "Invoicing Software for Plumbers", desc: "Fast on-site invoicing for plumbing businesses." },
      { path: "/invoice/electrician-invoicing-software", title: "Electrician Invoicing Software", desc: "Invoicing for electricians - labor, parts, and service calls." },
      { path: "/invoice/hvac-invoicing-software", title: "HVAC Invoicing Software", desc: "Invoicing built for HVAC installation and maintenance jobs." },
      { path: "/invoice/invoicing-software-for-auto-repair", title: "Auto Repair Invoicing Software", desc: "Invoicing for auto shops - parts, labor, and customer history." },
      { path: "/invoice/invoice-software-for-construction", title: "Construction Invoice Software", desc: "Progress billing and job costing for construction projects." },
      { path: "/invoice/legal-billing-software", title: "Legal Billing Software", desc: "Time tracking and billing for law firms and solo attorneys." },
      { path: "/invoice/invoice-processing-software", title: "Invoice Processing Software", desc: "Streamline accounts-payable and inbound invoice processing." },
      { path: "/invoice/customers", title: "Customers", desc: "Real businesses using Smapey to manage their invoicing." },
      { path: "/invoice/industry", title: "Industries We Serve", desc: "Smapey Invoice across freelancers, trades, and service businesses." },
      { path: "/invoice/learning-hub", title: "Learning Hub", desc: "Guides and articles on invoicing, getting paid, and small business finance." },
      { path: "/invoice/faq", title: "FAQ", desc: "Common questions about Smapey Invoice answered." },
      { path: "/invoice/contact", title: "Contact", desc: "Get in touch with the Smapey team." },
    ],
  },

  booking: {
    label: "Booking & Appointments",
    hub: {
      path: "/booking",
      title: "Booking & Appointments",
      desc: "Manage client appointments, staff availability, and deposits.",
    },
    pages: [
      { path: "/booking/guide", title: "Booking Software Guide", desc: "How appointment scheduling software works and what to look for." },
      { path: "/booking/salon-booking-software", title: "Salon Booking Software", desc: "Appointment booking, stylist assignment, and deposits for salons." },
      { path: "/booking/salon-appointment-scheduling-software", title: "Salon Appointment Scheduling Software", desc: "Multi-stylist scheduling, working hours, and deposit tracking." },
      { path: "/booking/nail-salon-booking-software", title: "Nail Salon Booking Software", desc: "Booking and technician assignment built for nail salons." },
      { path: "/booking/clinic-appointment-scheduling-software", title: "Clinic Appointment Scheduling Software", desc: "Patient appointments, provider availability, and reminders for clinics." },
    ],
  },

  gym: {
    label: "Gym Management",
    hub: {
      path: "/gym",
      title: "Gym Management",
      desc: "Manage members, automate billing, and track attendance.",
    },
    pages: [
      { path: "/gym/guide", title: "Gym Management Guide", desc: "How modern gym management software works end-to-end." },
      { path: "/gym/gym-membership-management-software", title: "Gym Membership Management Software", desc: "Member profiles, renewals, and subscription billing." },
      { path: "/gym/crossfit-gym-management-software", title: "CrossFit Gym Management Software", desc: "Class scheduling and member tracking for CrossFit boxes." },
      { path: "/gym/free-gym-management-software", title: "Free Gym Management Software", desc: "Run your gym on a free plan - upgrade only when you grow." },
      { path: "/gym/gym-management-software-price", title: "Gym Management Software Price", desc: "Transparent pricing for Smapey's gym management plans." },
    ],
  },

  essay: {
    label: "Essay Feedback",
    hub: {
      path: "/essay",
      title: "Essay Feedback",
      desc: "AI-powered essay grading with rubric scores and structured feedback.",
    },
    pages: [
      { path: "/essay/guide", title: "Essay Grading Guide", desc: "How AI essay grading works and how teachers use it." },
      { path: "/essay/grade-my-essay-ai", title: "Grade My Essay AI", desc: "Get instant AI feedback and a score on any essay you submit." },
      { path: "/essay/ai-essay-grader-for-teachers", title: "AI Essay Grader for Teachers", desc: "Grade student essays in seconds with rubric-aligned feedback." },
      { path: "/essay/free-ai-essay-grader-for-teachers", title: "Free AI Essay Grader for Teachers", desc: "A free AI grading tool teachers can use without a credit card." },
      { path: "/essay/ai-college-essay-grader", title: "AI College Essay Grader", desc: "Score and improve college application essays with AI feedback." },
    ],
  },

  "car-rental": {
    label: "Car Rental",
    hub: {
      path: "/car-rental",
      title: "Car Rental",
      desc: "Manage vehicles, reservations, deposits, and overdue alerts.",
    },
    pages: [
      { path: "/car-rental/guide", title: "Car Rental Software Guide", desc: "What car rental software does and what features matter most." },
      { path: "/car-rental/best-car-rental-software", title: "Best Car Rental Software", desc: "What to look for and how Smapey compares." },
      { path: "/car-rental/car-rental-management-software", title: "Car Rental Management Software", desc: "Fleet, reservation, and revenue management in one dashboard." },
      { path: "/car-rental/car-rental-booking-software", title: "Car Rental Booking Software", desc: "Reservation flows that let customers book vehicles online." },
      { path: "/car-rental/car-rental-software-for-small-business", title: "Car Rental Software for Small Business", desc: "Built for small rental fleets - affordable, simple, complete." },
    ],
  },

  // Two trade pages and one shared guide. There is no hub page - the product
  // is one thing, but a car shop and a motorcycle shop will not read the same
  // headline, so each trade gets its own money page and they link to each other.
  "repair-shop": {
    label: "Repair Shop Software",
    hub: {
      path: "/auto-repair-shop-software-philippines",
      title: "Auto Repair Shop Software",
      desc: "Job orders, parts and labour, and service history by plate number for car shops.",
    },
    pages: [
      { path: "/motorcycle-repair-shop-software-philippines", title: "Motorcycle Repair Shop Software", desc: "Built for two wheels - chain and sprocket, valve adjustment, and oil due at 2,000 km." },
      { path: "/repair-shop-software/guide", title: "Repair Shop Software Guide", desc: "Set-up to payout, in the order you will actually meet it." },
      { path: "/invoice/invoicing-software-for-auto-repair", title: "Invoicing for Auto Repair", desc: "Billing a repair job - quotations, itemised invoices, and payment tracking." },
    ],
  },

  laundry: {
    label: "Laundry Management",
    hub: {
      path: "/laundry",
      title: "Laundry Shop App",
      desc: "Manage laundry orders, customers, and SMS notifications.",
    },
    pages: [
      { path: "/laundry/guide", title: "Laundry App Guide", desc: "How laundry shop management software works end-to-end." },
      { path: "/laundry/how-to-start-a-laundry-business-philippines", title: "How to Start a Laundry Business in the Philippines", desc: "Capital by business model, permits, the sanitation rules specific to laundries, machine sizing, and the monthly numbers." },
      { path: "/laundry/laundry-service-app", title: "Laundry Service App", desc: "Manage orders, customers, and payments for your laundry service." },
      { path: "/laundry/free-laundry-app", title: "Free Laundry App", desc: "Run your laundry shop for free - no credit card required." },
      { path: "/laundry/laundry-app-near-me", title: "Laundry App Near Me", desc: "Software for local laundry shops to manage orders and notify customers." },
      { path: "/laundry/on-demand-laundry-service-app", title: "On-Demand Laundry Service App", desc: "Accept and track on-demand laundry orders with auto SMS notifications." },
    ],
  },

  salon: {
    label: "Salon Management",
    hub: { path: "/salon", title: "Salon Management App", desc: "Manage appointments, clients, and your public booking page." },
    pages: [
      { path: "/salon/guide", title: "Salon App Guide", desc: "How salon management software works end-to-end." },
      { path: "/salon/salon-management-app", title: "Salon Management App", desc: "The all-in-one app to manage your salon appointments, clients, and services." },
      { path: "/salon/beauty-salon-management-app", title: "Beauty Salon Management App", desc: "Built for beauty salons - appointments, staff, and client history in one place." },
      { path: "/salon/nail-salon-management-app", title: "Nail Salon Management App", desc: "Appointment scheduling and client management for nail salons." },
      { path: "/salon/salon-appointment-manager-app", title: "Salon Appointment Manager App", desc: "Schedule, track, and manage all your salon appointments from one dashboard." },
      { path: "/salon/salon-inventory-management-app", title: "Salon Inventory Management App", desc: "Track services, pricing, and staff assignments alongside your inventory." },
    ],
  },

  massage: {
    label: "Massage & Spa",
    hub: { path: "/massage", title: "Massage and Spa App", desc: "Manage therapists, treatments, clients, and a public booking page." },
    pages: [
      { path: "/massage/guide", title: "Massage App Guide", desc: "How massage and spa management software works end-to-end." },
      { path: "/massage/massage-booking-app", title: "Massage Booking App", desc: "A simple booking app for massage businesses - therapists, services, and a branded booking page." },
      { path: "/massage/book-a-massage-app", title: "Book a Massage App", desc: "Let your clients book a massage online - pick a therapist, time, and confirm with a deposit." },
      { path: "/massage/massage-book-app", title: "Massage Book App", desc: "Replace your paper appointment book with a digital massage book that runs in the cloud." },
      { path: "/massage/spa-management-app", title: "Spa Management App", desc: "Run your spa (treatments, therapists, deposits, and analytics) from one clean dashboard." },
      { path: "/massage/massage-therapist-booking-app", title: "Massage Therapist Booking App", desc: "Per-therapist booking with specialties, schedules, and client requests." },
    ],
  },

  airbnb: {
    label: "Airbnb / Short-term Rentals",
    hub: { path: "/airbnb", title: "Airbnb Management Software", desc: "Manage rental properties, guests, and reservations from one clean dashboard." },
    pages: [
      { path: "/airbnb/guide", title: "Airbnb Management Guide", desc: "How to manage your short-term rental properties with software - end to end." },
      { path: "/airbnb/airbnb-management-software", title: "Airbnb Management Software", desc: "All-in-one software to run your short-term rental - properties, guests, reservations, and revenue." },
      { path: "/airbnb/airbnb-property-management-software", title: "Airbnb Property Management Software", desc: "Track every property, guest, and booking from a single dashboard with no double-bookings." },
      { path: "/airbnb/best-airbnb-management-software", title: "Best Airbnb Management Software", desc: "What makes the best Airbnb management software - and why independent hosts choose Smapey." },
      { path: "/airbnb/airbnb-management-software-features", title: "Airbnb Management Software Features", desc: "A full breakdown of the features your rental management software should include." },
      { path: "/airbnb/airbnb-cleaning-management-software", title: "Airbnb Cleaning Management Software", desc: "Track turnovers, log cleanings, and keep every property guest-ready between stays." },
    ],
  },

  lending: {
    label: "Lending & Loan Management",
    hub: { path: "/lending", title: "Lending Management Software", desc: "Run your own lending business - borrowers, loans, amortization, and collections from one dashboard." },
    pages: [
      { path: "/lending/guide", title: "Lending Software Guide", desc: "How to run a lending business with software - borrowers, loans, schedules, and collections end to end." },
      { path: "/lending/loan-app-philippines", title: "Loan App Philippines", desc: "The loan app for lenders in the Philippines - issue loans, track payments, and manage borrowers." },
      { path: "/lending/best-loan-app-philippines", title: "Best Loan App Philippines", desc: "What makes the best loan app for Philippine lenders - and why lending businesses choose Smapey." },
      { path: "/lending/lending-money-apps-philippines", title: "Lending Money Apps Philippines", desc: "The lending money app for Filipino lenders to issue loans and track repayments with ease." },
      { path: "/lending/legit-loan-app-philippines", title: "Legit Loan App Philippines", desc: "A legit, professional loan management app for registered lending businesses in the Philippines." },
      { path: "/lending/online-lending-apps-philippines", title: "Online Lending Apps Philippines", desc: "Run your online lending business in the Philippines - borrowers, amortization, and collections online." },
    ],
  },

  store: {
    label: "Inventory & POS",
    hub: { path: "/store", title: "Inventory & POS Manager", desc: "Track stock, ring up sales on a tap-to-add POS, manage suppliers, and monitor daily revenue - everything a small retail store needs in one dashboard." },
    pages: [
      { path: "/store/guide",                                          title: "Store Manager Guide",                          desc: "How to add products, set up suppliers, ring up sales on the POS, and track daily revenue end to end." },
      { path: "/store/inventory-management-system",                    title: "Inventory Management System",                  desc: "A free inventory management system for small stores - stock tracking, low stock alerts, POS, and analytics." },
      { path: "/store/inventory-management-systems",                   title: "Inventory Management Systems",                 desc: "What inventory management systems do and why Smapey is the right fit for small retailers." },
      { path: "/store/inventory-management-system-philippines",        title: "Inventory Management System Philippines",      desc: "Free inventory management system for Philippine sari-sari stores, retail shops, and mini groceries." },
      { path: "/store/free-inventory-management-system",               title: "Free Inventory Management System",             desc: "Permanently free inventory management - 50 products, 200 sales per month, full POS included." },
      { path: "/store/inventory-management-system-examples",           title: "Inventory Management System Examples",         desc: "Real-world examples of how sari-sari stores, boutiques, and hardware shops use inventory management systems." },
    ],
  },

  clinic: {
    label: "Clinic Manager",
    hub: {
      path: "/clinic",
      title: "Clinic Management System",
      desc: "Manage patients, doctors, appointments, and a live queue board, all in one dashboard.",
    },
    pages: [
      { path: "/clinic/guide", title: "Clinic Manager Guide", desc: "Step-by-step guide to setting up doctors, booking appointments, and running the live queue board." },
      { path: "/clinic/dental-clinic-management-system", title: "Dental Clinic Management System", desc: "Manage dental appointments, assign dentists, and track your patient queue without complex software." },
      { path: "/clinic/clinic-appointment-management-system", title: "Clinic Appointment Management System", desc: "Book, confirm, queue, and complete clinic appointments - every status tracked in one system." },
      { path: "/clinic/clinic-information-management-system", title: "Clinic Information Management System", desc: "Patient records, doctor profiles, appointment history, and analytics - organized and secure." },
      { path: "/clinic/clinic-management-system-thesis", title: "Clinic Management System Thesis", desc: "Thesis guide covering key modules, data models, and system architecture for a clinic management system." },
    ],
  },

  "vet-clinic": {
    label: "Vet Clinic Manager",
    hub: {
      path: "/vet-clinic",
      title: "Veterinary Clinic Management System",
      desc: "Manage pets, veterinarians, appointments, vaccinations, queue board, and billing, all in one dashboard.",
    },
    pages: [
      { path: "/vet-clinic/guide", title: "Vet Clinic Manager Guide", desc: "Step-by-step guide to setting up vets, booking appointments, running the queue board, tracking vaccinations, and managing billing." },
      { path: "/vet-clinic/veterinary-clinic-management-system", title: "Veterinary Clinic Management System", desc: "A complete web-based system for managing vet appointments, pet records, vaccinations, and billing." },
      { path: "/vet-clinic/veterinary-clinic-and-pet-shop-management-system", title: "Veterinary Clinic & Pet Shop Management System", desc: "One system for your entire pet care operation - vet clinic, grooming, pet shop, and billing." },
      { path: "/vet-clinic/veterinary-clinic-management-system-thesis", title: "Veterinary Clinic Management System Thesis", desc: "Thesis guide covering key modules, database entities, and system architecture for a vet clinic management system." },
      { path: "/vet-clinic/online-veterinary-clinic-management-system", title: "Online Veterinary Clinic Management System", desc: "A cloud-based, browser-accessible vet clinic system - manage pets, appointments, and billing from anywhere." },
    ],
  },

  "boarding-house": {
    label: "Boarding House Manager",
    hub: {
      path: "/boarding-house",
      title: "Boarding House Management System",
      desc: "Manage rooms, tenants, rent billing, utility billing, and occupancy, all in one dashboard for Philippine boarding houses.",
    },
    pages: [
      { path: "/boarding-house/guide",                                          title: "Boarding House Manager Guide",                         desc: "Step-by-step guide to setting up rooms, registering tenants, creating tenancies, issuing rent and utility bills, and reading the dashboard." },
      { path: "/boarding-house/boarding-house-management-system",              title: "Boarding House Management System",              desc: "A complete web-based system for managing boarding house rooms, tenants, rent bills, utility bills, and occupancy in the Philippines." },
      { path: "/boarding-house/boarding-house-business-philippines",           title: "Boarding House Business in the Philippines",    desc: "How to run a boarding house business in the Philippines - tenant management, billing, and collections made easy." },
      { path: "/boarding-house/boarding-house-business-plan-sample-philippines", title: "Boarding House Business Plan Sample Philippines", desc: "A sample boarding house business plan for the Philippines - target market, pricing model, operations plan, and management system." },
      { path: "/boarding-house/boarding-house-management-and-billing-system",  title: "Boarding House Management and Billing System",  desc: "Combine boarding house management and billing in one system - rooms, tenants, rent bills, utility bills, and payment tracking." },
    ],
  },

  catering: {
    label: "Catering Manager",
    hub: {
      path: "/catering",
      title: "Catering Manager",
      desc: "Manage catering bookings, packages, payment milestones, supply catalog, and staff, all in one dashboard.",
    },
    pages: [
      { path: "/catering/guide",                                                title: "Catering Manager Guide",                              desc: "Step-by-step guide to setting up packages, registering clients, creating bookings, tracking payment milestones, and reading the dashboard." },
      { path: "/catering/catering-management-system",                          title: "Catering Management System",                          desc: "A complete catering management system for Philippine catering businesses - bookings, packages, billing, and staff." },
      { path: "/catering/catering-business-philippines",                       title: "Catering Business Philippines",                       desc: "Running a catering business in the Philippines - manage bookings, payments, and supply costs from one dashboard." },
      { path: "/catering/how-to-start-a-catering-business-in-the-philippines", title: "How to Start a Catering Business in the Philippines", desc: "Step-by-step guide to starting a catering business in the Philippines - permits, pricing, clients, and operations." },
      { path: "/catering/catering-management-and-billing-system",              title: "Catering Management and Billing System",              desc: "Catering management and billing combined in one system - bookings, milestone payments, and revenue tracking." },
    ],
  },

  "water-refilling": {
    label: "Water Refilling Station",
    hub: {
      path: "/water-refilling",
      title: "Water Refilling Station Software",
      desc: "Manage deliveries, customers, container deposits, returns, inventory, and payments, all in one dashboard for Philippine water refilling stations.",
    },
    pages: [
      { path: "/water-refilling/guide",                                                       title: "Water Refilling Station Software Guide",          desc: "Plain-English, step-by-step guide to setting up your station, taking deliveries, tracking containers and empties, and reading the dashboard." },
      { path: "/water-refilling/how-to-start-water-refilling-station-business-philippines",    title: "How to Start a Water Refilling Station in the Philippines", desc: "A complete step-by-step guide to starting a water refilling station business in the Philippines - capital, permits, equipment, and operations." },
      { path: "/water-refilling/water-refilling-station-business-package-philippines",         title: "Water Refilling Station Business Package Philippines", desc: "What's inside a water refilling station business package in the Philippines - equipment, costs, and the software to run it." },
      { path: "/water-refilling/business-plan-for-water-refilling-station-philippines",        title: "Business Plan for a Water Refilling Station Philippines", desc: "A sample water refilling station business plan for the Philippines - market, pricing, costs, operations, and management system." },
    ],
  },

  restaurant: {
    label: "Food Ordering",
    hub: { path: "/restaurant", title: "Food Ordering Manager", desc: "Manage your menu, orders, kitchen queue, and daily sales - everything a small restaurant or café needs in one dashboard." },
    pages: [
      { path: "/restaurant/guide", title: "Restaurant Software Guide", desc: "How restaurant management software works - menu setup, order flow, kitchen view, and daily reporting end to end." },
      { path: "/restaurant/restaurant-management-software", title: "Restaurant Management Software", desc: "All-in-one software to run your restaurant - menu, orders, kitchen queue, and sales summary in one clean dashboard." },
      { path: "/restaurant/food-ordering-system", title: "Food Ordering System", desc: "A simple food ordering system for small restaurants and cafés - dine-in, takeaway, and QR table ordering." },
      { path: "/restaurant/restaurant-pos-system", title: "Restaurant POS System", desc: "A lightweight POS system for restaurants that handles orders, payments, and daily sales without the enterprise price tag." },
      { path: "/restaurant/online-ordering-system", title: "Online Ordering System for Restaurants", desc: "Let customers order online via a QR code or link - no third-party app, no commission fees, just direct orders." },
      { path: "/restaurant/free-restaurant-management-software", title: "Free Restaurant Management Software", desc: "Run your restaurant on a free plan - menu builder, order tracking, and sales summary at no cost." },
    ],
  },

  "school-desk": {
    label: "Tutorial Center",
    hub: {
      path: "/school-desk",
      title: "Tutorial Center & Tutor Software",
      desc: "Manage student enrollments, sessions, tuition fees, attendance, and progress notes, all in one dashboard for Philippine tutorial centers and tutors.",
    },
    pages: [
      { path: "/school-desk/guide",                                          title: "Tutorial Center Software Guide",                desc: "Plain-English, step-by-step guide to setting up programs, enrolling students, scheduling sessions, tracking tuition and attendance, and reading the dashboard." },
      { path: "/school-desk/tutor-philippines",                              title: "How to Become a Tutor in the Philippines",      desc: "How to start and grow a tutoring business in the Philippines - finding students, setting rates, running sessions, and getting paid." },
      { path: "/school-desk/tutorial-center-philippines",                    title: "Tutorial Center Philippines: Complete Guide",   desc: "What a tutorial center is, how it makes money, what you need, and how to run one in the Philippines without drowning in paperwork." },
      { path: "/school-desk/how-to-start-tutorial-center-philippines",       title: "How to Start a Tutorial Center in the Philippines", desc: "A complete step-by-step guide to starting a tutorial center - capital, permits, location, hiring tutors, pricing, and operations." },
      { path: "/school-desk/tutorial-center-business-plan-philippines",      title: "Tutorial Center Business Plan Philippines",     desc: "A sample tutorial center business plan for the Philippines - market, services, pricing, costs, marketing, and operations." },
      { path: "/school-desk/tutorial-center-requirements-philippines",       title: "Tutorial Center Requirements Philippines",      desc: "The complete permits and requirements checklist to legally open a tutorial center in the Philippines." },
    ],
  },
}

// Back-compat: existing usages of SEO_ROUTES expect bare invoice slugs.
export const SEO_ROUTES: string[] = CLUSTERS.invoice.pages.map((p) =>
  p.path.replace(/^\/invoice\//, "")
)

export const ALL_CLUSTERS: ClusterKey[] = [
  "invoice",
  "booking",
  "gym",
  "essay",
  "car-rental",
  "laundry",
  "salon",
  "massage",
  "airbnb",
  "lending",
  "restaurant",
  "store",
  "clinic",
  "vet-clinic",
  "boarding-house",
  "catering",
  "water-refilling",
  "school-desk",
]

export function clusterForPath(pathname: string): ClusterKey | null {
  for (const key of ALL_CLUSTERS) {
    const cluster = CLUSTERS[key]
    if (pathname === cluster.hub.path || pathname.startsWith(cluster.hub.path + "/")) {
      return key
    }
  }
  return null
}
