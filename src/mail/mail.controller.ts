import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('api')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('email')
  async sendEmail(@Body() data: { type: 'create' | 'delete' | 'reached' }) {
    try {
      const { type } = data;
      await this.mailService.sendEmail(type);
      return { msg: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);

      let errorMessage = 'Failed to send email';
      let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      if (error instanceof HttpException) {
        errorMessage = error.message;
        statusCode = error.getStatus();
      }

      throw new HttpException({ message: errorMessage }, statusCode);
    }
  }
}
