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
    // Expecting { onBoardingStep, values } in body
    const { onBoardingStep, values } = req.body;
    if (!onBoardingStep || !values || typeof values !== 'object') {
        return res.status(400).json({
            success: false,
            message: "Missing onBoardingStep or values in request body"
        });
    }
    try {
        const result = await _onboardingService.submitOnboardingStep(userId, onBoardingStep, values);
        res.status(200).json({
            success: true,
            message: result.message,
            data: {
                isOnBoardingCompleted: result.isOnBoardingCompleted
            }
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to submit onboarding step'
        });
    }
}

export async function getOnboarding(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "User not authenticated"
        });
    }

    try {
        const onboarding = await _onboardingService.getOnboarding(userId);
        res.status(200).json({
            success: true,
            data: onboarding
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch onboarding data'
        });
    }
}

export async function checkOnboardingStatus(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "User not authenticated"
        });
    }

    try {
        const status = await _onboardingService.checkOnboardingStatus(userId);
        res.status(200).json({
            success: true,
            data: status
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to check onboarding status'
        });
    }
} 