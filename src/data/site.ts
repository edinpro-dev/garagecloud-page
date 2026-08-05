export const SITE = {
  name: "GarageCloud",
  domain: "garagecloud.co",
  strapline: "Run your workshop without the paperwork.",
  description:
    "GarageCloud brings the workshop board, invoicing, inspections, reminders and accounts into one system. Join the waiting list for early access.",
  contactEmail: "hello@garagecloud.co",
};

export const HERO = {
  badge: "Launching soon",
  heading: "Run your workshop without the paperwork.",
  subheading:
    "The workshop board, invoicing, inspections, reminders and accounts, connected in one system instead of spread across a diary, a spreadsheet and a group chat.",
  primaryCta: "Join the waiting list",
  secondaryCta: "See what's included",
  trustLine:
    "Built for garages, mobile tyre fitters, locksmiths, ECU remapping specialists and fleet services.",
};

export type Stat = { value: string; label: string };

export const STATS: Stat[] = [
  { value: "12", label: "workshop modules in one system" },
  { value: "3", label: "simple plans, no hidden add-ons" },
  { value: "14", label: "day free trial once we launch" },
];

export type Feature = { icon: string; title: string; description: string };

export const FEATURES: Feature[] = [
  {
    icon: "🖥",
    title: "Workshop Board",
    description: "See every bay and every job in real time.",
  },
  {
    icon: "🔍",
    title: "VRM Lookup",
    description: "Pull vehicle details straight from the registration number.",
  },
  {
    icon: "📸",
    title: "Inspections",
    description: "Photo-based checks customers can view and approve.",
  },
  {
    icon: "💬",
    title: "WhatsApp Approvals",
    description: "Customers approve work from their phone.",
  },
  {
    icon: "⏰",
    title: "Reminders",
    description: "MOT and service reminders sent without you chasing.",
  },
  {
    icon: "🚗",
    title: "Courtesy Cars",
    description: "Track availability and bookings alongside the job.",
  },
  {
    icon: "🛞",
    title: "Mobile Tyres",
    description: "Schedule and route mobile tyre jobs from the same board.",
  },
  {
    icon: "💻",
    title: "ECU Remapping",
    description: "Log remap jobs and vehicle data in one record.",
  },
  {
    icon: "🔑",
    title: "Auto Locksmith",
    description: "Manage callouts and key jobs like any other booking.",
  },
  {
    icon: "🛡",
    title: "Ghost Immobiliser",
    description: "Track fitting jobs and warranty records.",
  },
  {
    icon: "💷",
    title: "Invoicing",
    description: "Raise and send invoices straight from the finished job card.",
  },
  {
    icon: "📊",
    title: "Xero / Sage",
    description: "Invoices flow straight to your accounts.",
  },
];

export type BusinessType = { value: string; label: string };

export const BUSINESS_TYPES: BusinessType[] = [
  { value: "independent-garage", label: "Independent garage" },
  { value: "mot-centre", label: "MOT test centre" },
  { value: "mobile-mechanic-tyres", label: "Mobile mechanic / tyre fitter" },
  { value: "locksmith", label: "Auto locksmith" },
  { value: "fleet-service", label: "Fleet service" },
  { value: "other", label: "Other" },
];

export type PricingTier = {
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "£50",
    period: "per month + VAT",
    tagline: "For a workshop getting the paperwork under control.",
    features: [
      "Unlimited staff",
      "Unlimited invoices",
      "Quotes & expenses",
      "Advanced reports & analytics",
      "Ticket support",
      "User & role management",
      "Accounting software API",
    ],
  },
  {
    name: "Business",
    price: "£100",
    period: "per month + VAT",
    tagline: "Everything in Starter, plus tools to bring in more work.",
    badge: "Most popular",
    highlighted: true,
    features: [
      "Everything in Starter",
      "CRM to call and text customers",
      "Conversational AI & AI receptionists",
      "Websites and funnels",
      "Reputation & review management",
      "Visual pipeline management",
      "All-in-one cost savings",
    ],
  },
  {
    name: "Professional",
    price: "£150",
    period: "per month + VAT",
    tagline: "Everything in Business, plus diagnostics.",
    features: [
      "Everything in Business",
      "The UK's most advanced AI diagnostic software",
    ],
  },
];

export type Integration = { name: string };

export const INTEGRATIONS: Integration[] = [
  { name: "Xero" },
  { name: "Sage" },
  { name: "DVSA" },
];

export type Step = { title: string; description: string };

export const HOW_IT_WORKS: Step[] = [
  {
    title: "Join the waiting list",
    description: "Leave your email and a few details about your business. It takes under a minute.",
  },
  {
    title: "We set up your workspace",
    description: "When it is your turn, we configure your workshop board, invoicing and customer portal.",
  },
  {
    title: "Go live",
    description: "Start running jobs, invoices and reminders from one system instead of several.",
  },
];

export type Faq = { question: string; answer: string };

export const FAQS: Faq[] = [
  {
    question: "Is GarageCloud live yet?",
    answer:
      "Not yet. We are onboarding workshops from the waiting list first, then opening up more widely.",
  },
  {
    question: "Do I need a card to join the waiting list?",
    answer: "No. Joining the list is free and does not need any payment details.",
  },
  {
    question: "Which trades is GarageCloud built for?",
    answer:
      "Garages, mobile tyre fitters, locksmiths, ECU remapping specialists and fleet services.",
  },
  {
    question: "What's included in each plan?",
    answer:
      "Starter, Business and Professional cover everything from invoicing and reports to CRM, AI receptionists and diagnostics. See the full breakdown in the pricing section above.",
  },
  {
    question: "Will pricing change before launch?",
    answer:
      "The plans shown above are our current pricing. If anything changes before launch, waiting list members will hear first.",
  },
  {
    question: "Can I switch from my current system?",
    answer:
      "Yes. GarageCloud is built to replace the diary, spreadsheet and group chat you are using today. We will share onboarding steps closer to launch.",
  },
];

export type Reason = { title: string; description: string };

export const WHY_JOIN_NOW: Reason[] = [
  {
    title: "Early access",
    description:
      "Get in before the public launch and start with a live workspace from day one.",
  },
  {
    title: "Shape the roadmap",
    description:
      "Tell us what your workshop needs and see it built into the product.",
  },
  {
    title: "Priority onboarding",
    description:
      "Skip the queue when we open the doors, with onboarding help included.",
  },
];
