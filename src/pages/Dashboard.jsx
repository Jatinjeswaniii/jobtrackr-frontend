import { useEffect, useState } from "react";
import API from "../services/api";
import JobCard from "../components/JobCard";
import JobSkeleton from "../components/JobSkeleton";
import Stats from "../components/Stats";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/jobs");
      setJobs(data.jobs || []);
    } catch (err) {
      alert(err.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = (id) => {
    setJobs((prev) => prev.filter((job) => job._id !== id));
  };

  if (loading) {
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <JobSkeleton />
        <JobSkeleton />
        <JobSkeleton />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* 🔥 STATS GO HERE */}
      <Stats jobs={jobs} />

      <h1 className="text-2xl font-semibold mb-4">Your Jobs</h1>

      {jobs.length === 0 ? (
        <p className="opacity-70">No jobs yet. Add your first job.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
