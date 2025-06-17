export class ValidationError extends Error {
    public details: Record<string, string>;

    constructor(details: Record<string, string>) {
        super("Validation Error");
        this.name = "ValidationError";
        this.details = details;
    }
}

export class BusinessError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BusinessError";
    }
}

export interface DBErrorResponse {
    code: string;
    message: string;
    details: string;
    hint: string | null;
}

export class DBError extends Error {
    public errorResponse: DBErrorResponse;

    constructor(errorResponse: DBErrorResponse) {
        super(errorResponse.message);
        this.name = "DBError";
        this.errorResponse = errorResponse;
    }
}

export const throwValidationError = (errors: Record<string, string>): void => {
    if (Object.keys(errors).length > 0) {
        throw new ValidationError(errors);
    }
};

export const throwBusinessError = (condition: boolean, message: string): void => {
    if (condition) {
        throw new BusinessError(message);
    }
};

export const throwDBError = (errorResponse: DBErrorResponse): void => {
    throw new DBError(errorResponse);
};
