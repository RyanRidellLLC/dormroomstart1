import React from "react";
import { Routes, Route } from "react-router-dom";
import FounderSubmit from "./pages/FounderSubmit";
import StartupSignup from "./pages/StartupSignup";
import InvestorSignup from "./pages/InvestorSignup";
import RequestProAccess from "./components/RequestProAccess";

/* ... keep your existing startups/mentors arrays and other code ... */

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/founder" element={<FounderSubmit />} />
      <Route path="/signup/startup" element={<StartupSignup />} />
      <Route path="/signup/investor" element={<InvestorSignup />} />
    </Routes>
  );
}

/* ... rest of your App.tsx file unchanged ... */
