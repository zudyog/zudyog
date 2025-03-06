import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
    StatusCode?: number;
}
const logging = (error: CustomError, _req: Request, _res: Response, next: NextFunction) => {
    console.log("logging", error);
    next(error);
}

const clientErrorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (req.xhr) {
        res.status(500).send({ error: "Unable to process request, please try after some time" });
    } else {
        next(error);
    }
}

const errorHandler = (error: CustomError, _req: Request, res: Response, next: NextFunction) => {
    res.status(error?.StatusCode! || 500).send(error);
}

export { logging, clientErrorHandler, errorHandler };