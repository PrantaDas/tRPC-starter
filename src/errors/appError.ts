export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const handleError = (err: unknown) => {
  if (err instanceof AppError) {
    return {
      status: "error",
      message: err.message,
      statusCode: err.statusCode,
    };
  }
  return {
    status: "error",
    message: "Internal Server Error",
    statusCode: 500,
  };
};
