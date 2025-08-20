import React from "react";
// ...all your existing imports
import { useNavigate } from "react-router-dom";

// ...rest of HomePage code

// In your HERO section, add new buttons for registration
<div className="flex flex-col sm:flex-row gap-3 justify-center">
  <button
    onClick={() => navigate("/founder")}
    className="px-6 py-3 text-lg font-semibold bg-navy-500 text-white rounded-full hover:bg-navy-600 transition shadow"
  >
    Post Your Startup
  </button>
  <button
    onClick={() => navigate("/signup/startup")}
    className="px-6 py-3 text-lg font-semibold bg-navy-600 text-white rounded-full hover:bg-navy-700 transition shadow"
  >
    Register as Startup
  </button>
  <button
    onClick={() => navigate("/signup/investor")}
    className="px-6 py-3 text-lg font-semibold bg-navy-700 text-white rounded-full hover:bg-navy-800 transition shadow"
  >
    Register as Investor
  </button>
</div>

// ...rest of HomePage unchanged
export default HomePage;
