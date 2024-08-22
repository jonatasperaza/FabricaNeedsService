import { Payment, MercadoPagoConfig } from 'mercadopago';
import  PaymentCreateResponse from 'mercadopago';
import PaymentGetResponse from "mercadopago";
import dotenv from 'dotenv';

dotenv.config();
const { MERCADOPAGO_TOKEN } = process.env;

const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_TOKEN as string });

export const createPayment = (paymentData: any): Promise<PaymentCreateResponse> => {
  const payment = new Payment(client);
  return payment.create({
    body: paymentData,
    requestOptions: { idempotencyKey: paymentData.idempotencyKey },
  });
};

export const getPayment = (id: string): Promise<PaymentGetResponse> => {
  const payment = new Payment(client);
  return payment.get({ id });
};      
