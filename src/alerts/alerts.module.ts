import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { MailModule } from '../mail/mail.module';

@Module({
  providers: [AlertsService],
  controllers: [AlertsController],
  imports: [MailModule],
})
export class AlertsModule {}
