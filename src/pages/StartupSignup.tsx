import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const SECTORS = [
  "EdTech",
  "FinTech",
  "HealthTech",
  "AI",
  "Consumer",
  "SaaS",
  "Other",
];
const STAGES = ["Idea", "MVP", "Revenue", "Scaling"];

export default function StartupSignup() {
  const [form, setForm] = useState({
    founder: "",
    email: "",
    university: "",
    startup: "",
    sector: "",
    stage: "",
    pitch: "",
    website: "",
    funding: "",
    mentorship: false,
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

    // Basic validation
    if (!form.founder || !form.email || !form.university || !form.startup || !form.sector || !form.stage || !form.pitch) {
      setError("Please fill all required fields.");
      setSubmitting(false);
      return;
    }

    // Supabase insert
    const { error: dbError } = await supabase.from("startups").insert([
      {
        founder: form.founder,
        email: form.email,
        university: form.university,
        startup: form.startup,
        sector: form.sector,
        stage: form.stage,
        pitch: form.pitch,
        website: form.website,
        funding: form.funding,
        mentorship: form.mentorship,
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
        <h2 className="text-2xl font-bold mb-2 text-navy-700">Startup Registration</h2>
        {error && <div className="text-red-600">{error}</div>}
        <input name="founder" onChange={handleChange} value={form.founder} required placeholder="Founder Name*" className="input" />
        <input name="email" type="email" onChange={handleChange} value={form.email} required placeholder="Email*" className="input" />
        <input name="university" onChange={handleChange} value={form.university} required placeholder="University*" className="input" />
        <input name="startup" onChange={handleChange} value={form.startup} required placeholder="Startup Name*" className="input" />
        <select name="sector" onChange={handleChange} value={form.sector} required className="input">
          <option value="">Sector*</option>
          {SECTORS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select name="stage" onChange={handleChange} value={form.stage} required className="input">
          <option value="">Stage*</option>
          {STAGES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <textarea name="pitch" onChange={handleChange} value={form.pitch} required placeholder="Short Pitch*" className="input" />
        <input name="website" onChange={handleChange} value={form.website} placeholder="Website (optional)" className="input" />
        <input name="funding" onChange={handleChange} value={form.funding} placeholder="Funding Sought (optional)" className="input" />
        <label className="flex items-center gap-2 text-navy-600">
          <input type="checkbox" name="mentorship" checked={form.mentorship} onChange={handleChange} />
          Open to mentorship
        </label>
        <button disabled={submitting} className="w-full py-3 bg-navy-600 text-white rounded-xl font-semibold hover:bg-navy-700 transition">
          {submitting ? "Submitting..." : "Register Startup"}
        </button>
      </form>
    </div>
  );
}
