import mongoose from "mongoose";

const regionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  level: { type: String },
  location: { type: String },
  postcode: { type: String },
  zone: { type: String, required: true },
});

const Region = mongoose.model("Region", regionSchema);

export default Region;
