// pages/api/contentful.js
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  try {
    const response = await client.getEntries({
      content_type: 'webinar',
      limit: 1,
    });
    if (!response.items.length) {
      return res.status(404).json({ error: 'No webinar entry found' });
    }
    const { videoLink, webinarDate } = response.items[0].fields;
    res.status(200).json({ videoLink, webinarDate });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Contentful' });
  }
}
