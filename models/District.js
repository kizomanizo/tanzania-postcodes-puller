/**
 * @description District - Mongoose model representing a district in the TCRA API data.
 * @version 1.0.0 MMXXIII
 * @class District
 */
import mongoose from "mongoose";

/**
 * @class District
 * @description Mongoose model representing a district in the TCRA API data.
 */
class District {
  /**
   * @constructor
   * @description Creates an instance of the District class.
   */
  constructor() {
    // Define the schema for the District model
    const districtSchema = new mongoose.Schema({
      id: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      level: { type: String },
      location: { type: String },
      postcode: { type: String },
      region: { type: String, required: true },
    });

    // Create the Mongoose model using the schema
    this.model = mongoose.model("District", districtSchema);
  }
}

export default new District();
