import express from "express";
import ResponseHandler from "./responseHandler.js";
import ErrorHandler from "./errorHandler.js";

class AppServer {
  constructor(port = 3000) {
    this.app = express();
    this.port = port;
  }

  configureMiddleware() {
    this.app.disable("x-powered-by");
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  configureRoutes() {
    this.app.get("/", (req, res, next) => {
      try {
        const responseHandler = new ResponseHandler(req, res);
        responseHandler.sendResponse(200, true, "Root path reached!");
      } catch (error) {
        next(error);
      }
    });
  }

  configureErrorHandling() {
    // Error handling middleware
    this.app.use((error, req, res, next) => {
      const errorHandler = new ErrorHandler(error, req, res, next);
      errorHandler.handle();
    });
  }

  start() {
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();

    this.app.listen(this.port, () => {
      console.log("INFO: App listening on " + this.port);
    });
  }
}

export default AppServer;

const port = process.env.PORT || 3000;

const appServer = new AppServer(port);
appServer.start();
