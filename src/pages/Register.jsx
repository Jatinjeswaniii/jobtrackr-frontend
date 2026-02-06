import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-[#0B1020] to-[#0F172A] text-white">
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={submit}
        className="bg-white/5 backdrop-blur p-8 rounded-2xl w-[340px] border border-white/10 shadow-xl"
      >
        <h2 className="text-2xl font-semibold mb-5 text-center">Register</h2>

        <label className="text-sm opacity-70">Name</label>
        <input
          className="w-full mt-1 mb-3 p-2 rounded bg-black/40 text-white placeholder-white/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="text-sm opacity-70">Email</label>
        <input
          className="w-full mt-1 mb-3 p-2 rounded bg-black/40 text-white placeholder-white/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="text-sm opacity-70">Password</label>
        <input
          className="w-full mt-1 mb-4 p-2 rounded bg-black/40 text-white placeholder-white/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          type="password"
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-cyan-500 text-black py-2 rounded-lg font-medium hover:bg-cyan-400 transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-sm mt-4 text-center opacity-80">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
