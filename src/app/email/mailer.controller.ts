import { Body, Controller, Post } from '@nestjs/common';

import { MailerService } from './mailer.service';

class SendEmailDto {
  to: string;
  subject: string;
  content: string;
}

@Controller('email')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    const { to, subject, content } = sendEmailDto;

    await this.mailerService.sendEmail(to, subject, content);

    return { message: 'Email enviado com sucesso!' };
  }
}
