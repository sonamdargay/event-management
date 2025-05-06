// middleware/errorHandler.js
// Centralized Error Handler Middleware for implementing Chain of Responsibility pattern
// This middleware captures errors from various parts of the application
function errorHandler(err, req, res, next) {
  console.error("Error Handler:", err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
}

module.exports = errorHandler;
