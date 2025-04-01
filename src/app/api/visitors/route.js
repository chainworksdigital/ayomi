// app/api/visitors/route.js
import { kv } from '@vercel/kv'; // Make sure you have installed and set up @vercel/kv if you're using it

export async function GET() {
  let count = await kv.get('visitorCount');
  count = count ? parseInt(count, 10) : 0;
  return new Response(JSON.stringify({ count }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST() {
  const count = await kv.incr('visitorCount');
  return new Response(JSON.stringify({ count }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
