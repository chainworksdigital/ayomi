import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse form data from the request
    const { name, email, mobile, message } = await request.json();
    if (!name || !email || !mobile || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the Google Apps Script URL from your environment variables
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_CONTACT_URL;

    // Forward the data to the Google Apps Script web app
    const scriptRes = await fetch(googleAppsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, mobile, message }),
    });

    if (!scriptRes.ok) {
      throw new Error("Failed to submit data to Google Sheets via Apps Script");
    }

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact form submission route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
