import { MercadoPagoConfig, Payment } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();
const { MERCADOPAGO_TOKEN } = process.env;

// Criando uma instância do MercadoPagoConfig com o token de acesso
const client = new MercadoPagoConfig({
  accessToken: MERCADOPAGO_TOKEN as string,
});

// Create a payment method
export const createPayment = (paymentData: any): Promise<any> => {
  try {
    const payment = new Payment(client);
    return payment.create({
      body: paymentData,
      requestOptions: { idempotencyKey: paymentData.idempotencyKey },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Get payment method
export const getPayment = (id: string): Promise<any> => {
  try {
    const payment = new Payment(client);
    return payment.get({ id });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
