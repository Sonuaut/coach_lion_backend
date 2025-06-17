import { Request, Response } from 'express';
import AuthService from '../service/auth.service';
const _authService = new AuthService();


export async function signup(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const result = await _authService.signup({ name, email, password });
    res.status(201).json({
        success: true,
        data: result
    });
}


// export async function signin(req: Request, res: Response) {
//     const { email, password } = req.body;
//     const result = await _authService.signin(email, password);
//     res.status(200).json({
//         success: true,
//         data: result
//     });
// }


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


// export async function logout(req: Request, res: Response) {
//     await _authService.logout();
//     res.status(200).json({
//         success: true,
//         message: 'Logged out successfully'
//     });
// }


// export async function getCurrentUser(req: Request, res: Response) {
//     const user = await _authService.getCurrentUser();
//     res.status(200).json({
//         success: true,
//         data: user
//     });
// }
