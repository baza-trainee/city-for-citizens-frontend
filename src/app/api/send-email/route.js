import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  try {
    const { name, email, phone, messenger, eventDescription } =
      await req.json();

    // Create a transporter using SMTP details
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Create an email message
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: 'Пропоную подію',
      text: `
        Name: ${name}
        E-mail: ${email}
        Phone: ${phone}
        Messenger: ${messenger}
        Event: ${eventDescription}
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Your email has been sent!',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error, please try again',
      },
      {
        status: 500,
      }
    );
  }
}
