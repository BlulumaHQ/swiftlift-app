// Industry landing pages (/website-redesign/:slug).
// Plain data only — no image or "@/..." imports — because scripts/prerenderPlugin.ts
// and scripts/sitemapPlugin.ts import this file in Node at build time.
// Images per case are mapped in src/pages/IndustryPage.tsx.

export type CaseKey =
  | "friendlyDental"
  | "westsideMedical"
  | "phoenixRemodel"
  | "architect57"
  | "genes"
  | "presotea"
  | "studio21"
  | "stylesHair"
  | "onePark"
  | "artsAutomotive";

export interface IndustryPage {
  slug: string;
  /** Short label used in nav/footer and breadcrumbs, e.g. "Dentists" */
  label: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  painH2: string;
  pains: string[];
  buildH2: string;
  builds: { title: string; body: string }[];
  cases: CaseKey[];
  faqs: { q: string; a: string }[];
}

export const INDUSTRY_PAGES: IndustryPage[] = [
  {
    slug: "dentists",
    label: "Dentists",
    title: "Dental Website Redesign — See 2 Versions Free | SwiftLift",
    description:
      "Dental practice website redesign for US dentists. Get two live redesign previews of your site in 48 hours, then pay only for the one you choose. From $299.",
    eyebrow: "Website redesign for dental practices",
    h1: "A dental website that turns visitors into booked patients",
    intro:
      "Most patients choose a dentist on their phone, in under a minute. If your site looks dated, buries the phone number or makes booking hard, they move on to the next practice in the search results. SwiftLift rebuilds your existing dental website into two modern versions — you browse both, then choose the one you want to launch.",
    painH2: "Signs your dental website is costing you patients",
    pains: [
      "The phone number and booking button are hard to find on mobile",
      "Service pages (implants, Invisalign, cleanings) are thin or missing",
      "Photos of the team and office look outdated — or there are none",
      "The site loads slowly and looks broken on phones",
      "New-patient information, insurance and hours are hard to find",
    ],
    buildH2: "What we build for dental practices",
    builds: [
      {
        title: "Booking-first layout",
        body: "Call and book-appointment buttons stay visible on every page, so a patient is never more than one tap away from contacting you.",
      },
      {
        title: "Clear service pages",
        body: "Each treatment gets its own section in plain language, so patients understand what you offer and search engines can match it.",
      },
      {
        title: "Trust built in",
        body: "Team introductions, office photos, reviews and new-patient details are placed where nervous patients look for reassurance.",
      },
      {
        title: "Fast and mobile-ready",
        body: "Lightweight static sites that load quickly on phones — with basic on-page SEO structure included.",
      },
    ],
    cases: ["friendlyDental", "westsideMedical"],
    faqs: [
      {
        q: "Can you redesign my dental website if it was built by another agency?",
        a: "Yes. Send us your current website address. We use your existing content as the starting point and rebuild it into two new versions. Your current site stays live until you are ready to switch.",
      },
      {
        q: "Can patients book appointments online from the new site?",
        a: "Yes. We link your booking buttons to the scheduling system you already use. Deeper booking integrations are available as a quoted upgrade.",
      },
      {
        q: "How much does a dental website redesign cost?",
        a: "Version A starts at $299 USD and Version B, our conversion-focused layout, is $499 USD. You see both versions before you pay anything.",
      },
      {
        q: "Will the new website store patient health information?",
        a: "No. SwiftLift builds marketing websites. Contact forms are meant for general inquiries; patient records and health information should stay in your practice management software.",
      },
    ],
  },
  {
    slug: "contractors",
    label: "Contractors",
    title: "Contractor Website Redesign — 2 Free Previews | SwiftLift",
    description:
      "Website redesign for contractors, remodelers and builders. Two live previews of your new site in 48 hours — pay only for the one you choose. From $299.",
    eyebrow: "Website redesign for contractors & remodelers",
    h1: "A contractor website that wins more estimate requests",
    intro:
      "Homeowners compare three or four contractors before they call anyone. Your website is where they judge your quality, long before they see your work in person. SwiftLift rebuilds your existing site into two modern versions that put your projects, service area and quote request front and center — you choose the one you like.",
    painH2: "Signs your contractor website is losing jobs",
    pains: [
      "Your best project photos are buried or missing",
      "Visitors can't quickly tell which services and areas you cover",
      "There's no clear 'Get a Free Estimate' path on mobile",
      "The site looks older than the quality of your work",
      "Reviews and licensing details are hard to find",
    ],
    buildH2: "What we build for contractors",
    builds: [
      {
        title: "Project-first galleries",
        body: "Before-and-after and finished-project photos are given room to sell your workmanship.",
      },
      {
        title: "Estimate request flow",
        body: "A short quote form and click-to-call buttons on every page turn browsing into real leads.",
      },
      {
        title: "Services & service area",
        body: "Clear sections for each service you offer and the cities you cover — helpful to homeowners and to local search.",
      },
      {
        title: "Credibility signals",
        body: "Reviews, years in business, licensing and insurance details placed where homeowners look for them.",
      },
    ],
    cases: ["phoenixRemodel", "architect57"],
    faqs: [
      {
        q: "Do you build websites for general contractors, remodelers and specialty trades?",
        a: "Yes. Remodelers, general contractors, builders and specialty trades all share the same need: show the work, explain the services and make it easy to request a quote.",
      },
      {
        q: "Can I add new project photos after launch?",
        a: "Yes. Send us new photos and we will add them in a revision round ($45 USD), or choose Managed Hosting ($15 USD/month), which includes one free revision every month.",
      },
      {
        q: "How long does a contractor website redesign take?",
        a: "You receive two live previews within 48 hours of submitting your current website. After you choose a version and pay, launch typically follows within a few days.",
      },
      {
        q: "Do I need to have a website already?",
        a: "SwiftLift specializes in redesigning existing websites. If you are starting from scratch, use our Custom Quote page and we will put together a proposal.",
      },
    ],
  },
  {
    slug: "restaurants",
    label: "Restaurants",
    title: "Restaurant Website Redesign — See 2 Versions Free | SwiftLift",
    description:
      "Restaurant and food business website redesign. Two live previews in 48 hours with your menu, hours and location up front — pay only for the one you choose. From $299.",
    eyebrow: "Website redesign for restaurants & food businesses",
    h1: "A restaurant website that gets people through the door",
    intro:
      "When someone searches for a place to eat, they want three things fast: the menu, the hours and where you are. If your website hides them behind a slow homepage or a PDF menu, hungry customers pick somewhere else. SwiftLift rebuilds your existing site into two modern versions designed around how diners actually decide.",
    painH2: "Signs your restaurant website is turning diners away",
    pains: [
      "Your menu is a PDF or an image that's hard to read on a phone",
      "Hours, address and parking info take too long to find",
      "Food photos don't do your dishes justice",
      "Ordering, reservation or delivery links are missing or broken",
      "The site still shows old prices or old seasonal specials",
    ],
    buildH2: "What we build for restaurants",
    builds: [
      {
        title: "Mobile-friendly menus",
        body: "Your menu as real text on the page — readable on any phone and visible to search engines.",
      },
      {
        title: "Hours, map & directions up front",
        body: "The information diners need most is visible within seconds, on every device.",
      },
      {
        title: "Food-first visuals",
        body: "Layouts that give your dishes and space room to look as good as they taste.",
      },
      {
        title: "Order & reserve buttons",
        body: "Prominent links to the ordering, delivery or reservation platforms you already use.",
      },
    ],
    cases: ["genes", "presotea"],
    faqs: [
      {
        q: "Can you put my menu on the website instead of a PDF?",
        a: "Yes. We build your menu into the page as real text, which reads better on phones and helps search engines understand what you serve.",
      },
      {
        q: "Can I link to my online ordering or reservations?",
        a: "Yes. We add clear buttons to the ordering, delivery or reservation services you already use.",
      },
      {
        q: "How do I update menu prices later?",
        a: "Send us the changes. Revisions are $45 USD per round, or $15 USD/month with Managed Hosting, which includes one free revision every month.",
      },
      {
        q: "Can you build an online store for my food products?",
        a: "SwiftLift sites are fast static websites and don't include shopping carts. For e-commerce, use our Custom Quote page.",
      },
    ],
  },
  {
    slug: "salons",
    label: "Salons & Spas",
    title: "Salon & Spa Website Redesign — 2 Free Previews | SwiftLift",
    description:
      "Website redesign for hair salons, beauty salons and spas. Two live previews of your new site in 48 hours — pay only for the one you choose. From $299.",
    eyebrow: "Website redesign for salons & spas",
    h1: "A salon website as polished as your work",
    intro:
      "Clients pick a salon or spa with their eyes. If your website feels dated, it doesn't matter how good your stylists are — people book somewhere that looks the part. SwiftLift rebuilds your existing site into two modern, on-brand versions that showcase your services and make booking effortless.",
    painH2: "Signs your salon website is losing bookings",
    pains: [
      "The 'Book Now' button is hard to find, especially on mobile",
      "Service menus and prices are out of date or missing",
      "Your portfolio of work isn't showcased",
      "The look of the site doesn't match the experience in your chair",
      "Stylist bios and specialties are missing",
    ],
    buildH2: "What we build for salons & spas",
    builds: [
      {
        title: "Book-now everywhere",
        body: "Booking buttons linked to the scheduling app you already use, visible on every page.",
      },
      {
        title: "Clear service menu",
        body: "Services and pricing laid out so clients know what to book before they arrive.",
      },
      {
        title: "Portfolio & team",
        body: "Space for your best work and your stylists, so clients can choose who they want.",
      },
      {
        title: "A premium look",
        body: "Typography, color and imagery that match the feel of your space.",
      },
    ],
    cases: ["studio21", "stylesHair"],
    faqs: [
      {
        q: "Will my booking app work with the new website?",
        a: "Yes. We link your Book Now buttons to the online booking system you already use.",
      },
      {
        q: "Can you show each stylist's work and specialties?",
        a: "Yes. Team and portfolio sections are part of the redesign, built from the photos and details you provide.",
      },
      {
        q: "How much does a salon website redesign cost?",
        a: "Version A starts at $299 USD and Version B is $499 USD. You see both versions live before paying.",
      },
      {
        q: "What if I don't like either preview?",
        a: "You are under no obligation. You only pay if you choose a version to launch.",
      },
    ],
  },
  {
    slug: "real-estate",
    label: "Real Estate",
    title: "Realtor Website Redesign — 2 Free Previews | SwiftLift",
    description:
      "Website redesign for realtors, real estate teams and property businesses. Two live previews in 48 hours — pay only for the one you choose. From $299.",
    eyebrow: "Website redesign for realtors & real estate",
    h1: "A real estate website that makes you look like the obvious choice",
    intro:
      "Buyers and sellers research agents online before they ever pick up the phone. A dated website quietly tells them you're behind the market. SwiftLift rebuilds your existing site into two polished versions that put your listings, your track record and your contact details where they count.",
    painH2: "Signs your real estate website is holding you back",
    pains: [
      "Your site looks like a template every other agent uses",
      "Featured properties and sold listings are hard to browse",
      "There's no clear way for sellers to request a home valuation",
      "Your personal brand and local expertise don't come through",
      "Contact details and a headshot aren't visible on mobile",
    ],
    buildH2: "What we build for real estate professionals",
    builds: [
      {
        title: "Property-first presentation",
        body: "Large, clean property layouts that let your listings and photography shine.",
      },
      {
        title: "Lead capture",
        body: "Valuation and contact forms positioned to turn browsing buyers and sellers into conversations.",
      },
      {
        title: "Personal brand",
        body: "Your story, local expertise and testimonials presented with confidence.",
      },
      {
        title: "Mobile-ready",
        body: "Fast pages that look sharp on the phones your clients are using.",
      },
    ],
    cases: ["onePark"],
    faqs: [
      {
        q: "Can the website show my MLS listings automatically?",
        a: "SwiftLift sites showcase featured properties you select. Automatic MLS/IDX feeds require a custom integration — ask about it through our Custom Quote page.",
      },
      {
        q: "Do you work with real estate teams and brokerages?",
        a: "Yes. Individual agents, teams and property businesses all use the same two-preview process.",
      },
      {
        q: "How much does a realtor website redesign cost?",
        a: "Version A starts at $299 USD and Version B is $499 USD. You see both versions before you pay.",
      },
      {
        q: "Can I keep my current domain name?",
        a: "Yes. You keep full ownership of your domain, and we help connect it to your new site when you're ready to launch.",
      },
    ],
  },
  {
    slug: "auto-repair",
    label: "Auto Repair",
    title: "Auto Repair Shop Website Redesign — 2 Free Previews | SwiftLift",
    description:
      "Website redesign for auto repair shops and mechanics. Two live previews of your new site in 48 hours — pay only for the one you choose. From $299.",
    eyebrow: "Website redesign for auto repair shops",
    h1: "An auto repair website that earns trust before the first call",
    intro:
      "Drivers looking for a mechanic want to know three things: what you fix, whether you can be trusted and how fast they can get in. If your website doesn't answer those on a phone screen, they call the next shop. SwiftLift rebuilds your existing site into two modern versions built around exactly those questions.",
    painH2: "Signs your shop's website is sending customers elsewhere",
    pains: [
      "Services you offer aren't clearly listed",
      "There's no easy way to call or request an appointment on mobile",
      "Hours, location and warranty info are hard to find",
      "Reviews and certifications aren't shown",
      "The site looks like it hasn't been updated in years",
    ],
    buildH2: "What we build for auto repair shops",
    builds: [
      {
        title: "Service menu",
        body: "Brakes, diagnostics, maintenance and more — listed clearly so drivers know you can help.",
      },
      {
        title: "Call & book buttons",
        body: "One tap to call or request service, on every page and every device.",
      },
      {
        title: "Trust signals",
        body: "Reviews, certifications, warranties and years in business, where customers look for them.",
      },
      {
        title: "Local information",
        body: "Hours, map and directions up front for drivers nearby.",
      },
    ],
    cases: ["artsAutomotive"],
    faqs: [
      {
        q: "Can customers request an appointment from the website?",
        a: "Yes. Every redesign includes a contact form and click-to-call buttons; we can also link to an online booking tool you already use.",
      },
      {
        q: "How fast will I see my previews?",
        a: "You receive two live, clickable previews within 48 hours of submitting your current website.",
      },
      {
        q: "How much does an auto repair website redesign cost?",
        a: "Version A starts at $299 USD and Version B is $499 USD. You only pay for the version you choose.",
      },
      {
        q: "Is hosting included?",
        a: "Yes. Hosting is free with no monthly fees. Optional Managed Hosting is $15 USD/month and includes a monthly revision and priority support.",
      },
    ],
  },
];

export const industryBySlug = (slug: string | undefined) =>
  INDUSTRY_PAGES.find((p) => p.slug === slug);
