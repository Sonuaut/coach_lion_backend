import { PrismaClient } from '../../../generated/prisma';
import { throwDBError, DBErrorResponse } from '../../../utils/error.utils';
import { IUserOnboarding } from '../../../types/onboarding';

export class OnboardingDatabase {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createOnboarding(userId: string, onboardingData: Partial<Omit<IUserOnboarding, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>) {
        try {
            const onboarding = await this.prisma.userOnboarding.create({
                data: {
                    userId,
                    ...onboardingData
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            is_verified: true
                        }
                    }
                }
            });

            return { data: onboarding, error: null };
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

    async getOnboardingByUserId(userId: string) {
        try {
            const onboarding = await this.prisma.userOnboarding.findUnique({
                where: { userId },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            is_verified: true
                        }
                    }
                }
            });

            return { data: onboarding, error: null };
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

    async updateOnboarding(userId: string, updateData: Partial<Omit<IUserOnboarding, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>) {
        try {
            const onboarding = await this.prisma.userOnboarding.update({
                where: { userId },
                data: updateData,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            is_verified: true
                        }
                    }
                }
            });
            return { data: onboarding, error: null };
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

    async checkOnboardingExists(userId: string): Promise<boolean> {
        try {
            const onboarding = await this.prisma.userOnboarding.findUnique({
                where: { userId },
                select: { id: true }
            });

            return !!onboarding;
        } catch (error: any) {
            const dbError: DBErrorResponse = {
                code: error.code || 'UNKNOWN_ERROR',
                message: error.message || 'Database operation failed',
                details: error.details || 'Unknown database error',
                hint: error.hint || null
            };
            throwDBError(dbError);
            return false;
        }
    }
} 