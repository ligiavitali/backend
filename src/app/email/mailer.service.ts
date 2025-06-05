import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {


        user: 'heidi86@ethereal.email',
        pass: 'MyT3q5bzafb3cYSJVw',

      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: '"Sistema" <no-reply@sistema.com>',
      to,
      subject,
      text,
    };

    const info = await this.transporter.sendMail(mailOptions);

    console.log('E-mail enviado. ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  }
}
