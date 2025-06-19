import { Router } from 'express';
import { authenticate } from '../../middleware/authorizer.middleware';
import { generateTask, getTodaysTask } from '../../controller/task.controller';
import { tryCatchHandler } from '../../middleware/error.middleware';

const router = Router();

router.post('/generate', authenticate, tryCatchHandler(generateTask));
router.get('/today', authenticate, tryCatchHandler(getTodaysTask));

export default router; 