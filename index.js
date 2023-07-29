// index.js

import express from "express";
import ErrorHandler from "./helpers/errorHandler.js";
import { attachResponseHandler } from "./middlewares/customMiddleware.js";
import tcraService from "./services/tcraService.js";
import "dotenv/config";

class AppServer {
  constructor(port = 3000) {
    this.app = express();
    this.port = port;
  }

  configureMiddleware() {
    this.app.disable("x-powered-by");
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(attachResponseHandler);
  }

  configureRoutes() {
    this.app.get("/", (req, res, next) => {
      try {
        res.responseHandler.sendResponse(200, true, "Root path reached!");
      } catch (error) {
        next(error);
      }
    });

    this.app.get("/api/v1/regions", async (req, res, next) => {
      try {
        const regions = await tcraService.getRegions();
        res.responseHandler.sendResponse(200, true, regions);
      } catch (error) {
        console.log(error);
        next(error);
      }
    });
  }

  configureErrorHandling() {
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
