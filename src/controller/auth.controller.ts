import { Request, Response } from 'express';
import AuthService from '../service/auth.service';
import { setAuthCookies, clearAuthCookies } from '../utils/helper';
const _authService = new AuthService();

export async function signup(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const result = await _authService.signup({ name, email, password });
    res.status(201).json({
        success: true,
        data: result
    });
}


export async function verifyOTP(req: Request, res: Response) {
    const { email, otp } = req.body;
     await _authService.verifyOTP(email, otp);
    res.status(200).json({
        success: true,
        message:"Otp Verfified Successfully"
    });
}

export async function resendOTP(req: Request, res: Response) {
    const { email } = req.body;
    const result = await _authService.resendOTP(email);
    res.status(200).json({
        success: true,
        message:"Otp Sended to your Email ,please check"
    });
}

export async function signin(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await _authService.signin(email, password);
    
    // Set HTTP-only cookies
    setAuthCookies(res, result.refreshToken);
    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            user: result.user,
            onboarding: result.onboarding,
            accessToken: result.accessToken
        }
    });
}

export async function refreshToken(req: Request, res: Response) {
    // Get refresh token from body first, then from cookies
    let refreshToken = req.body.refreshToken;
    
    if (!refreshToken) {
        refreshToken = req.cookies?.refreshToken;
    }
    
    if (!refreshToken) {
        return res.status(400).json({
            success: false,
            message: "Refresh token is required"
        });
    }
    
    const result = await _authService.refreshToken(refreshToken);
    setAuthCookies(res, result.refreshToken);
    res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        data: {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        }
    });
}

export async function logout(req: Request, res: Response) {
    await _authService.logout();
    
    // Clear HTTP-only cookies
    clearAuthCookies(res);
    
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
}

export async function getCurrentUser(req: Request, res: Response) {
    // User info is already attached by the authenticate middleware
    res.status(200).json({
        success: true,
        data: {
            user: req.user
        }
    });
}

export async function forgotPassword(req: Request, res: Response) {
    const { email, otp } = req.body;
    const result = await _authService.forgotPassword(email, otp);
    
    // Set HTTP-only cookies with refresh token
    setAuthCookies(res, result.refreshToken);
    res.status(200).json({
        success: true,
        message: "OTP verified successfully. You can now reset your password.",
        data: {
            user: result.user,
            accessToken: result.accessToken
        }
    });
}

export async function resetPassword(req: Request, res: Response) {
    // Get refresh token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Access token is required in Authorization header"
        });
    }
    
    const refreshToken = authHeader.substring(7);
    const { newPassword } = req.body;
    
    const result = await _authService.resetPassword(refreshToken, newPassword);
    
    res.status(200).json({
        success: true,
        message: "Password reset successfully",
        data: result
    });
}


// export async function forgotPassword(req: Request, res: Response) {
//     const { email } = req.body;
//     const result = await _authService.forgotPassword(email);
//     res.status(200).json({
//         success: true,
//         message: 'Password reset email sent successfully',
//         data: result
//     });
// }


// export async function resetPassword(req: Request, res: Response) {
//     const { password, email, otp } = req.body;
//     const result = await _authService.resetPassword(email, otp, password);
//     res.status(200).json({
//         success: true,
//         message: 'Password reset successfully',
//         data: result
//     });
// }


// export async function getCurrentUser(req: Request, res: Response) {
//     const user = await _authService.getCurrentUser();
//     res.status(200).json({
//         success: true,
//         data: user
//     });
// }
