import { Router } from 'express';
import * as onboardingController from '../../../controller/onboarding.controller';
import { validateRequest } from '../../../middleware/validateRequest';
import { onboardingSchema } from '../../../validation/onboarding.validation';
import { tryCatchHandler } from '../../../middleware/error.middleware';
import { authenticate } from '../../../middleware/authorizer.middleware';

const router = Router();

// All onboarding routes require authentication
router.use(authenticate);

// Submit onboarding data
router.post('/submit', validateRequest(onboardingSchema), tryCatchHandler(onboardingController.submitOnboarding));

// Get user's onboarding data
router.get('/', tryCatchHandler(onboardingController.getOnboarding));

// Check if user has completed onboarding
router.get('/status', tryCatchHandler(onboardingController.checkOnboardingStatus));

export default router; 