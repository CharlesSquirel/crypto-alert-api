import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlertDto } from './dto';
import { Alert } from '@prisma/client';

@Injectable()
export class AlertsService {
  constructor(private prisma: PrismaService) {}
  async getAllAlerts(): Promise<Alert[]> {
    const result = await this.prisma.alert.findMany();
    console.log(result);
    return result;
  }
  async createAlert(createAlertDto: CreateAlertDto) {
    try {
      const { email, crypto, price, currency } = createAlertDto;

      const existingAlert = this.prisma.alert.findFirst({
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
          id: '',
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
