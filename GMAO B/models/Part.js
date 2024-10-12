import mongoose from "mongoose";

const partSchema = new mongoose.Schema({
  reference: String,
  quantity: Number,
  state: String,
  lastUse: Date,
});

const Part = mongoose.model("Part", partSchema);

export default Part;
