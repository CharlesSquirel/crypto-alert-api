import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(type: 'create' | 'delete' | 'reached') {
    try {
      const subject =
        type === 'create'
          ? `Creation alert`
          : type === 'delete'
          ? 'Delete alert'
          : 'Reached alert';

      const template =
        type === 'create'
          ? `./templates/creation-alert`
          : type === 'delete'
          ? './templates/delete-alert'
          : './templates/reached-alert';

      await this.mailerService.sendMail({
        to: process.env.EMAIL,
        subject,
        template,
      });
    } catch (error) {
      console.error(`Error sending email: ${error}`);

      if (error.response && error.response.status) {
        const statusCode = error.response.status;
        if (statusCode === 400) {
          console.error('Bad Request error occurred.');
        } else if (statusCode === 403) {
          console.error('Forbidden error occurred.');
        } else {
          console.error('Unexpected HTTP error occurred.');
        }
      } else {
        console.error('Unexpected error occurred.');
      }
    }
  }
}
