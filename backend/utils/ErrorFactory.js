// utils/ErrorFactory.js
// This module defines a custom error class and a factory function to create specific error instances.
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Helps distinguish between expected vs programming errors
    Error.captureStackTrace(this, this.constructor);
  }
}

class ErrorFactory {
  static create(type, message) {
    switch (type) {
      case "ValidationError":
        return new AppError(`Validation failed: ${message}`, 400);
      case "AuthError":
        return new AppError(`Authentication error: ${message}`, 401);
      case "NotFoundError":
        return new AppError(`Resource not found: ${message}`, 404);
      case "ForbiddenError":
        return new AppError(`Forbidden: ${message}`, 403);
      default:
        return new AppError(message, 500);
    }
  }
}

module.exports = { ErrorFactory, AppError };
