import mongoose from "mongoose";

const wardSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  level: { type: String },
  location: { type: String },
  postcode: { type: String },
  district: { type: String, required: true },
});

const Ward = mongoose.model("Ward", wardSchema);

export default Ward;
