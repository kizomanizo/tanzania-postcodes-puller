/**
 * ResponseHandler - A utility class for sending responses with consistent structure.
 * @version 1.0.0 MMXXIII
 * @description A utility class for sending responses with consistent structure.
 * @description This class provides a convenient way to send HTTP responses with a consistent structure,
 * reducing boilerplate code in the application.
 * @author Kizito S.M.
 */
class ResponseHandler {
  /**
   * Creates an instance of ResponseHandler.
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @description Creates an instance of ResponseHandler to handle HTTP responses.
   */
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  /**
   * Sends a response with the specified status code, success flag, and payload.
   * @param {number} statusCode - The HTTP status code of the response.
   * @param {boolean} success - The success status of the response.
   * @param {Object} payload - The payload data of the response.
   * @description Sends a response with the given status code, success status, and payload.
   */
  sendResponse(statusCode, success, payload) {
    const responseStatus = statusCode || 200;
    const responseSuccess = success || false;
    const responsePayload = payload || null;

    this.res.status(responseStatus).json({
      status: responseStatus,
      success: responseSuccess,
      payload: responsePayload,
    });
  }
}

export default ResponseHandler;
