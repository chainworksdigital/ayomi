// src/app/api/register/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, phone } = await request.json();
    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
     const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    
     const scriptRes = await fetch(googleAppsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    });
    
    if (!scriptRes.ok) {
      throw new Error("Failed to submit data to Google Sheets via Apps Script");
    }
    
    return NextResponse.json({ message: "Registration successful" }, { status: 200 });
  } catch (error) {
    console.error("Error in registration route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
