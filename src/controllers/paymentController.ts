import { Request, Response } from "express";
import { createPayment } from "../services/mercadoPagoService.js";
import { gerarIdempotencyKey } from "../utils/idempotencyKey.js";

export const createPaymentHandler = (req: Request, res: Response): void => {
  const { paymentData } = req.body;
  console.log(paymentData);

  createPayment({
    transaction_amount: paymentData.transaction_amount,
    description: paymentData.description,
    payment_method_id: paymentData.paymentMethodId,
    payer: {
      email: paymentData.email,
      identification: {
        type: paymentData.identificationType,
        number: paymentData.number,
      },
    },
    idempotencyKey: gerarIdempotencyKey(40),
  })
    .then((result) => res.status(201).json({ result }))
    .catch((error) => res.status(error.status).json({ error: error.message }));
};
