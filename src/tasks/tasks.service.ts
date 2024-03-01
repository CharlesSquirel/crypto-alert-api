import { Injectable } from '@nestjs/common';
import { CryptoApiService } from 'src/crypto-api/crypto-api.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class TasksService {
  constructor(
    private cryptoService: CryptoApiService,
    private mailService: MailService,
  ) {}

  async checkCryptoPrices() {
    const prices = await this.cryptoService.getCrypto();

    const thresholds = {
      BTC: 50000,
      ETH: 2000,
    };

    for (const [crypto, price] of Object.entries(prices)) {
      if (price >= thresholds[crypto]) {
        await this.mailService.sendEmail('reached', { crypto, price });
      }
    }
  }
}
