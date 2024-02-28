import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto';
import { Alert } from '@prisma/client';

@Controller('alert')
export class AlertsController {
  constructor(private alertService: AlertsService) {}
  @Post('create')
  async createAlert(@Body() createAlertDto: CreateAlertDto) {
    try {
      const alert = await this.alertService.createAlert(createAlertDto);
      return alert;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get()
  async getAllAlerts(): Promise<Alert[]> {
    return this.alertService.getAllAlerts();
  }
}
