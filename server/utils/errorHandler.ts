import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${req.method} ${req.path}`, {
    error: err.message,
    stack: err.stack,
    body: req.body,
    query: req.query,
    params: req.params,
  });

  res.status(err.status || 500).json({
    message: err.isPublic ? err.message : "Internal server error",
  });
};
