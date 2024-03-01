import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Alert } from '@prisma/client';
import { CreateAlertDto } from './dto';

@Injectable()
export class AlertsService {
  constructor(private prisma: PrismaService) {}

  async getAlertByEmail(email: string): Promise<Alert[]> {
    try {
      const result = await this.prisma.alert.findMany({
        where: {
          email,
        },
      });
      if (!result || result.length === 0) {
        throw new NotFoundException(`Alerts not found for email: ${email}`);
      }
      return result;
    } catch (error) {
      throw new ConflictException('Failed to get alerts.');
    }
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

  async deleteAlert(id: string) {
    try {
      const deletedAlert = await this.prisma.alert.delete({
        where: {
          id,
        },
      });
      return deletedAlert;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new ConflictException('Failed to delete alert.');
      }
    }
  }
}
