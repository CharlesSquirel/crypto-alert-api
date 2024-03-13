import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AlertsService } from '../alerts.service';
import { mailServiceMock, mockedPostAlert, prismaServiceMock } from './mocks';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AlertsController } from '../alerts.controller';
import { MailService } from '../../mail/mail.service';

describe('AlertsController', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AlertsService,
        PrismaService,
        {
          provide: MailService,
          useValue: mailServiceMock,
        },
      ],
      controllers: [AlertsController],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaServiceMock)
      .compile();
    prisma = moduleRef.get<PrismaService>(PrismaService);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /alerts', () => {
    it('should create a new alert', async () => {
      const response = await request(app.getHttpServer())
        .post('/alerts')
        .send(mockedPostAlert)
        .expect(201);
      expect(response.body).toEqual(mockedPostAlert);
    });

    it('should not create when alert with the same alert already exist', async () => {
      prismaServiceMock.alert.findFirst.mockResolvedValue(true);
      const response = await request(app.getHttpServer())
        .post('/alerts')
        .send(mockedPostAlert);
      expect(response.status).toBe(409);
    });
  });
});
