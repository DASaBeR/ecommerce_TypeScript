import { NextFunction, Request, Response } from "express";
import { ErrorCodes, HttpExceptions } from "../exceptions/root";

export const errorMiddleware = (
  error: HttpExceptions,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HttpExceptions) {
    console.log(error);
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errorCode: error.errorCode,
      errors: error.errors,
    });
  }

  // Handle unexpected errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errorCode: ErrorCodes.INTERNAL_SERVER_ERROR,
    errors: [],
  });
};
