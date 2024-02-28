import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CryptoApiModule } from './crypto-api/crypto-api.module';
import { MailModule } from './mail/mail.module';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [PrismaModule, CryptoApiModule, MailModule, AlertsModule],
})
export class AppModule {}
