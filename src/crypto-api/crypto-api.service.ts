import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
        catchError((error) => {
          if (error.response && error.response.status) {
            const statusCode = error.response.status;
            if (statusCode === 400) {
              throw new BadRequestException('Bad request to API');
            } else if (statusCode === 403) {
              throw new ForbiddenException('Unauthorized access to API');
            } else {
              throw new InternalServerErrorException(
                'Unexpected error occurred',
              );
            }
          } else {
            throw new InternalServerErrorException('Unexpected error occurred');
          }
        }),
      );
    const data = await lastValueFrom(request);
    return data;
  }
}
