import { Controller, Get } from '@nestjs/common';
import { CryptoApiService } from './crypto-api.service';

@Controller('crypto')
export class CryptoApiController {
  constructor(private CryptoService: CryptoApiService) {}

  @Get()
  getCrypto() {
    return this.CryptoService.getCrypto();
  }
}
