import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CryptoApiModule } from 'src/crypto-api/crypto-api.module';

@Global()
@Module({
  providers: [PrismaService],
  imports: [CryptoApiModule],
})
export class PrismaModule {}
