import { CreateAlertDto, GetAlertDto } from './dto';

export const mockedAlert = {
  id: '1',
  createdAt: new Date('2024-03-12T15:08:07.990Z'),
  email: 'test@test.pl',
  crypto: 'BTH',
  price: 50,
  currency: 'USD',
};

export const mockedDb = [
  {
    id: '1',
    createdAt: new Date(),
    email: 'test1@test.pl',
    crypto: 'BTH',
    price: 50234,
    currency: 'USD',
  },
  {
    id: '2',
    createdAt: new Date(),
    email: 'test2@test.pl',
    crypto: 'BTH',
    price: 5023,
    currency: 'USD',
  },
  {
    id: '3',
    createdAt: new Date(),
    email: 'test3@test.pl',
    crypto: 'BTH',
    price: 5567,
    currency: 'USD',
  },
];
