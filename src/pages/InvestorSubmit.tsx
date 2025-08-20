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

export default function InvestorSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    sectors: [],
    checkSize: "",
    investAmt: "",
    stage: "",
    bio: "",
    accredited: false,
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === "sectors") {
      const options = Array.from((e.target as HTMLSelectElement).selectedOptions).map(o => o.value);
      setForm((prev) => ({ ...prev, sectors: options }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    if (!form.name || !form.email || !form.sectors.length || !form.investAmt || !form.stage) {
      setError("Please fill all required fields.");
      setSubmitting(false);
      return;
    }

    const { error: dbError } = await supabase.from("investors").insert([
      {
        name: form.name,
        email: form.email,
        organization: form.org,
        sectors: form.sectors,
        check_size: form.checkSize,
        invest_amt: form.investAmt,
        stage: form.stage,
        bio: form.bio,
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
        <input name="org" onChange={handleChange} value={form.org} placeholder="Organization (optional)" className="input" />
        <select
          name="sectors"
          multiple
          onChange={handleChange}
          value={form.sectors}
          required
          className="input h-24"
        >
          {SECTORS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <input name="checkSize" onChange={handleChange} value={form.checkSize} placeholder="Typical Check Size (e.g. $10k-$100k)" className="input" />
        <input name="investAmt" onChange={handleChange} value={form.investAmt} required placeholder="Amount to Invest*" className="input" />
        <select name="stage" onChange={handleChange} value={form.stage} required className="input">
          <option value="">Investment Stage Preference*</option>
          {STAGES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <textarea name="bio" onChange={handleChange} value={form.bio} placeholder="Bio/Description" className="input" />
        <label className="flex items-center gap-2 text-navy-600">
          <input type="checkbox" name="accredited" checked={form.accredited} onChange={handleChange} />
          Accredited Investor
        </label>
        <button disabled={submitting} className="w-full py-3 bg-navy-600 text-white rounded-xl font-semibold hover:bg-navy-700 transition">
          {submitting ? "Submitting..." : "Register Investor"}
        </button>
      </form>
    </div>
  );
}
