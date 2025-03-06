import Redis from 'ioredis';
import { Request, Response, NextFunction, Application } from "express";


export const redis = new Redis(); // Default Redis connection (localhost:6379)

// Middleware to check cache
export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { key } = req.params;

    try {
        const cachedData = await redis.get(key);
        if (cachedData) {
            return res.json({ fromCache: true, data: JSON.parse(cachedData) });
        }
        next();
    } catch (error) {
        console.error("Redis error:", error);
        next();
    }
};

