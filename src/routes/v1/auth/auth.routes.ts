import { Router } from "express";
import * as authController from "../../../controller/auth.controller";
import { authenticate } from "../../../middleware/authorizer.middleware";
import { validateRequest } from "../../../middleware/validateRequest";
import { signupSchema, signinSchema, forgotPasswordSchema, resetPasswordSchema } from "../../../validation/auth.validation";
import { tryCatchHandler } from "../../../middleware/error.middleware";

const router = Router();

// Public routes
router.post("/signup", validateRequest(signupSchema), tryCatchHandler(authController.signup));
// router.post("/signin", validateRequest(signinSchema), tryCatchHandler(authController.signin));
// router.post("/forgot-password", validateRequest(forgotPasswordSchema), tryCatchHandler(authController.forgotPassword));
// router.post("/reset-password", validateRequest(resetPasswordSchema), tryCatchHandler(authController.resetPassword));

// Protected routes
// router.post("/logout", authenticate, tryCatchHandler(authController.logout));
// router.get("/me", authenticate, tryCatchHandler(authController.getCurrentUser));

export default router;
