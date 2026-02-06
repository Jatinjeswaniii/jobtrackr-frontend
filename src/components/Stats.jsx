import { motion } from "framer-motion";

const Stats = ({ jobs = [] }) => {
  const applied = jobs.filter((j) => j.status === "applied").length;
  const interview = jobs.filter((j) => j.status === "interview").length;
  const rejected = jobs.filter((j) => j.status === "rejected").length;

  const cards = [
    { label: "Applied", value: applied, bg: "bg-blue-500/20", border: "border-blue-500/30" },
    { label: "Interviews", value: interview, bg: "bg-yellow-500/20", border: "border-yellow-500/30" },
    { label: "Rejected", value: rejected, bg: "bg-red-500/20", border: "border-red-500/30" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className={`p-4 rounded-xl border ${item.bg} ${item.border}`}
        >
          <p className="text-sm opacity-70">{item.label}</p>
          <p className="text-3xl font-bold mt-1">{item.value}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Stats;
