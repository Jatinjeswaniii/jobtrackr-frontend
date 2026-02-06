import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>

      <div className="flex items-center gap-4">
        <Link to="/profile" className="flex items-center gap-2">
          <img
            src={user?.avatar || "https://i.pravatar.cc/100"}
            className="w-10 h-10 rounded-full border border-teal-400"
          />
          <span className="text-teal-400 font-semibold">
            {user?.name || "User"}
          </span>
        </Link>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
