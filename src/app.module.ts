import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CryptoApiModule } from './crypto-api/crypto-api.module';

@Module({
  imports: [PrismaModule, CryptoApiModule],
})
export class AppModule {}
