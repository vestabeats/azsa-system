import { Request, Response, NextFunction } from 'express';

const routeNotFound = (req: Request, res: Response, next: NextFunction): void => {
    const error = new Error(`Route Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);  // Pass the error to the next middleware (errorHandler)
};

interface ErrorWithStatus extends Error {
    status?: number;
}

const errorHandler = (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction): void => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === "CastError" && (err as any).kind === "ObjectId") {
        statusCode = 404;
        message = "Resource Not Found";
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};

export { routeNotFound, errorHandler };
