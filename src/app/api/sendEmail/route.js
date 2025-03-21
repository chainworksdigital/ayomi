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

    // Configure SMTP transport using Postmark
    const transporter = nodemailer.createTransport({
      host: process.env.POSTMARK_SMTP_HOST || "smtp.postmarkapp.com",
      port: process.env.POSTMARK_SMTP_PORT || 587,
      auth: {
        user: process.env.POSTMARK_SERVER_TOKEN,
        pass: process.env.POSTMARK_SERVER_TOKEN,
      },
    });

    // Email options with an HTML template
    const mailOptions = {
      from: process.env.POSTMARK_SENDER_EMAIL, // Verified sender email
      replyTo: email, // Enables quick reply functionality
      to: process.env.RECEIVING_EMAIL, // Your receiving email address
      subject: `New Contact Form Submission from ${name}`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contact Form Submission</title>
      </head>
      <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f2f2f2;">
        <div style="max-width:600px; margin:20px auto; background-color:#fff; border-radius:8px; overflow:hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="background-color:#4CAF50; padding:20px; text-align:center;">
            <h1 style="margin:0; font-size:24px; color:#fff;">New Contact Form Submission</h1>
          </div>
          <div style="padding:20px;">
            <p style="font-size:16px; margin-bottom:10px;"><strong>Name:</strong> ${name}</p>
            <p style="font-size:16px; margin-bottom:10px;">
              <strong>Email:</strong>
              <a href="mailto:${email}" style="color:#4CAF50; text-decoration:none;">${email}</a>
            </p>
            <p style="font-size:16px; margin-bottom:10px;">
              <strong>Mobile:</strong>
              <a href="tel:${mobile}" style="color:#4CAF50; text-decoration:none;">${mobile}</a>
            </p>
            <p style="font-size:16px; margin-bottom:10px;"><strong>Message:</strong></p>
            <p style="font-size:16px; line-height:1.5; margin-bottom:20px;">${message}</p>
            <div style="text-align:center;">
              <a href="mailto:${process.env.RECEIVING_EMAIL}" style="display:inline-block; padding:10px 20px; background-color:#4CAF50; color:#fff; text-decoration:none; border-radius:4px; font-size:16px;">
                Thank You!!
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
      `,
    };

    // Send email using nodemailer
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email", error: error.message },
      { status: 500 }
    );
  }
}
