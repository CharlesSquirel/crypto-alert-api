import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Alert } from '@prisma/client';
import { CreateAlertDto } from './dto';

@Injectable()
export class AlertsService {
  constructor(private prisma: PrismaService) {}

  async getAlertByEmail(email: string): Promise<Alert[]> {
    const result = await this.prisma.alert.findMany({
      where: {
        email,
      },
    });
    return result;
  }
  async createAlert(createAlertDto: CreateAlertDto) {
    try {
      const { email, crypto, price, currency } = createAlertDto;

      const existingAlert = await this.prisma.alert.findFirst({
        where: {
          email,
          crypto,
          price,
          currency,
        },
      });

      if (existingAlert) {
        throw new ConflictException(
          'Alert already exists with the same parameters.',
        );
      }

      return await this.prisma.alert.create({
        data: {
          email,
          crypto,
          price,
          currency,
        },
      });
    } catch (error) {
      throw new ConflictException('Failed to create alert.');
    }
  }
}
