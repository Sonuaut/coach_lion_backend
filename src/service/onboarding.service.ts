import { IUserOnboarding, OnboardingRequest } from "../types/onboarding";
import { OnboardingDatabase } from "../database/implementations/prisma/onboardingdb";
import { throwBusinessError } from "../utils/error.utils";

export default class OnboardingService {
    private _onboardingdbService = new OnboardingDatabase();

    async submitOnboarding(userId: string, onboardingData: OnboardingRequest) {
        console.log("onaording data :", onboardingData);
        const hasOnboarding = await this._onboardingdbService.checkOnboardingExists(userId);
        if (hasOnboarding) {
            // Only update provided fields
            const result = await this._onboardingdbService.updateOnboarding(userId, onboardingData);
            return {
                onboarding: result?.data,
                message: 'Onboarding preferences updated successfully',
                isNew: false
            };
        } else {
            // Create new onboarding with only provided fields
            const { /* userId: omit, */ ...rest } = onboardingData;
            const result = await this._onboardingdbService.createOnboarding(userId, rest);
            return {
                onboarding: result?.data,
                message: 'Onboarding completed successfully',
                isNew: true
            };
        }
    }

    async getOnboarding(userId: string) {
        const result = await this._onboardingdbService.getOnboardingByUserId(userId);
        
        if (!result || result.error || !result.data) {
            throwBusinessError(true, 'Onboarding data not found');
        }

        return result?.data;
    }

    async checkOnboardingStatus(userId: string) {
        const hasOnboarding = await this._onboardingdbService.checkOnboardingExists(userId);
        return {
            hasCompletedOnboarding: hasOnboarding
        };
    }
} 