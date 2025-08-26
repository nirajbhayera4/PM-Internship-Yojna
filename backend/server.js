import express from "express";
import cors from "cors";
import internships from "./data/internships.js";

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("✅ Internship Recommender API is running!");
});

// Recommendation endpoint
app.post("/api/recommend", (req, res) => {
  const { skills, interests } = req.body;

  if (!skills || !interests) {
    return res.status(400).json({ error: "Skills and interests are required" });
  }

  const skillsArr = skills.toLowerCase().split(",").map((s) => s.trim());
  const interestsArr = interests.toLowerCase().split(",").map((i) => i.trim());

  // Simple matching logic
  const recommendations = internships.filter((internship) => {
    const skillMatch = internship.skills.some((skill) =>
      skillsArr.includes(skill.toLowerCase())
    );
    const interestMatch = internship.interests.some((interest) =>
      interestsArr.includes(interest.toLowerCase())
    );
    return skillMatch || interestMatch;
  });

  res.json(recommendations);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
