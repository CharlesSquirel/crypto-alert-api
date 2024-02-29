import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfig } from './mail.config';

@Module({
  providers: [MailService],
  exports: [MailService],
  imports: [MailerModule.forRoot(MailConfig)],
})
export class MailModule {}
