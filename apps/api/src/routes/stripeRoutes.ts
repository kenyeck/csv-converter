import express, { Router } from 'express';
import { getPlans, createCheckoutSession, createPortalSession, handleStripeWebhook } from '../controllers/stripeController';
import { authMiddleware } from '../middleware/auth';

const router: Router = express.Router();

router.get('/plans', express.json(), getPlans);
router.post('/create-checkout-session', authMiddleware, express.json(), createCheckoutSession);
router.post('/create-portal-session', authMiddleware, express.json(), createPortalSession);
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

export default router;
