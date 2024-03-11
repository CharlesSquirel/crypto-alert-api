import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class CryptoApiService {
  private readonly logger = new Logger(CryptoApiService.name);
  constructor(private http: HttpService) {}

  async getCrypto() {
    const headers = {
      'X-CMC_PRO_API_KEY': process.env.CRYPTO_KEY,
    };

    if (!process.env.CRYPTO_KEY) {
      throw new Error('CRYPTO_KEY environment variable is not set');
    }

    const request = this.http
      .get(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
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
