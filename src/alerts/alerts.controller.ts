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
import { MailService } from '../mail/mail.service';
import { CreateAlertDto } from './dto';

@Controller('alerts')
export class AlertsController {
  constructor(
    private alertService: AlertsService,
    private mailService: MailService,
  ) {}

  @Get()
  async getAllAlerts() {
    return await this.alertService.getAllAlerts();
  }

  @Post()
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
  async getAlertsByEmail(@Param('email') email: string): Promise<Alert[]> {
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
  async deleteAlert(@Param('id') id: string): Promise<{ msg: string }> {
    try {
      const alert = await this.alertService.getAlertById(id);
      if (!alert) {
        throw new NotFoundException(`Alert with ID ${id} not found.`);
      }
      await this.alertService.deleteAlert(id);
      await this.mailService.sendEmail('delete', { id, email: alert.email });
      return {
        msg: 'Alert succesfully deleted',
      };
    } catch (error) {
      throw new ConflictException('Failed to delete alert.');
    }
  }
}
