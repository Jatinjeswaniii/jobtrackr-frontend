import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const linkClass = "block px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition";

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden sm:block w-56 min-h-[calc(100vh-56px)] border-r border-white/10 bg-black/20 backdrop-blur p-4">
        <nav className="flex flex-col gap-2">
          <NavLink to="/dashboard" className={({ isActive }) => `${linkClass} ${isActive ? "bg-white/10 font-medium" : ""}`}>Dashboard</NavLink>
          <NavLink to="/add-job" className={({ isActive }) => `${linkClass} ${isActive ? "bg-white/10 font-medium" : ""}`}>Add Job</NavLink>
          <NavLink to="/profile" className={({ isActive }) => `${linkClass} ${isActive ? "bg-white/10 font-medium" : ""}`}>Profile</NavLink>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-y-0 left-0 z-50 w-56 bg-black/90 backdrop-blur p-4 sm:hidden"
          >
            <button onClick={onClose} className="mb-4 text-sm opacity-70">
              Close ✕
            </button>

            <nav className="flex flex-col gap-2">
              <NavLink onClick={onClose} to="/dashboard" className={({ isActive }) => `${linkClass} ${isActive ? "bg-white/10 font-medium" : ""}`}>Dashboard</NavLink>
              <NavLink onClick={onClose} to="/add-job" className={({ isActive }) => `${linkClass} ${isActive ? "bg-white/10 font-medium" : ""}`}>Add Job</NavLink>
              <NavLink onClick={onClose} to="/profile" className={({ isActive }) => `${linkClass} ${isActive ? "bg-white/10 font-medium" : ""}`}>Profile</NavLink>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
