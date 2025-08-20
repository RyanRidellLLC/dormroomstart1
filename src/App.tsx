import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StartupSignup from "./pages/StartupSignup";
import InvestorSignup from "./pages/InvestorSignup";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup/startup" element={<StartupSignup />} />
        <Route path="/signup/investor" element={<InvestorSignup />} />
      </Routes>
    </Router>
  );
};

export default App;
