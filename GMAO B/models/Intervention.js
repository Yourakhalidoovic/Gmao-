import mongoose from "mongoose";

const interventionSchema = new mongoose.Schema({
  date: Date,
  technician: String,
  equipment: String,
  description: String,
});

const Intervention = mongoose.model("Intervention", interventionSchema);

export default Intervention;
