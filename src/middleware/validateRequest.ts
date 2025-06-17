import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { throwValidationError } from "../utils/error.utils";


export const validateRequest = (schema: ZodSchema<any>) => {

    return (req: Request, res: Response, next: NextFunction) => {
        const data = { ...req.body, ...req.params, ...req.query };
        const result = schema.safeParse(data);
        if (!result.success)
            throwValidationError(formatZodErrors(result.error));
        next();
    };
};

const formatZodErrors = (error: ZodError): Record<string, string> => {
    return Object.entries(error.format()).reduce((acc, [key, value]) => {
        acc[key] = (value as any)._errors?.[0] || "Invalid value";
        return acc;
    }, {} as Record<string, string>);
};
