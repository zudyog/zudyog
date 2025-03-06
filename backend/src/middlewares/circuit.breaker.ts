import { Request, Response, NextFunction } from 'express';
import combinedPolicy from '../circuitBreaker';

export const circuitBreakerMiddleware = (serviceCall: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await combinedPolicy.execute(() => serviceCall(req));
            res.locals.result = result;
            next();
        } catch (error) {
            if (error instanceof Error) {
                res.status(503).json({
                    error: 'Service temporarily unavailable',
                    message: error.message
                });
            }
        }
    };
};
