import express from "express";
import User from "../models/User.js";
import Internship from "../models/Internship.js";
import { recommendInternships } from "../utils/recommendationEngine.js";
import multer from "multer";

const router = express.Router();

// Resume upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// POST user profile + optional resume
router.post("/submit", upload.single("resume"), async (req, res) => {
  try {
    const { name, education, skills, sector, location } = req.body;
    const skillsArray = skills.split(",").map(s => s.trim());

    const user = await User.create({
      name,
      education,
      skills: skillsArray,
      sector,
      location,
      resume: req.file ? req.file.path : null
    });

    const internships = await Internship.find({});
    const recommendations = recommendInternships(user, internships);

    res.json({ recommendations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
