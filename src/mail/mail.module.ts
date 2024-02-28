import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfig } from './mail.config';
import { MailController } from './mail.controller';

@Module({
  providers: [MailService],
  exports: [MailService],
  imports: [MailerModule.forRoot(MailConfig)],
  controllers: [MailController],
})
export class MailModule {}
