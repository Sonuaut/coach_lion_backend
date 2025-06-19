interface EnvironmentConfig {
    PORT: string;
    NODE_ENV: string;
    APP_SERVICE_NAME: string;
    JWT_SECRET: string;
    JWT_SECRET_TIMEOUT: string;
    ENCRYPTION_KEY: string;
    REDIS_URI: string;
    SUPABASE_URL: string;
    SUPABASE_KEY: string;
    DB_USER: string;
    DB_HOST: string;
    DB_NAME: string;
    DB_PASSWORD: string;
    DB_PORT: string;
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_SECURE: string;
    SMTP_USER: string;
    SMTP_PASSWORD: string;
    SMTP_FROM: string;
    OPENAI_API_KEY:string
}

const localConfig: EnvironmentConfig = {
    PORT: "6001",
    NODE_ENV: "development",
    APP_SERVICE_NAME: "AuthService",
    JWT_SECRET: "super-secret-jwt-token-with-at-least-32-characters-long",
    JWT_SECRET_TIMEOUT: "1h",
    ENCRYPTION_KEY: "super-secret-jwt-token-with-at-least-32-characters-long",
    REDIS_URI: "redis://localhost:6379",
    SUPABASE_URL: "http://127.0.0.1:54321",
    SUPABASE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
    DB_USER: "postgres",
    DB_HOST: "127.0.0.1",
    DB_NAME: "postgres",
    DB_PASSWORD: "postgres",
    DB_PORT: "54329",
    SMTP_HOST: process.env.SMTP_HOST || "",
    SMTP_PORT: process.env.SMTP_PORT || "587",
    SMTP_SECURE: process.env.SMTP_SECURE || "true",
    SMTP_USER: process.env.SMTP_USER || "",
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || "",
    SMTP_FROM: process.env.SMTP_FROM || "",
    OPENAI_API_KEY:process.env.OPENAI_API_KEY||""
};

const productionConfig: EnvironmentConfig = {
    PORT: process.env.PORT || "6001",
    NODE_ENV: process.env.NODE_ENV || "production",
    APP_SERVICE_NAME: process.env.APP_SERVICE_NAME || "AuthService",
    JWT_SECRET: process.env.JWT_SECRET || "",
    JWT_SECRET_TIMEOUT: process.env.JWT_SECRET_TIMEOUT || "1h",
    ENCRYPTION_KEY: process.env.CRYPTO_ENCRYPTION_KEY || "",
    REDIS_URI: process.env.REDIS_URI || "",
    SUPABASE_URL: process.env.SUPABASE_URL || "",
    SUPABASE_KEY: process.env.SUPABASE_KEY || "",
    DB_USER: process.env.DB_USER || "",
    DB_HOST: process.env.DB_HOST || "",
    DB_NAME: process.env.DB_NAME || "",
    DB_PASSWORD: process.env.DB_PASSWORD || "",
    DB_PORT: process.env.DB_PORT || "5432",
    SMTP_HOST: process.env.SMTP_HOST || "",
    SMTP_PORT: process.env.SMTP_PORT || "587",
    SMTP_SECURE: process.env.SMTP_SECURE || "true",
    SMTP_USER: process.env.SMTP_USER || "",
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || "",
    SMTP_FROM: process.env.SMTP_FROM || "",
    OPENAI_API_KEY:process.env.OPENAI_API_KEY||""
};

export const getConfig = (): EnvironmentConfig => {
    const env = process.env.NODE_ENV || "development";
    return env === "production" ? productionConfig : localConfig;
}; 