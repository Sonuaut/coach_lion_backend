import { IUser } from "../types/user";
import { AuthDatabase } from "../database/implementations/prisma/authdb";
import { throwBusinessError } from "../utils/error.utils";
import { sendOTPEmail } from "../utils/email.utils";
import { generateOTP, ComparePassword, generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyAccessToken } from "../utils/helper";
import OnboardingService from "./onboarding.service";


export default class AuthService {
    private _authdbService = new AuthDatabase();
    private _onboardingService = new OnboardingService();

    async signup(userData: Partial<IUser>) {
        const { name, password, email } = userData;
        
        // Check if user exists
        const { data: existingUser, error } = await this._authdbService.getUserByEmail(email as string);
        throwBusinessError(!!existingUser, 'Email already registered. Please use a different email or try signing up.');
        const otp = generateOTP();
        // Create user profile
        const data = await this._authdbService.signup({
            name: name as string,
            email: email as string,
            password: password as string,
            otp: otp
        });

        //send OTP
        await sendOTPEmail(email as string, otp, name as string);
        return {
            user: data,
            message: 'Please check your email for verification code'
        };
    }

    async verifyOTP(email: string, otp: string) {
        const { data: existingUser, error } = await this._authdbService.getUserByEmail(email as string);
        throwBusinessError(!existingUser, "Email doesn't exist");

        const isValid = await this._authdbService.verifyOTP(email, otp);
        throwBusinessError(!isValid, "InValid Otp");
        // Update user fields: mark as verified and clear OTP
        await this._authdbService.updateUserFields(email, {
            is_verified: true,
            otp: null
        });
    }

    async resendOTP(email: string) {
        const { data: existingUser, error } = await this._authdbService.getUserByEmail(email as string);
        throwBusinessError(!existingUser, "Email doesn't exist");

        const newOTP = generateOTP();
        
        // Update user with new OTP
        await this._authdbService.updateUserFields(email, {
            otp: newOTP
        });
        
        // Send new OTP email
        await sendOTPEmail(email, newOTP, existingUser!.name);
    }

    async signin(email: string, password: string) {
        
        const { data: existingUser, error } = await this._authdbService.getUserByEmail(email as string);
        throwBusinessError(!existingUser, 'Email does not exists . Please use a valid email .');

        // Get user with hashed password
        const user = await this._authdbService.signin(email, password);
        throwBusinessError(!user, "Invalid email or password");
        
        // Verify password
        const isPasswordValid = await ComparePassword(password, user!.password);
        throwBusinessError(!isPasswordValid, "Invalid email or password");

        // Get onboarding data
        const onboardingData = await this._onboardingService.getOnboarding(user!.id);
        const onboardingStatus = await this._onboardingService.checkOnboardingStatus(user!.id);
        console.log("on boardData",onboardingData,onboardingStatus)

        // Generate tokens
        const accessToken = generateAccessToken({
            userId: user!.id,
            email: user!.email,
            name: user!.name
        });

        const refreshToken = generateRefreshToken({
            userId: user!.id,
            email: user!.email
        });

        // Return user data without password and tokens
        const { password: _, ...userWithoutPassword } = user!;
        return {
            user: userWithoutPassword,
            onboarding: {
               ...onboardingData
            },
            accessToken,
            refreshToken
        };
    }

    async refreshToken(refreshToken: string) {
        if (!refreshToken) {
            throwBusinessError(true, "Refresh token is required");
        }
        
        // Verify refresh token
        const decoded = verifyRefreshToken(refreshToken);
        if (!decoded) {
            throwBusinessError(true, "Invalid refresh token");
        }

        // Get user to ensure they still exist
        const { data: user, error } = await this._authdbService.getUserByEmail(decoded!.email);
        if (!user) {
            throwBusinessError(true, "User not found");
        }

        // Generate new access token
        const newAccessToken = generateAccessToken({
            userId: user!.id,
            email: user!.email,
            name: user!.name
        });

        // Generate new refresh token (optional - for better security)
        const newRefreshToken = generateRefreshToken({
            userId: user!.id,
            email: user!.email
        });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }

    

    async logout() {
        // In a more advanced implementation, you might want to:
        // 1. Add the refresh token to a blacklist in Redis
        // 2. Track logout events
        // 3. Invalidate all user sessions
        
        return { 
            message: "Logged out successfully" 
        };
    }

    async forgotPassword(email: string, otp: string) {
        // Check if user exists
        const { data: existingUser, error } = await this._authdbService.getUserByEmail(email);
        throwBusinessError(!existingUser, "Email doesn't exist");

        // Check if user is verified
        throwBusinessError(!existingUser!.is_verified, "Email not verified. Please verify your email first.");

        // Verify OTP
        const isValid = await this._authdbService.verifyOTP(email, otp);
        throwBusinessError(!isValid, "Invalid OTP");

        // Generate tokens for password reset
        const accessToken = generateAccessToken({
            userId: existingUser!.id,
            email: existingUser!.email,
            name: existingUser!.name
        });

        const refreshToken = generateRefreshToken({
            userId: existingUser!.id,
            email: existingUser!.email
        });

        return {
            message: "OTP verified successfully. You can now reset your password.",
            accessToken,
            refreshToken,
            user: {
                id: existingUser!.id,
                name: existingUser!.name,
                email: existingUser!.email,
                is_verified: existingUser!.is_verified
            }
        };
    }

    async resetPassword(refreshToken: string, newPassword: string) {
        // Verify refresh token
        const decoded = verifyAccessToken(refreshToken);
        if (!decoded) {
            throwBusinessError(true, "Invalid Access token");
        }

        // Get user to ensure they still exist
        const { data: user, error } = await this._authdbService.getUserByEmail(decoded!.email);
        if (!user) {
            throwBusinessError(true, "User not found");
        }

        // Update user password
        const updatedUser = await this._authdbService.updateUserPassword(decoded!.email, newPassword);
        
        return {
            message: "Password reset successfully",
            user: updatedUser
        };
    }
}
