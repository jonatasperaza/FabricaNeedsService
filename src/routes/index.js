import { Router } from 'express';
import { createPaymentHandler } from '../controllers/paymentController.js';
import { webhookHandler } from '../controllers/webhookController.js';
import { pingStatus } from '../utils/pingStatus.js';

const router = Router();

router.get('/', async(req, res) => {
  res.status(200).json({ message: 'API rodando', ping: await pingStatus() });
});

router.post('/notify', webhookHandler);
router.post('/payment', createPaymentHandler);

export default router;
