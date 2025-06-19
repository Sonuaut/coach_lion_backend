
import prisma from '../../../config/prisma';
import { throwDBError, DBErrorResponse, throwBusinessError } from '../../../utils/error.utils';
import { HashedPassword } from '../../../utils/helper';

export class AuthDatabase {
   

    // Health check
    async checkConnection(): Promise<boolean> {
        try {
            await prisma.$connect();
            console.log("✅ Prisma connection is successful!");
            return true;
        } catch (error) {
            console.error('❌ Failed to connect to database:', error);
            return false;
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });
            return { data: user, error: null };
        } catch (error) {
            console.error("Error checking email:", error);
            return { data: null, error };
        }
    }

    async signup(profileData: { name: string; email: string; password: string ,otp:string}) {
            const hashedPassword = await HashedPassword(profileData.password)
            const user = await prisma.user.create({
                data: {
                    name: profileData.name,
                    email: profileData.email,
                    password: hashedPassword,
                    otp: profileData.otp
                }
            });

            // Return user data without password
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
    }

    async verifyOTP(email: string, otp: string) {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                return false;
            }

            if (user.otp !== otp) {
                return false;
            }

            return true;
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

    async getUserProfile(userId: string) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    // updatedAt: true
                }
            });
            return user;
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

    async updateUserFields(email: string, updateData: { otp?: string | null; is_verified?: boolean }) {
        try {
            const updatedUser = await prisma.user.update({
                where: { email },
                data: updateData
            });

            // Return user data without password
            const { password, ...userWithoutPassword } = updatedUser;
            return userWithoutPassword;
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

    async updateUserPassword(email: string, newPassword: string) {
        try {
            const hashedPassword = await HashedPassword(newPassword);
            
            const updatedUser = await prisma.user.update({
                where: { email },
                data: { password: hashedPassword }
            });

            // Return user data without password
            const { password, ...userWithoutPassword } = updatedUser;
            return userWithoutPassword;
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

    async signin(email: string, password: string) {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });
            throwBusinessError(!user,"Email is Invalid");
            throwBusinessError(!user?.is_verified,'Email not verified. Please verify your email first.')
            return user;
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

    // async signOut() {
    //     // In a real implementation, you might want to invalidate JWT tokens
    //     // For now, we'll just return success
    //     return { success: true };
    // }

    // async getSession() {
    //     // This would typically validate a JWT token
    //     // For now, return null
    //     return null;
    // }

    // async getUser() {
    //     // This would typically get user from JWT token
    //     // For now, return null
    //     return null;
    // }

    // // OTP operations - you might want to create a separate OTP model in Prisma
    // async saveOTP(email: string, otp: string) {
    //     try {
    //         const expiresAt = new Date();
    //         expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP expires in 10 minutes

    //         await prisma.oTP.create({
    //             data: {
    //                 email,
    //                 otp,
    //                 expiresAt,
    //                 isUsed: false
    //             }
    //         });

    //         return otp;
    //     } catch (error: any) {
    //         const dbError: DBErrorResponse = {
    //             code: error.code || 'UNKNOWN_ERROR',
    //             message: error.message || 'Database operation failed',
    //             details: error.details || 'Unknown database error',
    //             hint: error.hint || null
    //         };
    //         throwDBError(dbError);
    //     }
    // }

    // async verifyOTP(email: string, otp: string): Promise<boolean> {
    //     try {
    //         const otpRecord = await prisma.oTP.findFirst({
    //             where: {
    //                 email,
    //                 otp,
    //                 isUsed: false,
    //                 expiresAt: {
    //                     gt: new Date()
    //                 }
    //             },
    //             orderBy: {
    //                 createdAt: 'desc'
    //             }
    //         });

    //         if (!otpRecord) {
    //             return false;
    //         }

    //         // Mark OTP as used
    //         await prisma.oTP.update({
    //             where: { id: otpRecord.id },
    //             data: { isUsed: true }
    //         });

    //         return true;
    //     } catch (error: any) {
    //         const dbError: DBErrorResponse = {
    //             code: error.code || 'UNKNOWN_ERROR',
    //             message: error.message || 'Database operation failed',
    //             details: error.details || 'Unknown database error',
    //             hint: error.hint || null
    //         };
    //         throwDBError(dbError);
    //     }
    // }

    // async markUserAsVerified(email: string) {
    //     try {
    //         await prisma.user.update({
    //             where: { email },
    //             data: { 
    //                 // You might want to add an isVerified field to your User model
    //                 // isVerified: true 
    //             }
    //         });
    //     } catch (error: any) {
    //         const dbError: DBErrorResponse = {
    //             code: error.code || 'UNKNOWN_ERROR',
    //             message: error.message || 'Database operation failed',
    //             details: error.details || 'Unknown database error',
    //             hint: error.hint || null
    //         };
    //         throwDBError(dbError);
    //     }
    // }

    // async resetPassword(email: string) {
    //     // This would typically send a password reset email
    //     // For now, return success
    //     return { success: true };
    // }

    // async updatePassword(userId: string, newPassword: string) {
    //     try {
    //         const hashedPassword = await bcrypt.hash(newPassword, 10);
            
    //         await prisma.user.update({
    //             where: { id: userId },
    //             data: { password: hashedPassword }
    //         });

    //         return { success: true };
    //     } catch (error: any) {
    //         const dbError: DBErrorResponse = {
    //             code: error.code || 'UNKNOWN_ERROR',
    //             message: error.message || 'Database operation failed',
    //             details: error.details || 'Unknown database error',
    //             hint: error.hint || null
    //         };
    //         throwDBError(dbError);
    //     }
    // }

    // async disconnect() {
    //     await prisma.$disconnect();
    // }
} 