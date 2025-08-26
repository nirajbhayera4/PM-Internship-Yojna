import { useState } from "react";
import api from "../services/api";

export default function ProfileForm({ onRecommendations }) {
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    interests: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call backend API
      const res = await api.post("/recommend", formData);
      onRecommendations(res.data); // Pass data to App.jsx
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
      />
      <input
        type="text"
        name="skills"
        placeholder="Your Skills (e.g. Python, React)"
        value={formData.skills}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
      />
      <input
        type="text"
        name="interests"
        placeholder="Your Interests (e.g. AI, Web Dev)"
        value={formData.interests}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Get Recommendations
      </button>
    </form>
  );
}
