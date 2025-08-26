import { useState } from "react";
import { mockInternships } from "./mockdata";

export default function ProfileForm({ onRecommendations }) {
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    skills: "",
    sector: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple scoring: match sector, location, skills
    const profileSkills = formData.skills.toLowerCase().split(",").map(s => s.trim());

    const recommendations = mockInternships
      .map(job => {
        let score = 0;

        // Match sector (if available)
        if (job.sector && job.sector.toLowerCase() === formData.sector.toLowerCase()) score += 2;

        // Match location
        if (job.location.toLowerCase().includes(formData.location.toLowerCase())) score += 2;

        // Match skills (if job.skills exists)
        const matchedSkills = (job.skills_required || []).filter(sk =>
          profileSkills.includes(sk.toLowerCase())
        );
        score += matchedSkills.length;

        return { ...job, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Top 5 recommendations

    onRecommendations(recommendations);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-md shadow-md">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
      />

      <select
        name="education"
        value={formData.education}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
      >
        <option value="">Select Education Level</option>
        <option value="10th">10th</option>
        <option value="12th">12th</option>
        <option value="Diploma">Diploma</option>
        <option value="UG">Undergraduate</option>
        <option value="PG">Postgraduate</option>
      </select>

      <input
        type="text"
        name="skills"
        placeholder="Your Skills (e.g. Python, React)"
        value={formData.skills}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
      />

      <select
        name="sector"
        value={formData.sector}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
      >
        <option value="">Select Sector of Interest</option>
        <option>IT</option>
        <option>Healthcare</option>
        <option>Education</option>
        <option>Agriculture</option>
        <option>Business</option>
      </select>

      <input
        type="text"
        name="location"
        placeholder="Preferred Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
      >
        Get Recommendations
      </button>
    </form>
  );
}
