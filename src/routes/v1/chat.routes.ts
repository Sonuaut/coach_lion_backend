import { Router } from 'express';
import { authenticate } from '../../middleware/authorizer.middleware';
import { chatWithCoachV2, getUserChatMessages } from '../../controller/chat.controller';

const router = Router();

router.post('/', authenticate, chatWithCoachV2);
router.get('/', authenticate, getUserChatMessages);

export default router; 