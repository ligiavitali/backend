import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('email')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  async sendEmail(@Body() { to, subject, text }: SendEmailDto) {
    await this.mailerService.sendEmail(to, subject, text);
    return { message: 'E-mail enviado com sucesso!' };
  }
}
