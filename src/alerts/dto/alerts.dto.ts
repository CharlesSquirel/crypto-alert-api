export interface CreateAlertDto {
  email: string;
  crypto: string;
  price: number;
  currency: string;
}

export interface GetAlertDto extends CreateAlertDto {
  id: string;
  createdAt: Date;
}
