import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class CryptoApiService {
  constructor(private http: HttpService) {}

  async getCrypto() {
    const headers = {
      'X-CMC_PRO_API_KEY': process.env.CRYPTO_KEY,
    };
    const request = this.http
      .get(
        `https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
        {
          headers,
        },
      )
      .pipe(
        map((response) => response.data),
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
    const data = await lastValueFrom(request);
    return data;
  }
}
