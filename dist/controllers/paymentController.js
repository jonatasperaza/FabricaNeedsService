import { createPayment } from "../services/mercadoPagoService.js";
export const createPaymentHandler = (req, res) => {
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
    })
        .then((result) => res.status(201).json({ result }))
        .catch((error) => res.status(error.status).json({ error: error.message }));
};
