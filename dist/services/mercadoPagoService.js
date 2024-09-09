import { MercadoPagoConfig, Payment } from "mercadopago";
import dotenv from "dotenv";
import { gerarIdempotencyKey } from "../utils/idempotencyKey.js";
dotenv.config();
const { MERCADOPAGO_TOKEN } = process.env;
// Criando uma instância do MercadoPagoConfig com o token de acesso
const client = new MercadoPagoConfig({
    accessToken: MERCADOPAGO_TOKEN,
});
// Create a payment method
export const createPayment = (paymentData) => {
    try {
        const payment = new Payment(client);
        return payment.create({
            body: paymentData,
            requestOptions: { idempotencyKey: gerarIdempotencyKey(40) },
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
// Get payment method
export const getPayment = (id) => {
    try {
        const payment = new Payment(client);
        return payment.get({ id });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
