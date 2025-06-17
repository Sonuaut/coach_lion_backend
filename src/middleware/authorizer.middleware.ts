import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/helper";
import { supabase } from "../config/supabase";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, error: "Unauthorized: No token provided" });
        }

        const { data: { user }, error } = await supabase.auth.getUser(token);
        
        if (error || !user) {
            return res.status(401).json({ success: false, error: "Unauthorized: Invalid token" });
        }

        req.body.loggedInUser = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, error: "Unauthorized: Token verification failed" });
    }
};

const VALID_ROLES = ["owner", "admin", "trainer", "member"] as const;
type ValidRole = (typeof VALID_ROLES)[number];
export const authorizeRole = (allowedRoles: ValidRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Extract token from Authorization header
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ success: false, error: "Unauthorized: No token provided" });
            }

            // Verify and decode the token
            const userData = verifyToken(token);
            if (!userData || !userData._id || !userData.role) {
                return res.status(401).json({ success: false, error: "Unauthorized: Invalid token" });
            }

            // Ensure user has permission
            if (!allowedRoles.includes(userData.role as ValidRole)) {
                return res.status(403).json({ success: false, error: "Access Denied: Insufficient permissions." });
            }

            req.body.loggedInUser = userData;
            next();
        } catch (error) {
            return res.status(401).json({ success: false, error: "Unauthorized: Token verification failed" });
        }
    };
};
