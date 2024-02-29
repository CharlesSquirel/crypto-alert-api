import {
  Body,
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
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

  @Get()
  async getAllAlerts(): Promise<Alert[]> {
    return this.alertService.getAllAlerts();
  }
}
