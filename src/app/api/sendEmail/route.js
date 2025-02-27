import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, mobile, message } = await req.json();

    // Configure SMTP Transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "racchewarsankalp@gmail.com", // Replace with your email
        pass: "sbxanemkvqkywngc",  
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: "racchewarsankalp@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Email sent successfully!" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error sending email", error }), { status: 500 });
  }
}
