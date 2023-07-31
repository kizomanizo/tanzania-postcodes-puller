/**
 * @description Region - Mongoose model representing a region in the TCRA API data.
 * @version 1.0.0 MMXXIII
 * @class Region
 */
import mongoose from "mongoose";

/**
 * @class Region
 * @description Mongoose model representing a region in the TCRA API data.
 */
class Region {
  /**
   * @constructor
   * @description Creates an instance of the Region class.
   */
  constructor() {
    // Define the schema for the Region model
    const regionSchema = new mongoose.Schema({
      id: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      level: { type: String },
      location: { type: String },
      postcode: { type: String },
      zone: { type: String, required: true },
    });

    // Create the Mongoose model using the schema
    this.model = mongoose.model("Region", regionSchema);
  }
}

export default new Region();
