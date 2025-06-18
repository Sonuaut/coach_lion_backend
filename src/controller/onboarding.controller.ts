import { Request, Response } from 'express';
import OnboardingService from '../service/onboarding.service';

const _onboardingService = new OnboardingService();

export async function submitOnboarding(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "User not authenticated"
        });
    }

    const { loggedInUser, ...onboardingData } = req.body;
    const result = await _onboardingService.submitOnboarding(userId, onboardingData);
    res.status(200).json({
        success: true,
        message: result.message,
        data: {
            onboarding: result.onboarding,
            isNew: result.isNew
        }
    });
}

export async function getOnboarding(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "User not authenticated"
        });
    }

    const onboarding = await _onboardingService.getOnboarding(userId);
    
    res.status(200).json({
        success: true,
        data: {
            onboarding
        }
    });
}

export async function checkOnboardingStatus(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "User not authenticated"
        });
    }

    const status = await _onboardingService.checkOnboardingStatus(userId);
    
    res.status(200).json({
        success: true,
        data: status
    });
} 