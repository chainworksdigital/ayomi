// app/api/contentful/route.js
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Simple GET to show that the endpoint exists.
export async function GET() {
  return NextResponse.json({ message: "Please use POST to send an email." });
}

export async function POST(req) {
  try {
    // Parse the request body
    const { name, email, mobile, message } = await req.json();

    // Configure SMTP transport using environment variables.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // e.g., "racchewarsankalp@gmail.com"
        pass: process.env.EMAIL_PASS, // e.g., your Gmail app password
      },
    });

    // Email options
    const mailOptions = {
      from: email, // Sender's email address (from the form)
      to: process.env.EMAIL_USER, // Your email address (recipient)
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`,
    };

    // Send email using nodemailer
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email ", error: error.message },
      { status: 500 }
    );
  }
}
