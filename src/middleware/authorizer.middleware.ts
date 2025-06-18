import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/helper";
import { throwBusinessError } from "../utils/error.utils";

// Extend Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                email: string;
                name: string;
            } | null;
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get token from cookie first, then from Authorization header
        let token = req.cookies?.accessToken;
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                const string =authHeader.split(" ");
                token=string[1];
            }
        }
        throwBusinessError(!token, 'Access token is required');
        
        const decoded = verifyAccessToken(token);
        throwBusinessError(!decoded, 'Invalid or expired access token');
        req.user = decoded;
        next();
    } catch (error: any) {
        res.status(401).json({
            success: false,
            message: error.message || 'Authentication failed',
            error: 'UNAUTHORIZED'
        });
    }
};

// Optional authentication middleware (doesn't throw error if no token)
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.cookies?.accessToken;

        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        if (token) {
            const decoded = verifyAccessToken(token);
            if (decoded) {
                req.user = decoded;
            }
        }

        next();
    } catch (error) {
        next();
    }
}; 