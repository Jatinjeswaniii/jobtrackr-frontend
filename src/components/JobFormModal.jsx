import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function JobFormModal({ onClose, onSave, job }) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("applied");

  useEffect(() => {
    if (job) {
      setCompany(job.company);
      setPosition(job.position);
      setStatus(job.status);
    }
  }, [job]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ company, position, status });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <motion.form
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card p-6 rounded-xl w-[360px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-4">
          {job ? "Edit Job" : "Add Job"}
        </h2>

        <input
          className="w-full p-2 mb-3 rounded bg-slate-800"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          className="w-full p-2 mb-3 rounded bg-slate-800"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <select
          className="w-full p-2 mb-4 rounded bg-slate-800"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>

        <div className="flex gap-2">
          <button className="bg-primary px-4 py-2 rounded flex-1">
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 px-4 py-2 rounded flex-1"
          >
            Cancel
          </button>
        </div>
      </motion.form>
    </div>
  );
}
