import { useState } from "react";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // For now, you can fetch from your API or local JSON
      const res = await fetch("https://workforindia.niti.gov.in/intern/api/internships");
      const data = await res.json();

      // Simple scoring: match sector, location, skills
      const profileSkills = formData.skills.toLowerCase().split(",").map(s => s.trim());
      const recommendations = data
        .map(job => {
          let score = 0;
          if (job.sector === formData.sector) score += 2;
          if (job.location.toLowerCase() === formData.location.toLowerCase()) score += 2;
          const matchedSkills = (job.skills_required || []).filter(sk =>
            profileSkills.includes(sk.toLowerCase())
          );
          score += matchedSkills.length;
          return { ...job, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      onRecommendations(recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
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
