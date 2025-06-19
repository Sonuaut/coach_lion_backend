import { Router } from 'express';
import { authenticate } from '../../middleware/authorizer.middleware';
import { chatWithCoachV2 } from '../../controller/chat.controller';

const router = Router();

router.post('/', authenticate, chatWithCoachV2);

export default router; 