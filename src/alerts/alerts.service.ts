import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Alert, Prisma } from '@prisma/client';

@Injectable()
export class AlertsService {
  constructor(private prisma: PrismaService) {}
  async getAllAlerts(): Promise<Alert[]> {
    const result = await this.prisma.alert.findMany();
    return result;
  }
  async createAlert(createAlertDto: Prisma.AlertCreateInput) {
    try {
      const { email, crypto, price, currency } = createAlertDto;
      await console.log('body:', email);

      const existingAlert = await this.prisma.alert.findFirst({
        where: {
          email,
          crypto,
          price,
          currency,
        },
      });

      if (existingAlert) {
        console.log('istnieje rekord', existingAlert);
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
      console.log('service szwankuje', error);
      throw new ConflictException('Failed to create alert.');
    }
  }
}
