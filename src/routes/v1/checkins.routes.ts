import { Router } from 'express';
import { checkInToday, getAllCheckins, getTodayCheckin } from '../../controller/checkin.controller';
import { authenticate } from '../../middleware/authorizer.middleware';

const router = Router();

router.post('/', authenticate, checkInToday);
router.get('/', authenticate, getAllCheckins);
router.get('/today', authenticate, getTodayCheckin);

export default router; 