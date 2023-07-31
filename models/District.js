import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  level: { type: String },
  location: { type: String },
  postcode: { type: String },
  region: { type: String, required: true },
});

const District = mongoose.model("District", districtSchema);

export default District;
