import { PrismaClient } from '../../../generated/prisma';
import { throwDBError, DBErrorResponse } from '../../../utils/error.utils';
import { FocusArea, CoachType, CoachStyle, AgeRange, Gender, PlanType, OnboardingField, OnboardingFieldKey } from '../../../types/onboarding';



export class OnboardingDatabase {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    /**
     * Upsert a single onboarding step for a user.
     * @param userId
     * @param onBoardingStep
     * @param values
     */
    async upsertOnboardingStep(userId: string, onBoardingStep: number, values: Record<string, any>) {
        try {
            // Build data object with all provided values
            const data: any = { userId, onBoardingStep, ...values };

            // Upsert the step
            await this.prisma.userOnboardingStep.upsert({
                where: { userId_onBoardingStep: { userId, onBoardingStep } },
                update: data,
                create: data,
            });

            // Fetch all steps for the user
            const allSteps = await this.prisma.userOnboardingStep.findMany({ where: { userId } });
            // Aggregate all values
            const onboardingFields: OnboardingFieldKey[] = [
                OnboardingField.FOCUS_AREA,
                OnboardingField.COACH_TYPE,
                OnboardingField.COACH_LOOK,
                OnboardingField.COACH_STYLE,
                OnboardingField.AGE_RANGE,
                OnboardingField.GENDER,
                OnboardingField.PLAN_TYPE
            ];
            const allValues: Record<string, any> = {};
            for (const step of allSteps) {
                for (const field of onboardingFields) {
                    if ((step as any)[field] !== undefined && (step as any)[field] !== null && (step as any)[field] !== '') {
                        allValues[field] = (step as any)[field];
                    }
                }
            }
            // Check if all required fields are present and non-empty
            const isCompleted = onboardingFields.every(field => allValues[field] !== undefined && allValues[field] !== null && allValues[field] !== '');

            // Upsert status
            await this.prisma.userOnboardingStatus.upsert({
                where: { userId },
                update: { isOnBoardingCompleted: isCompleted },
                create: { userId, isOnBoardingCompleted: isCompleted },
            });

            return { success: true, isOnBoardingCompleted: isCompleted };
        } catch (error: any) {
            const dbError: DBErrorResponse = {
                code: error.code || 'UNKNOWN_ERROR',
                message: error.message || 'Database operation failed',
                details: error.details || 'Unknown database error',
                hint: error.hint || null
            };
            throwDBError(dbError);
        }
    }

    /**
     * Get all onboarding steps for a user
     */
    async getOnboardingStepsByUserId(userId: string) {
        try {
            // Define expected fields for each step
            const stepFields: Record<number, OnboardingFieldKey[]> = {
                1: [OnboardingField.FOCUS_AREA],
                2: [OnboardingField.COACH_TYPE],
                3: [OnboardingField.COACH_LOOK],
                4: [OnboardingField.COACH_STYLE],
                5: [OnboardingField.GENDER, OnboardingField.AGE_RANGE],
                6: [OnboardingField.PLAN_TYPE],
            };
            // Aggregate all steps for the user into a single object
            const steps = await this.prisma.userOnboardingStep.findMany({
                where: { userId },
                orderBy: { onBoardingStep: 'asc' },
            });
            if (!steps || steps.length === 0) {
                // If no steps, next step is 1
                return {
                    data: {
                        userId,
                        isOnBoardingCompleted: false,
                        onboarding: {},
                        nextOnBoardingStep: 1
                    },
                    error: null
                };
            }
            // Merge all step values into a single object
            const onboarding = steps.reduce((acc, step) => {
                Object.entries(step).forEach(([key, value]) => {
                    if (
                        [
                            OnboardingField.FOCUS_AREA,
                            OnboardingField.COACH_TYPE,
                            OnboardingField.COACH_LOOK,
                            OnboardingField.COACH_STYLE,
                            OnboardingField.AGE_RANGE,
                            OnboardingField.GENDER,
                            OnboardingField.PLAN_TYPE,
                        ].includes(key as OnboardingFieldKey) && value !== null && value !== undefined
                    ) {
                        acc[key] = value;
                    }
                });
                return acc;
            }, {} as Record<string, any>);
            // Fetch onboarding completion status
            const status = await this.prisma.userOnboardingStatus.findUnique({ where: { userId } });
            const isOnBoardingCompleted = status?.isOnBoardingCompleted ?? false;

            // Determine nextOnBoardingStep
            let nextOnBoardingStep: number | null = null;
            for (const [step, fields] of Object.entries(stepFields)) {
                const missing = fields.some((field) => onboarding[field] === undefined);
                if (missing) {
                    nextOnBoardingStep = Number(step);
                    break;
                }
            }
            if (nextOnBoardingStep === null) {
                nextOnBoardingStep = null; // All steps filled
            }

            return {
                data: {
                    userId,
                    isOnBoardingCompleted,
                    onboarding: { ...onboarding },
                    nextOnBoardingStep
                },
                error: null
            };
        } catch (error: any) {
            const dbError: DBErrorResponse = {
                code: error.code || 'UNKNOWN_ERROR',
                message: error.message || 'Database operation failed',
                details: error.details || 'Unknown database error',
                hint: error.hint || null
            };
            throwDBError(dbError);
        }
    }

    /**
     * Get onboarding completion status for a user
     */
    async getOnboardingStatus(userId: string) {
        try {
            const status = await this.prisma.userOnboardingStatus.findUnique({ where: { userId } });
            return { data: status, error: null };
        } catch (error: any) {
            const dbError: DBErrorResponse = {
                code: error.code || 'UNKNOWN_ERROR',
                message: error.message || 'Database operation failed',
                details: error.details || 'Unknown database error',
                hint: error.hint || null
            };
            throwDBError(dbError);
        }
    }
} 