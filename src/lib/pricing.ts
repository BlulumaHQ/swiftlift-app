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

// ── Stripe Payment Links ──

export const STRIPE_LINKS: Record<string, string> = {
  // Multi-Page Website Packages
  "preview-access": "https://buy.stripe.com/test_aFa00ibbra6IedU4F4aMU00",
  "launch-ready": "https://buy.stripe.com/test_28E5kC6VbceQ9XE1sSaMU01",
  "growth-optimized": "https://buy.stripe.com/test_bJe00i2EVbaM6Ls3B0aMU02",

  // Single-Page Website Packages
  "preview": "https://buy.stripe.com/test_6oU5kC5R77YAgm27RgaMU03",
  "launch": "https://buy.stripe.com/test_3cIaEWcfv1Ac9XE1sSaMU04",
  "growth": "https://buy.stripe.com/test_fZuaEW0wN1Ac4DkdbAaMU05",

  // Add-ons
  "performance-optimization": "https://buy.stripe.com/test_bJe14mfrHdiU9XEc7waMU06",
  "seo-optimization": "https://buy.stripe.com/test_5kQ3cufrHbaM0n4fjIaMU07",
  "social-media-launch-kit": "https://buy.stripe.com/test_6oU5kC3IZ92E1r8c7waMU08",
  "brand-identity-package": "https://buy.stripe.com/test_cNi14m1ARfr24Dk5J8aMU09",

  // Features
  "review-testimonial-section": "https://buy.stripe.com/test_28EaEWbbrgv68TA8VkaMU0f",
  "faq-section": "https://buy.stripe.com/test_bJe8wOa7n6Uw0n40oOaMU0g",
  "advanced-contact-form": "https://buy.stripe.com/test_4gMfZg1AR5Qs8TA1sSaMU0h",
  "booking-request-form": "https://buy.stripe.com/test_fZu6oGdjzbaM7PwdbAaMU0t",
  "multi-step-quote-form": "https://buy.stripe.com/test_8x2bJ0enD5Qs1r8fjIaMU0i",
  "basic-bilingual-setup": "https://buy.stripe.com/test_8x24gy0wN0w84DkdbAaMU0s",
  "blog-setup": "https://buy.stripe.com/test_14A7sK93jdiU8TA1sSaMU0r",
  "gallery-section": "https://buy.stripe.com/test_eVq9AS0wNa6Ib1I2wWaMU0q",
  "google-map-hours-service-area": "https://buy.stripe.com/test_8x2aEW93j5Qsc5MgnMaMU0o",
  "analytics-pixel-tag-setup": "https://buy.stripe.com/test_14A5kCgvL0w80n4b3saMU0m",
  "ecommerce-integration": "https://buy.stripe.com/test_dRm00ifrH0w8edUc7waMU0n",
  "membership-client-portal": "https://buy.stripe.com/test_6oUfZgdjza6I2vcgnMaMU0l",
  "inventory-directory-database": "https://buy.stripe.com/test_14A9AS7Zf2Eg8TA3B0aMU0k",
  "payment-integration": "https://buy.stripe.com/test_8x2bJ03IZgv69XE9ZoaMU0j",

  // Fees
  "reactivation-fee": "https://buy.stripe.com/test_28E00ienD3Ikb1I4F4aMU0c",
  "additional-revision": "https://buy.stripe.com/test_6oUaEWdjzdiU6Ls6NcaMU0d",

  // Hosting
  "managed-monthly": "https://buy.stripe.com/test_cNi5kC5R76Uwb1I4F4aMU0a",
  "managed-yearly": "https://buy.stripe.com/test_4gM6oG0wNfr24Dk9ZoaMU0e",
};

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
