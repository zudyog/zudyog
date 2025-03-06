import bodyParser from "body-parser";
import { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import routes from "./app.routes";
import mongoose from "mongoose";
import { clientErrorHandler, errorHandler, logging } from "./utils/ErrorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config";
import { setupClustering } from "./cluster";
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { redis } from "./middlewares/redis.cache";

dotenv.config();

interface DatabaseConfig {
    url: string;
    options?: mongoose.ConnectOptions;
}

export interface AppConfig {
    database: DatabaseConfig;
    port: number;
}

export interface AppDependencies {
    express: Application;
    config: AppConfig;
}

class App {
    private readonly app: Application;
    private readonly config: AppConfig;

    constructor(dependencies: AppDependencies) {
        this.app = dependencies.express;
        this.config = dependencies.config;
        this.initializeMiddlewares()
            .then(() => {
                this.initializeRoutes();
                this.initializeErrorHandling();
                this.initializeDatabase();
                this.initializeHealthCheck();
                this.rateLimiting()
            })
            .catch(error => {
                console.error('Failed to initialize application:', error);
                process.exit(1);
            });
    }

    private async initializeMiddlewares(): Promise<void> {
        // Security middlewares
        this.app.use(helmet());
        this.app.use(compression());

        // CORS configuration
        this.app.use(cors({
            origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        // Body parser configuration
        this.app.use(bodyParser.json({ limit: '10mb' }));
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

        const setupSwagger = () => {
            this.app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
            console.log("Swagger docs available at http://localhost:3200/api/api-docs");
        };

        setupSwagger();
    }

    private initializeRoutes(): void {
        this.app.use('/api', routes);
    }

    private initializeErrorHandling(): void {
        this.app.use(logging);
        this.app.use(clientErrorHandler);
        this.app.use(errorHandler);
    }

    private async initializeDatabase(): Promise<void> {
        try {
            await mongoose.connect(this.config.database.url, {
                maxPoolSize: 10,
                minPoolSize: 5,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                connectTimeoutMS: 10000,
                retryWrites: true,
                ...this.config.database.options
            });
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Database connection error:', error);
            throw error;
        }
    }

    private initializeHealthCheck(): void {
        this.app.get('/health', (req: Request, res: Response) => {
            const healthcheck = {
                uptime: process.uptime(),
                message: 'OK',
                timestamp: Date.now(),
                mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
            };
            res.status(200).json(healthcheck);
        });
    }

    private contentTypeValidation = (req: Request, res: Response, next: NextFunction): void => {
        if (req.method === 'GET' || req.method === 'DELETE') {
            return next();
        }

        const contentType = req.headers['content-type'];
        if (!contentType || !contentType.includes('application/json')) {
            res.status(415).json({ error: 'Unsupported Media Type' });
            return;
        }
        next();
    }

    private acceptHeaderValidation = (req: Request, res: Response, next: NextFunction): void => {
        const acceptHeader = req.headers['accept'];
        if (!acceptHeader || !acceptHeader.includes('application/json')) {
            res.status(406).json({ error: 'Not Acceptable' });
            return;
        }
        next();
    }

    private rateLimiting() {
        // Rate limiting
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const ip = req.ip;
            // const now = Date.now();
            const key = `rate-limit:${ip}`;
            redis.get(key, async (err, count) => {
                if (err) {
                    console.error(err);
                }
                if (Number(count) >= 100) {
                    return res.status(429).json({ error: 'Rate limit exceeded' });
                }
                await redis.incr(key);
                await redis.expire(key, 60); // expire in 1 minute
                next();
            });
        });
    }

    public async startServer(): Promise<void> {
        try {
            if (process.env.CLUSTERING === 'true') {
                setupClustering(this.app);
            } else {
                const port = this.config.port || process.env.PORT || 3000;
                this.app.listen(port, () => {
                    console.log(`Server started on port ${port}`);
                });
            }
        } catch (error) {
            console.error('Failed to start server:', error);
            throw error;
        }
    }

    public getApp(): Application {
        return this.app;
    }

    public async cleanup(): Promise<void> {
        try {
            await mongoose.connection.close();
        } catch (error) {
            console.error('Cleanup failed:', error);
            throw error;
        }
    }
}

export default App;
