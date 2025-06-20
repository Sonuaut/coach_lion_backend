import "tsconfig-paths/register";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import v1AuthRoutes from "./routes/v1/auth.routes";
import v1OnboardingRoutes from "./routes/v1/onboarding.routes"
import v1CheckinsRoutes from "./routes/v1/checkins.routes";
import v1MoodRoutes from "./routes/v1/mood.routes";
import v1ChatRoutes from "./routes/v1/chat.routes";
import v1TaskRoutes from "./routes/v1/task.routes"
import CommonVariables from "./config/index";
import { errorHandler } from "./middleware/error.middleware";
import { AuthDatabase } from "./database/implementations/prisma/authdb";
import { specs } from "./config/swagger";
import cors from "cors";

CommonVariables.Initiate();
const app = express();
const dbService = new AuthDatabase();

// Get PORT from environment variables
const PORT = CommonVariables.PORT;

// Middleware for parsing JSON requests
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Middleware for parsing cookies
app.use(cookieParser());

// Swagger Documentation 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Authentication API Documentation',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        showExtensions: true,
        showCommonExtensions: true
    }
}))

// Health check route
app.get("/api/v1/health", async (req: Request, res: Response) => {
    const dbStatus = await dbService.checkConnection();
    res.status(dbStatus ? 200 : 500).json({
        status: dbStatus ? "healthy" : "unhealthy",
        database: dbStatus ? "connected" : "disconnected",
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use("/api/v1/auth", v1AuthRoutes);
app.use("/api/v1/onboarding",v1OnboardingRoutes)
app.use("/api/v1/checkins", v1CheckinsRoutes);
app.use("/api/v1/mood", v1MoodRoutes);
app.use("/api/v1/chat", v1ChatRoutes);
app.use("/api/v1/task",v1TaskRoutes)

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, async () => {
     // Check database connection on startup
     const isConnected = await dbService.checkConnection();
     if (!isConnected) {
         console.error('❌ Failed to connect to database. Please check your configuration.');
         process.exit(1);
     }
     
    console.log(`🚀 Server is running on port ${PORT} and environment ${CommonVariables.NODE_ENV}`);
    console.log(`📚 API Documentation available at: http://localhost:${PORT}/api-docs`);
    
   
});
