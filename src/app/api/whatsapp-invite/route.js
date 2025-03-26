// src/app/api/whatsapp-invite/route.js

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    // 1. Parse the incoming JSON payload
    const { name, email, mobileNumber } = await request.json();

    // 2. Basic validation
    if (!mobileNumber) {
      return NextResponse.json(
        { error: 'Mobile number is required' },
        { status: 400 }
      );
    }

    // 3. Environment variables (set these in .env.local or in Vercel)
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    // 4. Your Twilio "From" number (Sandbox or production)
    //    e.g., 'whatsapp:+14155238886' for sandbox
    const fromNumber = 'whatsapp:+14155238886';
    const toNumber = `whatsapp:${mobileNumber}`;

    // 5. Construct the WhatsApp message
    const message = `Hello ${name}, thanks for submitting your details!`;

    // 6. Twilio API endpoint
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    // 7. Prepare request data
    const params = new URLSearchParams();
    params.append('From', fromNumber);
    params.append('To', toNumber);
    params.append('Body', message);

    // 8. Basic Auth header for Twilio
    const authHeader = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

    // 9. Make the POST request to Twilio
    await axios.post(url, params, {
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // 10. Return success response
    return NextResponse.json({ message: 'WhatsApp invite sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to send WhatsApp invite' }, { status: 500 });
  }
}
