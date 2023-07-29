import ResponseHandler from "../helpers/responseHandler.js";

export function attachResponseHandler(req, res, next) {
  res.responseHandler = new ResponseHandler(req, res);
  next();
}
