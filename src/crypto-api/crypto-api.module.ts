import { Module } from '@nestjs/common';
import { CryptoApiService } from './crypto-api.service';
import { HttpModule } from '@nestjs/axios';
import { CryptoApiController } from './crypto-api.controller';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [HttpModule],
  providers: [CryptoApiService, MailService],
  controllers: [CryptoApiController],
  exports: [CryptoApiService, HttpModule],
})
export class CryptoApiModule {}
