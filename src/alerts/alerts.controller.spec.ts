import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AlertsService } from './alerts.service';
import {
  mailServiceMock,
  mockedDb,
  mockedPostAlert,
  prismaServiceMock,
} from './test/mocks';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AlertsController } from './alerts.controller';
import { MailService } from '../mail/mail.service';

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

  describe('/GET', () => {
    // it('should return all alerts', async () => {
    //   const response = await request(app.getHttpServer())
    //     .get('/alerts')
    //     .expect(200);
    //   const expectedData = mockedDb.map((alert) => ({
    //     ...alert,
    //     createdAt: new Date(alert.createdAt).toISOString(),
    //   }));
    //   expect(response.body).toStrictEqual(expectedData);
    // });

    it('should return alerts with proper email', async () => {
      const emailToTest = mockedDb[0].email;
      prismaServiceMock.alert.findMany.mockResolvedValue(
        mockedDb.filter((alert) => alert.email === emailToTest),
      );
      const response = await request(app.getHttpServer())
        .get(`/alerts/${emailToTest}`)
        .expect(200);
      const transformDate = (data) => ({
        ...data,
        createdAt: new Date(data.createdAt).toISOString(),
      });

      const transformedResponse = response.body.map(transformDate);
      const expectedData = mockedDb
        .filter((alert) => alert.email === emailToTest)
        .map(transformDate);
      expect(transformedResponse).toStrictEqual(expectedData);
    });
  });
});
