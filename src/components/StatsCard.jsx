export default function StatsCard({ title, value }) {
  return (
    <div className="bg-card p-4 rounded-xl text-center">
      <p className="text-sm opacity-70">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
