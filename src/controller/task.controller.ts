import { Request, Response } from 'express';
import { UserTaskService } from '../service/usertask.service';
import OnboardingService from '../service/onboarding.service';
import moment from 'moment';
import { throwBusinessError } from '../utils/error.utils';

const userTaskService = new UserTaskService();
const _onboardingService = new OnboardingService();

export async function generateTask(req: Request, res: Response) {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }
  const date = moment().format('YYYY-MM-DD');
  const existingTask = await userTaskService.getUSerTaskForDate(userId, date);
      throwBusinessError(!!existingTask, 'A task for today already exists. You cannot create another task for today.');
    const onboarding = await _onboardingService.getOnboarding(userId) as { onboarding: any };
    const onboardingData = onboarding.onboarding;
    throwBusinessError(!onboarding,'Onboarding data incomplete');
    const onboardingPrefs = {
        focusArea: onboardingData.focusArea,
        coachType: onboardingData.coachType,
        coachLook: onboardingData.coachLook,
        coachStyle: onboardingData.coachStyle,
        ageRange: onboardingData.ageRange,
        username:req.user?.name  ||"",
    };
   
    const task = await userTaskService.generateAndStoreTask(userId, onboardingPrefs, date);
    res.status(200).json({ success: true, data: task });
}

export async function getTodaysTask(req: Request, res: Response) {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }
  try {
    const date = moment().format('YYYY-MM-DD');
    const task = await userTaskService.getUSerTaskForDate(userId, date);
    if (!task) {
      return res.status(404).json({ success: false, message: 'No task found for today' });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch today\'s task' });
  }
} 