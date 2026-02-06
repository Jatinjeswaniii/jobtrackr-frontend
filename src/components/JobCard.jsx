import API from "../services/api";

export default function JobCard({ job, onDelete }) {
  const handleDelete = async () => {
    try {
      await API.delete(`/jobs/${job._id}`);
      onDelete(job._id);
    } catch (err) {
      alert(err.message || "Failed to delete job");
    }
  };

  const date = new Date(job.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
      <h3 className="font-semibold">{job.position}</h3>
      <p className="text-sm opacity-80">{job.company}</p>
      <p className="text-xs">Status: {job.status}</p>
      <p className="text-xs opacity-60">Added on: {date}</p>

      <button
        onClick={handleDelete}
        className="mt-3 text-red-400 hover:text-red-300 text-sm"
      >
        Delete
      </button>
    </div>
  );
}
