import { Controller, Get } from '@nestjs/common';
import { CryptoApiService } from './crypto-api.service';

@Controller('api')
export class CryptoApiController {
  constructor(private CryptoService: CryptoApiService) {}

  @Get('crypto')
  getCrypto() {
    return this.CryptoService.getCrypto();
  }
}
