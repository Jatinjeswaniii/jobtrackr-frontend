import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AddJob() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("applied");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/jobs", { company, position, status });
      navigate("/dashboard");
    } catch (err) {
      alert(err.message || "Failed to add job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto p-6"
      onSubmit={submit}
    >
      <h1 className="text-2xl font-semibold mb-6">Add Job</h1>

      <label className="text-sm opacity-70">Company</label>
      <input
        className="w-full mt-1 mb-4 p-2 rounded bg-black/40 text-white placeholder-white/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        placeholder="Company name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />

      <label className="text-sm opacity-70">Position</label>
      <input
        className="w-full mt-1 mb-4 p-2 rounded bg-black/40 text-white placeholder-white/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        placeholder="Job role / position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        required
      />

      <label className="text-sm opacity-70">Status</label>
      <select
        className="w-full mt-1 mb-6 p-2 rounded bg-black/40 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="rejected">Rejected</option>
      </select>

      <button
        disabled={loading}
        className="w-full bg-cyan-500 text-black py-2 rounded-lg font-medium hover:bg-cyan-400 transition disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Job"}
      </button>
    </motion.form>
  );
}
