
import { Request, Response } from "express";
import AppConstants from "./src/utils/AppConstants";
import createApp from "./index";
import { Server } from "http";
import combinedPolicy from "./src/circuitBreaker";
const app = createApp()


// Example of implementing circuit breaker for an external service call
// app.get("/api/external-service", async (req: Request, res: Response) => {
//     try {
//         const result = await combinedPolicy.execute(async () => {
//             // Your external service call here
//             const response = await fetch('https://external-api.example.com/data');
//             if (!response.ok) {
//                 throw new Error('Service unavailable');
//             }
//             return response.json();
//         });

//         res.json(result);
//     } catch (error) {
//         if (error instanceof Error) {
//             res.status(503).json({
//                 error: 'Service temporarily unavailable',
//                 message: error.message
//             });
//         }
//     }
// });


app.get("/", (_req: Request, res: Response) => {
    res.send("App is running");
})

const server: Server = app.listen(AppConstants.PORT, () => {
    console.log(`App is running on http://localhost:${AppConstants.PORT}`);
});

// Define a timeout for forceful shutdown (in milliseconds)
const SHUTDOWN_TIMEOUT = 10000;

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('Received SIGINT signal. Initiating graceful shutdown...');

    let shutdownComplete = false;

    // Create a timeout promise
    const forceShutdown = new Promise((_, reject) => {
        setTimeout(() => {
            console.error(`Forcing shutdown after ${SHUTDOWN_TIMEOUT}ms timeout`);
            reject(new Error('Shutdown timeout exceeded'));
        }, SHUTDOWN_TIMEOUT);
    });

    try {
        // Attempt graceful shutdown
        const gracefulShutdown = new Promise<void>((resolve) => {
            server.close(async () => {
                try {
                    console.log('All connections closed successfully');
                    shutdownComplete = true;
                    resolve();
                } catch (error) {
                    console.error('Error during cleanup:', error);
                    process.exit(1);
                }
            });
        });

        // Race between graceful shutdown and timeout
        await Promise.race([gracefulShutdown, forceShutdown]);

        if (shutdownComplete) {
            console.log('Graceful shutdown completed');
            process.exit(0);
        }
    } catch (error) {
        console.error('Shutdown error:', error);
        process.exit(1);
    }
});

// Also handle SIGTERM for container environments
process.on('SIGTERM', () => {
    console.log('Received SIGTERM signal');
    process.emit('SIGINT');
});
