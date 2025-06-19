import { OnboardingRequest } from "../types/onboarding";
import { OnboardingDatabase } from "../database/implementations/prisma/onboardingdb";
import { throwBusinessError } from "../utils/error.utils";

export default class OnboardingService {
    private _onboardingdbService = new OnboardingDatabase();

    /**
     * Submit a single onboarding step for a user
     * @param userId (from authentication)
     * @param stepNumber
     * @param values
     */
    async submitOnboardingStep(userId: string, stepNumber: number, values: Record<string, any>) {
        let result;

        // Handle automatic coach selection
        if (stepNumber === 2 && values?.coachType === "automatic") {
            // First submit step 2
            result = await this._onboardingdbService.upsertOnboardingStep(userId, stepNumber, values);
            if (!result) {
                throwBusinessError(true, 'Failed to submit onboarding step');
            }

            // Automatically set default values for steps 3 and 4
            const defaultCoachLook = await this._onboardingdbService.upsertOnboardingStep(userId, 3, { coachLook: "male" });
            if (!defaultCoachLook) {
                throwBusinessError(true, 'Failed to set default coach look');
            }

            const defaultCoachStyle = await this._onboardingdbService.upsertOnboardingStep(userId, 4, { coachStyle: "Motivational" });
            if (!defaultCoachStyle) {
                throwBusinessError(true, 'Failed to set default coach style');
            }

            // Return the final status after all steps are submitted
            return {
                message: 'Onboarding steps submitted successfully',
                isOnBoardingCompleted: defaultCoachStyle?.isOnBoardingCompleted ?? false,
                autoSelectedSteps: {
                    coachLook: "male",
                    coachStyle: "Motivational"
                }
            };
        }

        // For all other steps, proceed normally
        result = await this._onboardingdbService.upsertOnboardingStep(userId, stepNumber, values);
        if (!result) {
            throwBusinessError(true, 'Failed to submit onboarding step');
        }

        return {
            message: 'Onboarding step submitted successfully',
            isOnBoardingCompleted: result?.isOnBoardingCompleted ?? false
        };
    }

    /**
     * Get all onboarding steps for the authenticated user
     * @param userId (from authentication)
     */
    async getOnboarding(userId: string) {
        const result = await this._onboardingdbService.getOnboardingStepsByUserId(userId);
        if (!result || result.error || !result.data) {
            throwBusinessError(true, 'Onboarding data not found');
        }
        return result?.data ?? [];
    }

    /**
     * Get onboarding completion status for a user
     */
    async checkOnboardingStatus(userId: string) {
        const result = await this._onboardingdbService.getOnboardingStatus(userId);
        return {
            hasCompletedOnboarding: result?.data?.isOnBoardingCompleted ?? false
        };
    }
} 