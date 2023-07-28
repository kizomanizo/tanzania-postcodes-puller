class ResponseHandler {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  sendResponse(status, success, payload) {
    const responseStatus = status || 200;
    const responseSuccess = success;
    const responsePayload = payload || null;

    this.res.status(responseStatus).json({
      status: responseStatus,
      success: responseSuccess,
      payload: responsePayload,
    });
  }
}

export default ResponseHandler;
