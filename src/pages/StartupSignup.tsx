import React, { useState } from "react";

const StartupSignup: React.FC = () => {
  const [form, setForm] = useState({
    startupName: "",
    founderName: "",
    email: "",
    description: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Supabase or backend here
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-navy-900 to-navy-700">
        <h2 className="text-2xl font-bold text-white mb-6">Thank you for submitting your startup!</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-navy-900 to-navy-700">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-navy-800">Startup Signup</h2>
        <input
          className="w-full mb-4 p-2 border border-navy-300 rounded"
          name="startupName"
          placeholder="Startup Name"
          value={form.startupName}
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-4 p-2 border border-navy-300 rounded"
          name="founderName"
          placeholder="Founder's Name"
          value={form.founderName}
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-4 p-2 border border-navy-300 rounded"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          className="w-full mb-4 p-2 border border-navy-300 rounded"
          name="description"
          placeholder="Describe your startup"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
        />
        <button
          type="submit"
          className="w-full bg-navy-700 text-white font-semibold py-2 px-4 rounded hover:bg-navy-800 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StartupSignup;
