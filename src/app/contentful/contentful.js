// src/app/contentful/contentful.js
import { createClient } from 'contentful';
import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_ENVIRONMENT_ID } from './contentfulConfig';

export const contentfulClient = createClient({
  space: CONTENTFUL_SPACE_ID,
  environment: CONTENTFUL_ENVIRONMENT_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

// Log to confirm Contentful is initialized
console.log("✅ Contentful client initialized with environment:", CONTENTFUL_ENVIRONMENT_ID);
