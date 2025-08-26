import { useState } from "react";
import ProfileForm from "./components/ProfileForm";
import RecommendationList from "./components/RecommendationList";

export default function App() {
  const [recommendations, setRecommendations] = useState([]);

  // For now, just use static data when form is submitted
  const handleRecommendations = () => {
    setRecommendations(mockInternships);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100 p-8">
      {/* Header */}
      <header className="mb-12 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
          alt="Internship Illustration"
          className="mx-auto w-24 h-24 mb-4 animate-bounce"
        />
        <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow-lg mb-3">
          🎓 PM Internship Yojna
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Discover internships tailored to <span className="font-semibold text-blue-600">your skills</span>.  
          Enter your details and let AI guide your career journey 🚀
        </p>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Profile Form */}
        <div className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100 
                        hover:shadow-blue-300 hover:scale-[1.02] transform transition duration-300 relative">
          <span className="absolute -top-6 -left-6 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm shadow-md">
            ✍️ Fill Form
          </span>
          <h2 className="text-2xl font-semibold text-blue-600 mb-6 border-b pb-2">
            Enter Your Details
          </h2>
          <ProfileForm onRecommendations={handleRecommendations} />
        </div>

        {/* Recommendations */}
        <div className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100 
                        hover:shadow-green-300 hover:scale-[1.02] transform transition duration-300 relative">
          <span className="absolute -top-6 -right-6 bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm shadow-md">
            💡 AI Picks
          </span>
          <h2 className="text-2xl font-semibold text-green-600 mb-6 border-b pb-2">
            Recommended Internships
          </h2>
          <RecommendationList recommendations={recommendations} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm flex flex-col items-center space-y-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1006/1006363.png"
          alt="Career Path"
          className="w-10 h-10 opacity-80"
        />
        <p>Made with ❤️ using React, Tailwind & Express</p>
      </footer>
    </div>
  );
}

