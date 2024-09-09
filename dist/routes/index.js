// src/routes/index.ts
import express from "express";
import { createPaymentHandler } from "../controllers/paymentController.js";
import { webhookHandler } from "../controllers/webhookController.js";
const router = express.Router();
/**
 * @swagger
 * /:
 *   get:
 *     summary: Check if the API is running
 *     responses:
 *       200:
 *         description: API funcionando
 *       400:
 *         description: Internal Server ERROR
 */
router.get("/", (req, res) => {
    res.status(200).send("API funcionando");
});
/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Create a new payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentData:
 *                 type: object
 *                 properties:
 *                   transaction_amount:
 *                     type: number
 *                     example: 0
 *                   description:
 *                     type: string
 *                     example: descrição do produto
 *                   paymentMethodId:
 *                     type: string
 *                     example: PIX
 *                   email:
 *                     type: string
 *                     example: example@example.com
 *                   identificationType:
 *                     type: string
 *                     example: CPF
 *                   number:
 *                     type: number
 *                     example: 12345678901
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Error creating payment
 */
router.post("/payment", createPaymentHandler);
/**
 * @swagger
 * /notify:
 *   post:
 *     summary: Handle payment status updates from MercadoPago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 example: payment.updated
 *               api_version:
 *                 type: string
 *                 example: v1
 *               data:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 123456789
 *               date_created:
 *                 type: string
 *                 format: date-time
 *                 example: 2021-09-01T00:00:00Z
 *               id:
 *                 type: string
 *                 example: 123456
 *               live_mode:
 *                 type: boolean
 *                 example: false
 *               type:
 *                type: string
 *                example: payment
 *               user_id:
 *                type: string
 *                example: 123456
 *     responses:
 *       200:
 *         description: Data inserted successfully
 *       201:
 *         description: Data received successfully
 *       400:
 *         description: Error inserting data
 *       304:
 *        description: Payment previously approved
 */
router.post("/notify", webhookHandler);
export default router;
