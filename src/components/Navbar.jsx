import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full h-14 flex items-center justify-between px-4 sm:px-6 border-b border-white/10 bg-black/30 backdrop-blur"
    >
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 rounded-lg hover:bg-white/10"
          onClick={onMenuClick}
        >
          ☰
        </button>

        <Link to="/dashboard" className="font-semibold tracking-wide">
          JobTrackr
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {user && <span className="text-sm opacity-80 hidden sm:block">Hi, {user.name}</span>}
        <button
          onClick={handleLogout}
          className="text-sm px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
        >
          Logout
        </button>
      </div>
    </motion.header>
  );
}
