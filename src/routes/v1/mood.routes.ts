import { Router } from 'express';
import { setMood, getMood } from '../../controller/mood.controller';
import { authenticate } from '../../middleware/authorizer.middleware';
import { moodSchema } from '../../validation/mood.validation';
import { validateRequest } from '../../middleware/validateRequest';

const router = Router();

router.post('/', authenticate, validateRequest(moodSchema), setMood);
router.get('/', authenticate, getMood);

export default router; 