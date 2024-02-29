import {
  Body,
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { Alert, Prisma } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';

@Controller('alert')
export class AlertsController {
  constructor(
    private alertService: AlertsService,
    private mailService: MailService,
  ) {}

  @Post('create')
  async createAlert(@Body() createAlertDto: Prisma.AlertCreateInput) {
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
      throw new InternalServerErrorException('Failed to send email.');
    }
  }

  @Get()
  async getAllAlerts(): Promise<Alert[]> {
    return this.alertService.getAllAlerts();
  }
}
