import { Router } from 'express';
import { submitFeedback, getAllFeedbacks } from '../../../controller/feedback.controller';
import { authenticate } from '../../../middleware/authorizer.middleware';

const router = Router();

router.post('/', authenticate, submitFeedback);
router.get('/', authenticate, getAllFeedbacks);

export default router; 