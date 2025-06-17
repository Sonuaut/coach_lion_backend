import "tsconfig-paths/register";
import express, { Request, Response } from "express";
import v1AuthRoutes from "./routes/v1/auth/auth.routes";
import CommonVariables from "./config/index";
import { errorHandler } from "./middleware/error.middleware";
import { AuthDatabase } from "./database/implementations/supabase/authdb";
CommonVariables.Initiate();
const app = express();
const dbService = new AuthDatabase();

// Get PORT from environment variables
const PORT = CommonVariables.PORT;


// Middleware for parsing JSON requests
app.use(express.json());

// Health check route
app.get("/health", async (req: Request, res: Response) => {
    const dbStatus = await dbService.checkConnection();
    res.status(dbStatus ? 200 : 500).json({
        status: dbStatus ? "healthy" : "unhealthy",
        database: dbStatus ? "connected" : "disconnected",
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use("/api/v1/auth", v1AuthRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, async () => {
    console.log(`🚀 Server is running on port ${PORT} and environment ${CommonVariables.NODE_ENV}`);
    
    // Check database connection on startup
    const isConnected = await dbService.checkConnection();
    if (!isConnected) {
        console.error('❌ Failed to connect to database. Please check your configuration.');
        process.exit(1);
    }
});
