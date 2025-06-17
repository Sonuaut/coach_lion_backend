import { Request, Response, NextFunction } from "express";
import { ValidationError, BusinessError, DBError } from "../utils/error.utils";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
        return res.status(400).json({
            status: false,
            error: "Validation Error",
            details: err.details,
        });
    }

    if (err instanceof BusinessError) {
        return res.status(400).json({
            status: false,
            error: err.message,
        });
    }

    if (err instanceof DBError) {
        return res.status(500).json({
            status: false,
            error: err.errorResponse.message,
            code: err.errorResponse.code,
            details: err.errorResponse.details,
            hint: err.errorResponse.hint
        });
    }

    console.error("Unexpected Error:", err);
    return res.status(500).json({
        status: false,
        error: "Something went wrong. Please try again later.",
    });
};

export const tryCatchHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn.call(fn, req, res, next);
        } catch (error) {
            next(error);
        }
    };
};
