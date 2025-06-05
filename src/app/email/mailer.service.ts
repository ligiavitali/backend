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
         user: 'leonardo17@ethereal.email',
        pass: 'mHFca937yH8K8W448j'
      },
    });
  }

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    const mailOptions = {
      from: '"Sistema" <no-reply@sistema.com>',
      to,
      subject,
      text: content,
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  }
}
