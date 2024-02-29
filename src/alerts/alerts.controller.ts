import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { Alert } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { CreateAlertDto } from './dto';

@Controller('alert')
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
        throw new InternalServerErrorException('Failed to create alert.');
      }
      throw new InternalServerErrorException('Failed to send email.');
    }
  }

  @Get()
  async getAllAlerts(): Promise<Alert[]> {
    return this.alertService.getAllAlerts();
  }
}
