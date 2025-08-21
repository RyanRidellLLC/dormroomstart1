import React from "react";
import { Link } from "react-router-dom";

const criteriaStartup = [
  "Business idea description",
  "Projected revenue or traction",
  "Team information",
  "Pitch deck or summary",
];

const criteriaInvestor = [
  "Accredited investor status",
  "Investment interests",
  "Contact information",
  "Proof of funds (optional)",
];

const HomePage: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80')", // swap to your favorite city skyline image!
      }}
    >
      <div className="flex-1 bg-black bg-opacity-70 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center drop-shadow-lg">
          Dorm Room Startups
        </h1>
        <p className="text-xl md:text-2xl text-white mb-10 text-center max-w-2xl">
          Where college founders and investors connect. Share your vision, show your growth, or discover the next big thing!
        </p>

        {/* Profile Areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-12">
          {/* Business Idea */}
          <div className="bg-white bg-opacity-90 rounded-lg p-6 shadow-xl flex flex-col items-center">
            <span className="text-2xl font-bold mb-2">Business Idea</span>
            <p className="mb-3 text-gray-600 text-center">
              Share your innovative idea and get feedback from the community and investors.
            </p>
            <Link
              to="/signup/startup"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
            >
              Sign up as Startup
            </Link>
          </div>
          {/* Revenue Made */}
          <div className="bg-white bg-opacity-90 rounded-lg p-6 shadow-xl flex flex-col items-center">
            <span className="text-2xl font-bold mb-2">Revenue Made</span>
            <p className="mb-3 text-gray-600 text-center">
              Show your traction, revenue, or growth—stand out to investors.
            </p>
            <Link
              to="/signup/startup"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition"
            >
              Startup Criteria
            </Link>
            <ul className="mt-2 text-left text-gray-700 text-sm">
              {criteriaStartup.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          {/* Investor Backed */}
          <div className="bg-white bg-opacity-90 rounded-lg p-6 shadow-xl flex flex-col items-center">
            <span className="text-2xl font-bold mb-2">Investor Backed</span>
            <p className="mb-3 text-gray-600 text-center">
              Discover high-potential startups and invest in the future.
            </p>
            <Link
              to="/signup/investor"
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-800 transition"
            >
              Sign up as Investor
            </Link>
            <ul className="mt-2 text-left text-gray-700 text-sm">
              {criteriaInvestor.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <footer className="text-center text-white py-4 bg-black bg-opacity-60">
        © {new Date().getFullYear()} Dorm Room Startups. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
