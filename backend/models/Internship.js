import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company_name: String,
  location: String,
  sector: String,
  skills_required: [String],
  url: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Internship", internshipSchema);
