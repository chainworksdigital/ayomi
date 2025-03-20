// src/app/api/contentful/route.js
import { createClient } from 'contentful';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  try {
    const response = await client.getEntries({
      content_type: 'webinar',  
      limit: 1,
    });

     if (!response.items.length) {
      return NextResponse.json({ error: 'No webinar entry found' }, { status: 404 });
    }

    const { videoLink, webinarDate } = response.items[0].fields;
    return NextResponse.json({ videoLink, webinarDate });
  } catch (error) {
    console.error('Error fetching from Contentful:', error);
    return NextResponse.json({ error: 'Error fetching data from Contentful' }, { status: 500 });
  }
}
