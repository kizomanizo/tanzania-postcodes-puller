/**
 * @description This is the main entry point for the TCRA API puller backend.
 * @version 1.0.0 MMXXIII
 * @description This is the main entry point for the TCRA API puller backend.
 * It sets up the Express app, configures middleware, routes, and error handling,
 * and starts the server to listen on the specified port.
 * @author Kizito S.M.
 */

import express from "express";
import ErrorHandler from "./helpers/errorHandler.js";
import { attachResponseHandler } from "./middlewares/customMiddleware.js";
import tcraService from "./services/tcraService.js";
import "dotenv/config";
import CreateService from "./services/createService.js";
const createService = new CreateService();
import mongoose from "mongoose";

class AppServer {
  /**
   * Creates an instance of AppServer.
   * @param {number} port - The port number on which the server will listen. Default is 3000.
   * @description Creates an instance of the AppServer class with the specified port number (default is 3000).
   */
  constructor(port = process.env.PORT || 3000) {
    this.app = express();
    this.port = port;
  }

  /**
   * Configures the middleware for the Express app.
   * Disables "x-powered-by" header, parses incoming JSON, and URL-encoded requests.
   * Attaches custom response handler middleware.
   * @description Configures the middleware for the Express app by disabling the "x-powered-by" header,
   * parsing incoming JSON, and URL-encoded requests. It also attaches the custom response handler middleware.
   */
  configureMiddleware() {
    this.app.disable("x-powered-by");
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(attachResponseHandler);
  }

  async configureMongodb() {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 50,
      wtimeoutMS: 5000,
    };

    const mongoUrl = process.env.DATABASE_URL;
    await mongoose.connect(mongoUrl, options);
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("**** MongoDB connected successfully ****"));
  }

  /**
   * Configures routes for different API endpoints.
   * Defines handlers for API endpoints to fetch zones, regions, districts, and wards.
   * @description Configures routes for different API endpoints and defines handlers for each endpoint
   * to fetch zones, regions, districts, and wards from the tcraService.
   */
  configureRoutes() {
    this.app.get("/api/v1/zones", async (_req, res, next) => {
      try {
        const zones = await tcraService.getZones();
        res.responseHandler.sendResponse(200, true, zones);
      } catch (error) {
        console.log(error);
        throw error;
      }
    });

    this.app.get("/api/v1/regions", async (_req, res, next) => {
      try {
        const regions = await tcraService.getRegions();
        res.responseHandler.sendResponse(200, true, regions);
      } catch (error) {
        console.log(error);
        throw error;
      }
    });

    this.app.get("/api/v1/districts", async (_req, res, next) => {
      try {
        const districts = await tcraService.getDistricts();
        res.responseHandler.sendResponse(200, true, districts);
      } catch (error) {
        console.log(error);
        throw error;
      }
    });

    this.app.get("/api/v1/wards", async (_req, res, next) => {
      try {
        const wards = await tcraService.getWards();
        res.responseHandler.sendResponse(200, true, wards);
      } catch (error) {
        console.log(error);
        throw error;
      }
    });

    this.app.get("/api/v1/scrape", async (_req, res, next) => {
      try {
        const scrape = await createService.saveData();
        res.responseHandler.sendResponse(200, true, scrape);
      } catch (error) {
        throw error;
      }
    });
  }

  /**
   * Configures error handling middleware.
   * Handles errors using the custom ErrorHandler class.
   * @description Configures error handling middleware to handle errors using the custom ErrorHandler class.
   */
  configureErrorHandling() {
    this.app.use((error, req, res, next) => {
      const errorHandler = new ErrorHandler(error, req, res, next);
      errorHandler.handle();
    });
  }

  /**
   * Starts the Express server by configuring middleware, routes, and error handling.
   * The server listens on the specified port and logs a message once it starts.
   * @description Starts the Express server by configuring middleware, routes, and error handling,
   * and then listens on the specified port. Once the server starts, it logs an information message.
   */
  start() {
    this.configureMongodb();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();

    this.app.listen(this.port, () => {
      console.log("INFO: App listening on " + this.port);
    });
  }
}

export default AppServer;

const appServer = new AppServer();
appServer.start();
