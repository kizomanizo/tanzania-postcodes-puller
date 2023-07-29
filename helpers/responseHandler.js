// responseHandler.js

class ResponseHandler {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

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
