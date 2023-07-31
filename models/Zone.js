/**
 * @description Zone - Mongoose model representing a zone in the TCRA API data.
 * @version 1.0.0 MMXXIII
 * @class Zone
 */
import mongoose from "mongoose";

/**
 * @class Zone
 * @description Mongoose model representing a zone in the TCRA API data.
 */
class Zone {
  /**
   * @constructor
   * @description Creates an instance of the Zone class.
   */
  constructor() {
    // Define the schema for the Zone model
    const zoneSchema = new mongoose.Schema({
      zoneId: { type: String, required: true, unique: true },
      zoneName: { type: String, required: true },
    });

    // Create the Mongoose model using the schema
    this.model = mongoose.model("Zone", zoneSchema);
  }
}

export default new Zone();
