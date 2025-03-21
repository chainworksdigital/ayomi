// src/app/contentful/contentfulConfig.js

// Load from environment variables
export const CONTENTFUL_SPACE_ID =
  process.env.CONTENTFUL_SPACE_ID || ""; // or NEXT_PUBLIC_ prefix if needed client-side
export const CONTENTFUL_ACCESS_TOKEN =
  process.env.CONTENTFUL_ACCESS_TOKEN || ""; // or NEXT_PUBLIC_ prefix if needed client-side
export const CONTENTFUL_ENVIRONMENT_ID =
  process.env.CONTENTFUL_ENVIRONMENT_ID || "master";

// Ensure credentials are set
if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
  throw new Error("❌ Missing Contentful credentials! Check your .env configuration.");
}

// Log values to confirm correct setup (only in development)
if (process.env.NODE_ENV !== "production") {
  console.log("✅ Using Contentful Space ID:", CONTENTFUL_SPACE_ID);
  console.log("✅ Using Contentful Environment ID:", CONTENTFUL_ENVIRONMENT_ID);
}
