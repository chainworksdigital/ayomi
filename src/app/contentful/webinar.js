// src/app/contentful/webinar.js
import { contentfulClient } from './contentful';

export async function getWebinarData() {
  console.log('📡 Fetching webinar data from Contentful...');

  try {
    const res = await contentfulClient.getEntries({
      content_type: 'webinar', // Ensure this matches your actual Content Type ID
      limit: 1,
    });

    console.log('✅ Contentful response:', res);

    if (!res?.items?.length) {
      console.log('⚠️ No items found for content_type: "webinar".');
      throw new Error('No webinar entry found.');
    }

    // Extract the fields from the first item
    const { videoLink, webinarDate } = res.items[0].fields;
    console.log('🎥 videoLink:', videoLink, '📅 webinarDate:', webinarDate);

    return { videoLink, webinarDate };
  } catch (error) {
    console.error('❌ Error in getWebinarData:', error);
    throw error; // Rethrow so the API route can catch it
  }
}
