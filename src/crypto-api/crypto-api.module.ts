import { Module } from '@nestjs/common';
import { CryptoApiService } from './crypto-api.service';
import { HttpModule } from '@nestjs/axios';
import { CryptoApiController } from './crypto-api.controller';

@Module({
  imports: [HttpModule],
  providers: [CryptoApiService],
  controllers: [CryptoApiController],
})
export class CryptoApiModule {}
