import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function sendMail(request: NextApiRequest, result: NextApiResponse) {
  if (request.method !== 'POST') {
    return result.status(405).json({ message: 'Only post message are allowed' });
  }
  try {
    const { email, message, name } = request.body;
    const transport = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: 'api',
        pass: '77b2667d5125689b06ed3ad77c1e7cff',
      },
    });
    const mailOptions = {
      from: 'Kongsamba Hip-Hop Mag <ronaldkamgaing4@demomailtrap.com>',
      to: email,
      subject: `Message de ${name}`,
      text: message,
    };
    await transport.sendMail(mailOptions);
    return result.status(200).json({ message: 'Mail successfully sent!' });
  } catch (error) {
    return result.status(500).json({ message: 'Cannot send mail' });
  }
}
