// src/app/api/webinar/route.js
import { NextResponse } from 'next/server';
import { getWebinarData } from '@/app/contentful/webinar';

export async function GET() {
  try {
    // Optional: log environment variables again or anything else you need
    console.log('Inside /api/webinar GET route');
    console.log('SPACE_ID:', process.env.CONTENTFUL_SPACE_ID);
    console.log('ENVIRONMENT_ID:', process.env.CONTENTFUL_ENVIRONMENT_ID);

    const { videoLink, webinarDate } = await getWebinarData();

    return NextResponse.json({
      videoLink,
      webinarDate,
    });
  } catch (error) {
    console.error('Error fetching webinar data in route.js:', error);
    return NextResponse.json(
      { message: 'Error fetching webinar data.' },
      { status: 500 }
    );
  }
}
