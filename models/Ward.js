/**
 * @description Ward - Mongoose model representing a ward in the TCRA API data.
 * @version 1.0.0 MMXXIII
 * @class Ward
 */
import mongoose from "mongoose";

/**
 * @class Ward
 * @description Mongoose model representing a ward in the TCRA API data.
 */
class Ward {
  /**
   * @constructor
   * @description Creates an instance of the Ward class.
   */
  constructor() {
    // Define the schema for the Ward model
    const wardSchema = new mongoose.Schema({
      id: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      level: { type: String },
      location: { type: String },
      postcode: { type: String },
      district: { type: String, required: true },
    });

    // Create the Mongoose model using the schema
    this.model = mongoose.model("Ward", wardSchema);
  }
}

export default new Ward();
