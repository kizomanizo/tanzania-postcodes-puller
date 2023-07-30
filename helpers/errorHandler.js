/**
 * @description ErrorHandler - A utility class for handling errors and generating appropriate error responses.
 * @version 1.0.0 MMXXIII
 * @description A utility class for handling errors and generating appropriate error responses.
 * This class provides a convenient way to handle errors in the application and send standardized error responses.
 * @author Kizito S.M.
 */
class ErrorHandler {
  /**
   * Creates an instance of ErrorHandler.
   * @param {Error} error - The error object to handle.
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @param {Function} next - The Express next function.
   * @description Creates an instance of ErrorHandler to handle errors and send error responses.
   */
  constructor(error, req, res, next) {
    this.error = error;
    this.req = req;
    this.res = res;
    this.next = next;
  }

  /**
   * Handles the error and sends an appropriate error response.
   * @description Handles the error and sends an appropriate error response based on the error type.
   */
  handle() {
    const { statusCode, message } = this.getErrorDetails();
    this.res.status(statusCode).json({
      status: statusCode,
      success: false,
      error: message,
    });
  }

  /**
   * Determines the details of the error, such as status code and error message.
   * @returns {Object} An object containing the status code and error message.
   * @description Determines the details of the error, such as the status code and error message,
   * based on the error type. If the error is a SyntaxError (e.g., invalid JSON format in the request body),
   * the status code is set to 400 (Bad Request) and the error message is updated accordingly.
   */
  getErrorDetails() {
    let statusCode = this.error.statusCode || 500;
    let message = this.error.message || "Internal Server Error";

    // If the error is a SyntaxError (e.g., invalid JSON format in the request body),
    // set the status code to 400 (Bad Request) and update the error message.
    if (this.error instanceof SyntaxError) {
      statusCode = 400;
      message = "Invalid JSON format in the request body";
    }

    return { statusCode, message };
  }
}

export default ErrorHandler;
