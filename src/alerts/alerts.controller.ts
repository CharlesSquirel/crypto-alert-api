import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { Alert } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { CreateAlertDto } from './dto';

@Controller('alerts')
export class AlertsController {
  constructor(
    private alertService: AlertsService,
    private mailService: MailService,
  ) {}

  @Post('create')
  async createAlert(@Body() createAlertDto: CreateAlertDto) {
    try {
      const alert = await this.alertService.createAlert(createAlertDto);
      await this.mailService.sendEmail('create');
      return alert;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Alert already exists with the same parameters.',
        );
      }
      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }

  @Get(':email')
  async getAllAlerts(@Param('email') email: string): Promise<Alert[]> {
    try {
      const alerts = await this.alertService.getAlertByEmail(email);
      if (!alerts || alerts.length === 0) {
        throw new NotFoundException(`Alerts not found for email: ${email}`);
      }
      return alerts;
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }

  @Delete(':id')
  async deleteAlert(@Param('id') id: string): Promise<void> {
    try {
      const deletedAlert = await this.alertService.deleteAlert(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new ConflictException('Failed to delete alert.');
      }
    }
  }
}
