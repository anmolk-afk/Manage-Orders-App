export class AppError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export const errorHandler = (err, req, res, next) => {
  // Custom Error (in api routes)
  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message, details: err.details });
  }

  // Unexpected Error
  console.error("Internal Error:", err.message);

  return res.status(500).json({ message: 'Internal server error' });
}