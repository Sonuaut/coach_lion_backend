import { IUser } from "../types/user";
import { AuthDatabase } from "../database/implementations/supabase/authdb";
import { throwBusinessError } from "../utils/error.utils";
import { sendEmail } from "../utils/email.utils";


export default class AuthService {
    private _authdbService = new AuthDatabase();

    async signup(userData: Partial<IUser>) {
        // const { name, password, email } = userData;
        
        // // Check if user exists
        // const { data: existingUser, error } = await this._authdbService.getUserByEmail(email as string);
        // throwBusinessError(existingUser, 'Email already registered. Please use a different email or try signing in.');
        
        // // Create user profile
        // const data = await this._authdbService.signup({
        //     name: name as string,
        //     email: email as string
        // });

        // Generate and send OTP
        // const otp = await this._authdbService.saveOTP(email as string);
        await sendEmail("vaibhavtezan@gmail.com","testing","hellow orlds");

        return {
            user: {
                id: "jcdc",
                name: "new name",
                email: "new email"
            },
            message: 'Please check your email for verification code'
        };
    }

    // async verifyOTP(email: string, otp: string) {
    //     const isValid = await this._authdbService.verifyOTP(email, otp);
    //     throwBusinessError(!isValid, "Invalid or expired OTP");
        
    //     await this._authdbService.markUserAsVerified(email);
    //     return { message: "Email verified successfully" };
    // }

    // async resendOTP(email: string) {
    //     const otp = await this._authdbService.saveOTP(email);
    //     await this._authdbService.sendVerificationEmail(email, otp);
    //     return { message: "OTP sent successfully" };
    // }

    // async signin(email: string, password: string) {
    //     const authData = await this._authdbService.signIn(email, password);
    //     throwBusinessError(!authData.user?.id, "Failed to login");
        
    //     const profile = await this._authdbService.getUserProfile(authData.user.id);
        
    //     return {
    //         user: {
    //             id: authData.user.id,
    //             name: profile?.name,
    //             email: authData.user.email
    //         },
    //         session: authData.session
    //     };
    // }

    // async forgotPassword(email: string) {
    //     if (!email) {
    //         throwBusinessError(true, "Email is required");
    //     }
    //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //         throwBusinessError(true, "Invalid email format");
    //     }

    //     const otp = await this._authdbService.saveOTP(email);
    //     await this._authdbService.sendPasswordResetEmail(email, otp);

    //     return { message: "Password reset code sent to your email" };
    // }

    // async verifyResetOTP(email: string, otp: string) {
    //     const isValid = await this._authdbService.verifyOTP(email, otp);
    //     throwBusinessError(!isValid, "Invalid or expired OTP");
    //     return { message: "OTP verified successfully" };
    // }

    // async resetPassword(email: string, otp: string, newPassword: string) {
    //     const isValid = await this._authdbService.verifyOTP(email, otp);
    //     throwBusinessError(!isValid, "Invalid or expired OTP");

    //     const result = await this._authdbService.updatePassword(newPassword);
    //     throwBusinessError(!result, "Failed to reset password");
    //     return { message: "Password reset successfully" };
    // }

    // async logout() {
    //     await this._authdbService.signOut();
    //     return { message: "Successfully logged out" };
    // }
}
