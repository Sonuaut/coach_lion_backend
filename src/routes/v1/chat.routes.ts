import { Router } from 'express';
import { authenticate } from '../../middleware/authorizer.middleware';
import { chatWithCoachV2, getUserChatMessages } from '../../controller/chat.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { chatMessageSchema } from '../../validation/chat.validation';

const router = Router();

router.post('/', authenticate, validateRequest(chatMessageSchema), chatWithCoachV2);
router.get('/', authenticate, getUserChatMessages);

export default router; 