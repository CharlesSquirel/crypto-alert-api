import { Test, TestingModule } from '@nestjs/testing';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { mockedAlert } from './mocks';

describe('Testing crud operations', () => {
  let alertService: AlertsService;
  let alertController: AlertsController;

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
    alertController = moduleRef.get<AlertsController>(AlertsController);
  });

  it('alert service should be defined', () => {
    expect(alertService).toBeDefined();
  });

  it('alert controller should be defined', () => {
    expect(alertController).toBeDefined();
  });
  describe('POST', () => {
    it('create alert', async () => {
      jest.spyOn(alertService, 'createAlert').mockResolvedValue(mockedAlert);
      const result = await alertService.createAlert(mockedAlert);
      expect(result).toBe(mockedAlert);
    });
  });
});
