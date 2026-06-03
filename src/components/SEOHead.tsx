import { Helmet } from "react-helmet-async";
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
  serializeSchema,
} from "@/lib/seoSchemas";

const BASE_URL = "https://www.quicktools.website";
const DEFAULT_OG_IMAGE = `${BASE_URL}/QuickTools_Logo.png`;

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
  schemas?: object[];    // Additional page-specific JSON-LD schemas
}

const SEOHead = ({
  title,
  description,
  canonical,
  keywords = [],
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
  schemas = [],
}: SEOHeadProps) => {
  const canonicalUrl = canonical ?? BASE_URL;
  const fullTitle = title.includes("QuickTools") ? title : `${title} | QuickTools`;

  // Always include site-wide schemas
  const allSchemas = [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    ...schemas,
  ];

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="QuickTools Online – Free Browser-Based Productivity Tools" />
      <meta property="og:site_name" content="QuickTools Online" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="QuickTools Online" />

      {/* AI Search Engines */}
      <meta name="author" content="QuickTools Online" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* hreflang */}
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* JSON-LD Schemas */}
      {allSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeSchema(schema) }}
        />
      ))}
    </Helmet>
  );
};

export default SEOHead;
