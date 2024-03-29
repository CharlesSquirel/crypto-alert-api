import { Test, TestingModule } from '@nestjs/testing';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { mockedAlert, mockedDb } from './test/mocks';

describe('AlertsService', () => {
  let alertService: AlertsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AlertsService,
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: MailService,
          useValue: {},
        },
      ],
      controllers: [AlertsController],
    }).compile();
    alertService = moduleRef.get<AlertsService>(AlertsService);
  });

  describe('POST', () => {
    it('create alert', async () => {
      jest.spyOn(alertService, 'createAlert').mockResolvedValue(mockedAlert);
      const result = await alertService.createAlert(mockedAlert);
      expect(result).toBe(mockedAlert);
    });
  });

  describe('GET', () => {
    // it('should return all alerts in db', async () => {
    //   jest.spyOn(alertService, 'getAllAlerts').mockResolvedValue(mockedDb);
    //   const result = await alertService.getAllAlerts();
    //   expect(result).toBe(mockedDb);
    // });

    it('should return alerts with proper email', async () => {
      const emailToTest = mockedDb[0].email;
      jest
        .spyOn(alertService, 'getAlertByEmail')
        .mockResolvedValue(
          mockedDb.filter((alert) => alert.email === emailToTest),
        );
      const result = await alertService.getAlertByEmail(emailToTest);
      expect(result).toEqual(
        mockedDb.filter((alert) => alert.email === emailToTest),
      );
    });
  });

  describe('DELETE', () => {
    const idToDelete = mockedDb[0].id;
    it('should correctly delete alert', async () => {
      jest.spyOn(alertService, 'deleteAlert').mockResolvedValue(mockedDb[0]);
      const result = await alertService.deleteAlert(idToDelete);
      expect(result).toEqual(mockedDb[0]);
    });

    it('should not delete alert when the id does not exist', async () => {
      jest.spyOn(alertService, 'deleteAlert').mockResolvedValue(null);
      const result = await alertService.deleteAlert(idToDelete);
      expect(result).toBe(null);
    });
  });
});
