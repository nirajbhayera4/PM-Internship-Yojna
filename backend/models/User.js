import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  education: String,
  skills: [String],
  sector: String,
  location: String,
  resume: String, // optional resume file path
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
