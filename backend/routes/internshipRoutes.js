import express from "express";
import Internship from "../models/Internship.js";

const router = express.Router();

// GET all internships
router.get("/", async (req, res) => {
  try {
    const internships = await Internship.find({});
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
