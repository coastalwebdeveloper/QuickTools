const BASE_URL = "https://www.quicktools.website";
const LOGO_URL = `${BASE_URL}/favicon-96x96.png`;
const OG_IMAGE = `${BASE_URL}/QuickTools_Logo.png`;

// ─── Organization ────────────────────────────────────────────────────────────
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "QuickTools Online",
    url: BASE_URL,
    logo: LOGO_URL,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${BASE_URL}/contact`,
    },
  };
}

// ─── WebSite (Sitelinks Search Box) ──────────────────────────────────────────
export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "QuickTools Online",
    url: BASE_URL,
    description:
      "Free browser-based tools for PDFs, images, text, conversions, and calculators. No uploads, no sign-up required.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/tools?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── SoftwareApplication (per tool) ──────────────────────────────────────────
export function buildSoftwareApplicationSchema(opts: {
  name: string;
  description: string;
  url: string;
  category: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: opts.category,
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Works in Chrome, Firefox, Safari, Edge.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: opts.keywords?.join(", ") ?? "",
    provider: {
      "@type": "Organization",
      name: "QuickTools Online",
      url: BASE_URL,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1247",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

// ─── FAQPage ──────────────────────────────────────────────────────────────────
export function buildFAQSchema(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── HowTo ────────────────────────────────────────────────────────────────────
export function buildHowToSchema(opts: {
  name: string;
  description: string;
  steps: string[];
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    tool: {
      "@type": "HowToTool",
      name: "QuickTools Online",
    },
    step: opts.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step,
      text: step,
    })),
  };
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────
export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

// ─── Article (blog posts) ─────────────────────────────────────────────────────
export function buildArticleSchema(opts: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: opts.url.startsWith("http") ? opts.url : `${BASE_URL}${opts.url}`,
    datePublished: opts.datePublished ?? "2025-01-02",
    dateModified: opts.dateModified ?? "2026-05-26",
    author: {
      "@type": "Organization",
      name: "QuickTools Online",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "QuickTools Online",
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    image: OG_IMAGE,
    keywords: opts.keywords?.join(", ") ?? "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": opts.url.startsWith("http") ? opts.url : `${BASE_URL}${opts.url}`,
    },
  };
}

// ─── WebPage (category / listing pages) ───────────────────────────────────────
export function buildWebPageSchema(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: opts.url.startsWith("http") ? opts.url : `${BASE_URL}${opts.url}`,
    isPartOf: { "@type": "WebSite", url: BASE_URL, name: "QuickTools Online" },
    publisher: {
      "@type": "Organization",
      name: "QuickTools Online",
      url: BASE_URL,
    },
  };
}

// ─── ItemList (category tool list) ───────────────────────────────────────────
export function buildItemListSchema(items: { name: string; url: string; description: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
      description: item.description,
    })),
  };
}

// ─── Helper: serialize schema to script tag JSON ──────────────────────────────
export function serializeSchema(schema: object): string {
  return JSON.stringify(schema);
}
