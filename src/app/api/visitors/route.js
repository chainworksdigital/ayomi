import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GET() {
  try {
    console.log('GET /api/visitors called');
    let count = await redis.get('visitorCount');
    count = count ? parseInt(count, 10) : 0;

    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GET /api/visitors error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to get visitor count' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function POST() {
  try {
    console.log('POST /api/visitors called');
    const count = await redis.incr('visitorCount');

    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('POST /api/visitors error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to increment visitor count' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
