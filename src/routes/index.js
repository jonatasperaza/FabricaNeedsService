import { Router } from 'express';
import { createPaymentHandler } from '../controllers/paymentController.js';
import { webhookHandler } from '../controllers/webhookController.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('API funcionando');
});

router.post('/notify', webhookHandler);
router.post('/payment', createPaymentHandler);

export default router;
