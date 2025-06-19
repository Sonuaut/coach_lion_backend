import { Router } from "express";
import * as authController from "../../../controller/auth.controller";
import { validateRequest } from "../../../middleware/validateRequest";
import { signupSchema, signinSchema, forgotPasswordSchema, resetPasswordSchema, verifyOTPSchema, resendOTPSchema, refreshTokenSchema } from "../../../validation/auth.validation";
import { tryCatchHandler } from "../../../middleware/error.middleware";

const router = Router();

// Public routes
router.post("/signup", validateRequest(signupSchema), tryCatchHandler(authController.signup));
router.post("/verify-otp", validateRequest(verifyOTPSchema), tryCatchHandler(authController.verifyOTP));
router.post("/request-otp", validateRequest(resendOTPSchema), tryCatchHandler(authController.resendOTP));
router.post("/signin", validateRequest(signinSchema), tryCatchHandler(authController.signin));
router.post("/refresh", validateRequest(refreshTokenSchema), tryCatchHandler(authController.refreshToken));
router.post("/logout", tryCatchHandler(authController.logout));
router.post("/forgot-password", validateRequest(forgotPasswordSchema), tryCatchHandler(authController.forgotPassword));
router.post("/reset-password", validateRequest(resetPasswordSchema), tryCatchHandler(authController.resetPassword));

export default router;
