import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-navy-900 to-navy-700">
      <h1 className="text-4xl font-bold text-white mb-8">Dorm Room Startups</h1>
      <div className="flex space-x-6">
        <Link
          to="/signup/startup"
          className="px-8 py-4 bg-navy-600 rounded-lg text-white font-semibold shadow hover:bg-navy-500 transition"
        >
          Post Your Startup
        </Link>
        <Link
          to="/signup/investor"
          className="px-8 py-4 bg-navy-400 rounded-lg text-white font-semibold shadow hover:bg-navy-300 transition"
        >
          Register as Investor
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
