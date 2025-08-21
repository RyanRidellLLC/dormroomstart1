import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const InvestorSignup: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    interests: "",
    accredited: false,
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    if (!form.name || !form.email || !form.interests) {
      setError("Please fill all required fields.");
      setSubmitting(false);
      return;
    }

    if (!supabase) {
      setError("Database not configured. Form submission disabled.");
      setSubmitting(false);
      return;
    }

    const { error: dbError } = await supabase.from("investors").insert([
      {
        name: form.name,
        email: form.email,
        interests: form.interests,
        accredited: form.accredited,
      },
    ]);
    if (dbError) {
      setError("Error: " + dbError.message);
      setSubmitting(false);
      return;
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-gradient">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full space-y-4"
      >
        <h2 className="text-2xl font-bold mb-2 text-navy-700">Investor Registration</h2>
        {error && <div className="text-red-600">{error}</div>}
        <input name="name" onChange={handleChange} value={form.name} required placeholder="Name*" className="input" />
        <input name="email" type="email" onChange={handleChange} value={form.email} required placeholder="Email*" className="input" />
        <textarea name="interests" onChange={handleChange} value={form.interests} required placeholder="Investment Interests*" className="input" rows={4} />
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="accredited" checked={form.accredited} onChange={handleChange} />
          <span>Accredited Investor</span>
        </label>
        <button
          type="submit"
          className="w-full bg-navy-700 text-white font-semibold py-2 px-4 rounded hover:bg-navy-800 transition"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default InvestorSignup;
