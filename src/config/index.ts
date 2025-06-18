import dotenv from "dotenv";
import { getConfig } from "./environments";

dotenv.config();

const config = getConfig();

export default class CommonVariables {
    static readonly PORT: string = config.PORT;
    static readonly NODE_ENV: string = config.NODE_ENV;
    static readonly APP_SERVICE_NAME: string = config.APP_SERVICE_NAME;
    static readonly JWT_SECRET: string = config.JWT_SECRET;
    static readonly JWT_SECRET_TIMEOUT: string = config.JWT_SECRET_TIMEOUT;
    static readonly ENCRYPTION_KEY: string = config.ENCRYPTION_KEY;
    static readonly REDIS_URI: string = config.REDIS_URI;
    static readonly SUPABASE_KEY: string = config.SUPABASE_KEY;
    static readonly SUPABASE_ANON_KEY: string = config.SUPABASE_KEY;
    static readonly SMTP_HOST: string = process.env.SMTP_HOST ||config.SMTP_HOST 
    static readonly SMTP_PORT: string = process.env.SMTP_PORT||config.SMTP_PORT
    static readonly SMTP_SECURE: string = process.env.SMTP_SECURE|| config.SMTP_SECURE;
    static readonly SMTP_USER: string = process.env.SMTP_USER|| config.SMTP_USER;
    static readonly SMTP_PASSWORD: string =process.env.SMTP_PASSWORD|| config.SMTP_PASSWORD;
    static readonly SMTP_FROM: string =process.env.SMTP_FROM || config.SMTP_FROM;
   
    static Initiate() {
        if (this.NODE_ENV === "production") {
            const requiredVars = [
                "JWT_SECRET", 
                "JWT_SECRET_TIMEOUT", 
                "CRYPTO_ENCRYPTION_KEY", 
                "REDIS_URI",
                "SUPABASE_KEY",
                "SUPABASE_ANON_KEY"
            ];

            requiredVars.forEach((variable) => {
                const value = process.env[variable]?.trim();
                if (!value) {
                    throw new Error(`❌ Missing or empty environment variable: ${variable}`);
                }
            });
        }

        console.log(`✅ Common Variables Initiated Successfully! (${this.NODE_ENV} environment)`);
    }

    static getAccessTokenSecret(): string {
        if (!CommonVariables.JWT_SECRET_TIMEOUT) {
            throw new Error("❌ Access token secret not found in environment variables.");
        }
        return CommonVariables.JWT_SECRET_TIMEOUT;
    }
}
