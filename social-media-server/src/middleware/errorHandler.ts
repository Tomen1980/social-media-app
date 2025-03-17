import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) : void => {
    if (err instanceof ZodError) {
         res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: err.errors, // Memberikan detail error dari Zod
        });
        next();
    }

    console.error("Error:", err);

    res.status(500).json({
        status: "error",
        message: err.message || "Internal server error",
    });

   next();
};
