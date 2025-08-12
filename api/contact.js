import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Create the transporter (same as before)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // from Vercel environment variable
      pass: process.env.EMAIL_PASS, // from Vercel environment variable
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'akhilwork91@gmail.com', // receiving email
      subject: `[Portfolio] ${subject}`,
      text: message,
      html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return res.status(200).json({ success: true, message: 'Message sent!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
}
