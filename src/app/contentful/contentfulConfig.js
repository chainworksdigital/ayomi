// src/app/contentful/contentfulConfig.js

export const CONTENTFUL_SPACE_ID = "l1ncw1iaddnw"; // Replace with your actual Space ID
export const CONTENTFUL_ACCESS_TOKEN = "YAvcfx7ykiYVOlt8cJjeopjmRYxznE96TGT-7P2GWic"; // Replace with your actual token
export const CONTENTFUL_ENVIRONMENT_ID = "master"; // Change if needed

// Ensure credentials are set
if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
  throw new Error("❌ Missing Contentful credentials! Check your configuration.");
}

// Log values to confirm correct setup (only in development)
if (process.env.NODE_ENV !== "production") {
  console.log("✅ Using Contentful Space ID:", CONTENTFUL_SPACE_ID);
  console.log("✅ Using Contentful Environment ID:", CONTENTFUL_ENVIRONMENT_ID);
}
