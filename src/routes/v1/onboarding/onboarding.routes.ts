import { Router } from 'express';
import * as onboardingController from '../../../controller/onboarding.controller';
import { validateRequest } from '../../../middleware/validateRequest';
import { onboardingSchema } from '../../../validation/onboarding.validation';
import { tryCatchHandler } from '../../../middleware/error.middleware';
import { authenticate } from '../../../middleware/authorizer.middleware';

const router = Router();

// All onboarding routes
router.use(authenticate);

// Submit onboarding data
router.post('/submit',authenticate, validateRequest(onboardingSchema), tryCatchHandler(onboardingController.submitOnboarding));

// Get user's onboarding data (for authenticated user)
router.get('/',authenticate, tryCatchHandler(onboardingController.getOnboarding));

export default router; 