import { Payment, MercadoPagoConfig } from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();
const { MERCADOPAGO_TOKEN } = process.env;

const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_TOKEN });

export const createPayment = (paymentData) => {
  const payment = new Payment(client);
  return payment.create({
    body: paymentData,
    requestOptions: { idempotencyKey: paymentData.idempotencyKey },
  });
};

export const getPayment = (id) => {
  const payment = new Payment(client);
  return payment.get({ id });
};
