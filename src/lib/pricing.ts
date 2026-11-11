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
      price: 99,
      type: "one_time",
    },
    {
      key: "seo-optimization",
      name: "SEO Optimization",
      price: 99,
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
      price: 299,
      type: "one_time",
    },
  ],
  features: [
    {
      key: "review-testimonial-section",
      name: "Review / Testimonial Section",
      price: 49,
      type: "one_time",
    },
    {
      key: "faq-section",
      name: "FAQ Section",
      price: 49,
      type: "one_time",
    },
    {
      key: "advanced-contact-form",
      name: "Advanced Contact Form",
      price: 129,
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
      price: 149,
      type: "one_time",
    },
    {
      key: "basic-bilingual-setup",
      name: "Basic Bilingual Setup",
      price: 149,
      type: "one_time",
    },
    {
      key: "blog-setup",
      name: "Blog Setup",
      price: 149,
      type: "one_time",
    },
    {
      key: "gallery-section",
      name: "Gallery Section",
      price: 99,
      type: "one_time",
    },
    {
      key: "google-map-hours-service-area",
      name: "Google Map / Hours / Service Area",
      price: 49,
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
      price: 249,
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
      price: 15,
      interval: "month",
      type: "subscription",
    },
    managedYearly: {
      key: "managed-yearly",
      name: "Managed Yearly",
      price: 135,
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
      price: 45,
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

// ── Stripe Payment Links ──

export const STRIPE_LINKS: Record<string, string> = {
  // Multi-Page Website Packages
  "preview-access": "https://buy.stripe.com/9B63cu2GwaQ56zq8PXfw40o",
  "launch-ready": "https://buy.stripe.com/eVq00ich66zP8Hy2rzfw40q",
  "growth-optimized": "https://buy.stripe.com/28EaEWch6e2he1Sc29fw40n",

  // Single-Page Website Packages
  "preview": "https://buy.stripe.com/5kQ6oGbd27DT2ja7LTfw40m",
  "launch": "https://buy.stripe.com/7sY6oGepe7DT3ne3vDfw40l",
  "growth": "https://buy.stripe.com/dRm7sKgxm8HX2ja0jrfw40k",

  // Add-ons
  "performance-optimization": "https://buy.stripe.com/9B67sK94U0bre1S9U1fw40I",
  "seo-optimization": "https://buy.stripe.com/9B6cN494UcYd7Dufelfw40J",
  "social-media-launch-kit": "https://buy.stripe.com/fZuaEW6WM1fv4rid6dfw40W",
  "brand-identity-package": "https://buy.stripe.com/fZu14m80Qf6l4rieahfw40H",

  // Features
  "review-testimonial-section": "https://buy.stripe.com/9B69AS5SI4rHf5WaY5fw40R",
  "faq-section": "https://buy.stripe.com/cNifZg3KA2jz7Du2rzfw40U",
  "advanced-contact-form": "https://buy.stripe.com/7sYdR82Gwf6lf5W3vDfw40M",
  "booking-request-form": "https://buy.stripe.com/bJeaEW94U4rH8Hy5DLfw40L",
  "multi-step-quote-form": "https://buy.stripe.com/3cIbJ06WMbU98Hy2rzfw40K",
  "basic-bilingual-setup": "https://buy.stripe.com/3cI4gya8Y1fvcXO0jrfw40O",
  "blog-setup": "https://buy.stripe.com/dRmcN4gxm1fv1f69U1fw40P",
  "gallery-section": "https://buy.stripe.com/4gM14m6WM5vLbTK0jrfw40Q",
  "google-map-hours-service-area": "https://buy.stripe.com/4gM6oG4OE8HXga03vDfw40T",
  "analytics-pixel-tag-setup": "https://buy.stripe.com/6oU7sK0yo3nD0b2c29fw40S",
  "ecommerce-integration": "https://buy.stripe.com/dRmcN40yogap7Dufelfw409",
  "membership-client-portal": "https://buy.stripe.com/9B63cu1Cs2jz5vmeahfw40F",
  "inventory-directory-database": "https://buy.stripe.com/fZu28qepe7DT2jac29fw400",
  "payment-integration": "https://buy.stripe.com/4gMeVc80Qf6l1f63vDfw40G",

  // Fees
  "reactivation-fee": "https://buy.stripe.com/00w14m2Gw1fv7Du1nvfw40d",
  "additional-revision": "https://buy.stripe.com/4gM3cugxm1fv0b2c29fw40x",

  // Hosting
  "managed-monthly": "https://buy.stripe.com/dRmeVcch62jz0b20jrfw40z",
  "managed-yearly": "https://buy.stripe.com/fZubJ0bd2e2hbTKd6dfw40y",

  // Bundles (current, match /addons and /features)
  "bundle-conversion-essentials": "https://buy.stripe.com/eVq7sK6WMbU95vmfelfw40E",
  "bundle-lead-generation-pack": "https://buy.stripe.com/dRmbJ0epe7DT4ri6HPfw40D",
  "bundle-conversion-upgrade-pack": "https://buy.stripe.com/bJedR84OE5vLga0c29fw40C",
  // Bundles (legacy, inactive in Stripe)
  "bundle-website-essentials": "https://buy.stripe.com/28E7sK0yo5vLe1S0jrfw40w",
  "bundle-advanced-inquiry": "https://buy.stripe.com/fZucN45SI0braPG0jrfw40v",
  "bundle-conversion-booster": "https://buy.stripe.com/4gM28q4OE3nDaPG3vDfw40u",
  "bundle-business-growth": "https://buy.stripe.com/fZu8wO0yof6l0b2eahfw40t",
  "bundle-premium-brand-launch": "https://buy.stripe.com/4gM3cugxmcYd3neaY5fw40s",

  // Internal Testing
  "internal-payment-test": "https://buy.stripe.com/00wdR82GwaQ55vm2rzfw40A",
};

// ── Formatting helpers ──

export const formatPrice = (value: number): string =>
  `$${value.toLocaleString("en-US")} USD`;

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
