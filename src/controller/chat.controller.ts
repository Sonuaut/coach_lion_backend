import { Request, Response } from 'express';
import moment from 'moment';
import { ChatMessageService } from '../service/chatmessage.service';
import OnboardingService from '../service/onboarding.service';
import { throwBusinessError } from '../utils/error.utils';

const chatMessageService = new ChatMessageService();
const _onboardingService = new OnboardingService();

export async function chatWithCoachV2(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { message } = req.body; 
        const date = moment().format('YYYY-MM-DD');
        const onboarding = await _onboardingService.getOnboarding(userId as string) as { onboarding: any };
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
        const coachReply = await chatMessageService.handleUserMessage(userId as string, message, onboardingPrefs,date);
        res.status(200).json({ success: true, data: coachReply });
}

export async function getUserChatMessages(req: Request, res: Response) {
    const userId = req.user?.userId;
    const messages = await chatMessageService.getAllChatMessagesForUser(userId as string);
    res.status(200).json({ success: true, data: messages });

} 