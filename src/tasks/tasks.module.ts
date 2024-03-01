import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CryptoApiService } from 'src/crypto-api/crypto-api.service';
import { MailService } from 'src/mail/mail.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [TasksService, MailService, CryptoApiService],
  imports: [HttpModule],
})
export class TaskModule {}
