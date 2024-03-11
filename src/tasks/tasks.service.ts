import { Injectable } from '@nestjs/common';
import { CryptoApiService } from 'src/crypto-api/crypto-api.service';
import { MailService } from 'src/mail/mail.service';
import { thresholds } from './tresholds';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(
    private cryptoService: CryptoApiService,
    private mailService: MailService,
  ) {}

  @Cron(CronExpression.EVERY_WEEK)
  async checkCryptoPrices() {
    const prices = await this.cryptoService.getCrypto();

    for (const [crypto, price] of Object.entries(prices)) {
      if (price >= thresholds[crypto]) {
        await this.mailService.sendEmail('reached', { crypto, price });
      }
    }
  }
}
