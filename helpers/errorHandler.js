// errorHandler.js

class ErrorHandler {
  constructor(error, req, res, next) {
    this.error = error;
    this.req = req;
    this.res = res;
    this.next = next;
  }

  handle() {
    const { statusCode, message } = this.getErrorDetails();
    this.res.status(statusCode).json({
      status: statusCode,
      success: false,
      error: message,
    });
  }

  getErrorDetails() {
    let statusCode = this.error.statusCode || 500;
    let message = this.error.message || "Internal Server Error";

    if (this.error instanceof SyntaxError) {
      statusCode = 400; // Bad Request
      message = "Invalid JSON format in the request body";
    }

    return { statusCode, message };
  }
}

export default ErrorHandler;
