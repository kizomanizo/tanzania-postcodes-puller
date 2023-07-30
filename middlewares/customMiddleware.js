/**
 * @description Middleware for attaching a custom response handler to the Express response object.
 * @version 1.0.0 MMXXIII
 * @author Kizito S.M.
 */

import ResponseHandler from "../helpers/responseHandler.js";

/**
 * Attaches a custom response handler to the Express response object and calls the next middleware.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next function.
 */
export function attachResponseHandler(req, res, next) {
  res.responseHandler = new ResponseHandler(req, res);
  next();
}
