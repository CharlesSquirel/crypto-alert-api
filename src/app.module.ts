import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CryptoApiModule } from './crypto-api/crypto-api.module';
import { MailModule } from './mail/mail.module';
import { AlertsModule } from './alerts/alerts.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './tasks/tasks.module';

@Module({
  imports: [
    PrismaModule,
    CryptoApiModule,
    MailModule,
    AlertsModule,
    ScheduleModule.forRoot(),
    TaskModule,
  ],
})
export class AppModule {}
