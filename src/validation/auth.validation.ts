import { z } from 'zod';

// Signup validation schema
export const signupSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
    email: z.string()
        .email("Invalid email address")
        .min(6, "Email must be at least 6 characters")
        .max(254, "Email must be less than 254 characters")
        .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Invalid email format"
        ),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password must be less than 50 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        )
});

// Signin validation schema
export const signinSchema = z.object({
    email: z.string()
        .email("Invalid email address")
        .min(3, "Email must be at least 3 characters")
        .max(254, "Email must be less than 254 characters")
        .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Invalid email format"
        ),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password must be less than 50 characters")
});

// Forgot password validation schema
export const forgotPasswordSchema = z.object({
    email: z.string()
        .email("Invalid email address")
        .min(3, "Email must be at least 3 characters")
        .max(254, "Email must be less than 254 characters")
        .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Invalid email format"
        )
});

// Reset password validation schema
export const resetPasswordSchema = z.object({
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password must be less than 50 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        ),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
}); 