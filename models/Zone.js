import mongoose from "mongoose";

const zoneSchema = new mongoose.Schema({
  zoneId: { type: String, required: true, unique: true },
  zoneName: { type: String, required: true },
});

const Zone = mongoose.model("Zone", zoneSchema);

export default Zone;
