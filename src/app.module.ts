import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CryptoApiModule } from './crypto-api/crypto-api.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [PrismaModule, CryptoApiModule, MailModule],
})
export class AppModule {}
