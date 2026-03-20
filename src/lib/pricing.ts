export const PRICING = {
  websitePackages: {
    multiPage: [
      {
        key: "preview-access",
        name: "Preview Access",
        price: 299,
        type: "one_time",
      },
      {
        key: "launch-ready",
        name: "Launch Ready",
        price: 499,
        type: "one_time",
      },
      {
        key: "growth-optimized",
        name: "Growth Optimized",
        price: 799,
        type: "one_time",
      },
    ],
    singlePage: [
      {
        key: "preview",
        name: "Preview",
        price: 199,
        type: "one_time",
      },
      {
        key: "launch",
        name: "Launch",
        price: 349,
        type: "one_time",
      },
      {
        key: "growth",
        name: "Growth",
        price: 549,
        type: "one_time",
      },
    ],
    customSolutions: [
      {
        key: "starter-custom",
        name: "Starter Custom",
        price: 1499,
        type: "starting_at",
      },
      {
        key: "business-custom",
        name: "Business Custom",
        price: 2499,
        type: "starting_at",
      },
      {
        key: "advanced",
        name: "Advanced",
        price: 4999,
        type: "starting_at_plus",
      },
    ],
  },
  addons: [
    {
      key: "performance-optimization",
      name: "Performance Optimization",
      price: 199,
      type: "one_time",
    },
    {
      key: "seo-optimization",
      name: "SEO Optimization",
      price: 299,
      type: "one_time",
    },
    {
      key: "social-media-launch-kit",
      name: "Social Media Launch Kit",
      price: 299,
      type: "one_time",
    },
    {
      key: "brand-identity-package",
      name: "Brand Identity Package",
      price: 499,
      type: "one_time",
    },
  ],
  features: [
    {
      key: "review-testimonial-section",
      name: "Review / Testimonial Section",
      price: 99,
      type: "one_time",
    },
    {
      key: "faq-section",
      name: "FAQ Section",
      price: 79,
      type: "one_time",
    },
    {
      key: "advanced-contact-form",
      name: "Advanced Contact Form",
      price: 149,
      type: "one_time",
    },
    {
      key: "booking-request-form",
      name: "Booking Request Form",
      price: 149,
      type: "one_time",
    },
    {
      key: "multi-step-quote-form",
      name: "Multi-Step Quote Form",
      price: 199,
      type: "one_time",
    },
    {
      key: "basic-bilingual-setup",
      name: "Basic Bilingual Setup",
      price: 199,
      type: "one_time",
    },
    {
      key: "blog-setup",
      name: "Blog Setup",
      price: 199,
      type: "one_time",
    },
    {
      key: "gallery-section",
      name: "Gallery Section",
      price: 129,
      type: "one_time",
    },
    {
      key: "google-map-hours-service-area",
      name: "Google Map / Hours / Service Area",
      price: 99,
      type: "one_time",
    },
    {
      key: "analytics-pixel-tag-setup",
      name: "Analytics / Pixel / Tag Setup",
      price: 99,
      type: "one_time",
    },
    {
      key: "ecommerce-integration",
      name: "E-Commerce Integration",
      price: 499,
      type: "starting_at",
    },
    {
      key: "membership-client-portal",
      name: "Membership / Client Portal",
      price: 399,
      type: "starting_at",
    },
    {
      key: "crm-integration",
      name: "CRM Integration",
      price: null,
      type: "custom_quote",
    },
    {
      key: "inventory-directory-database",
      name: "Inventory / Directory / Database",
      price: 499,
      type: "starting_at",
    },
    {
      key: "custom-automation",
      name: "Custom Automation",
      price: null,
      type: "custom_quote",
    },
    {
      key: "payment-integration",
      name: "Payment Integration",
      price: 299,
      type: "starting_at",
    },
  ],
  hosting: {
    freeHosting: {
      key: "free-hosting",
      name: "Free Hosting",
      price: 0,
      type: "free",
    },
    managedMonthly: {
      key: "managed-monthly",
      name: "Managed Monthly",
      price: 12,
      interval: "month",
      type: "subscription",
    },
    managedYearly: {
      key: "managed-yearly",
      name: "Managed Yearly",
      price: 100,
      interval: "year",
      type: "subscription",
    },
  },
  fees: {
    reactivationFee: {
      key: "reactivation-fee",
      name: "Reactivation Fee",
      price: 50,
      type: "one_time",
    },
    additionalRevision: {
      key: "additional-revision",
      name: "Additional Revision",
      price: 25,
      unit: "submission",
      type: "one_time_per_unit",
    },
  },
  customBrief: {
    businessWebsite: {
      key: "business-website",
      name: "Business Website",
      startingAt: 999,
      typicalRangeMin: 999,
      typicalRangeMax: 2499,
      type: "range",
    },
    ecommerceWebsite: {
      key: "ecommerce-website",
      name: "E-commerce Website",
      startingAt: 1299,
      typicalRangeMin: 1299,
      typicalRangeMax: 3299,
      type: "range",
    },
  },
} as const;

// ── Formatting helpers ──

export const formatPrice = (value: number): string =>
  `$${value.toLocaleString("en-US")}`;

export const formatStartingAt = (value: number): string =>
  `Starting at ${formatPrice(value)}`;

export const formatStartingAtPlus = (value: number): string =>
  `${formatPrice(value)}+`;

export const formatRange = (min: number, max: number): string =>
  `${formatPrice(min)} – ${formatPrice(max)}`;

export const formatSubscriptionPrice = (value: number, interval: string): string =>
  `${formatPrice(value)} / ${interval}`;

export const formatPriceByType = (
  item: { price: number | null; type: string }
): string => {
  if (item.type === "custom_quote") return "Custom Quote";
  if (item.type === "starting_at") return formatStartingAt(item.price!);
  if (item.type === "starting_at_plus") return formatStartingAtPlus(item.price!);
  if (item.price === 0) return "$0";
  return formatPrice(item.price!);
};
