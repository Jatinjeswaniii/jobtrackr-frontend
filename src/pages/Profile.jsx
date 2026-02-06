import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [saving, setSaving] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      localStorage.setItem("avatar", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      alert("Profile updated (frontend demo). Hook backend later.");
      setSaving(false);
    }, 700);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-center">Profile</h1>

      <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-4">
          {avatar ? (
            <img
              src={avatar}
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover border border-white/20"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center text-2xl font-bold text-cyan-300">
              {name?.[0]?.toUpperCase() || "U"}
            </div>
          )}

          <label className="text-sm cursor-pointer px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition">
            Change Photo
            <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
          </label>
        </div>

        <div>
          <label className="text-sm opacity-70">Name</label>
          <input
            className="w-full mt-1 p-2 rounded bg-black/40 text-white placeholder-white/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm opacity-70">Email</label>
          <input
            className="w-full mt-1 p-2 rounded bg-black/40 text-white placeholder-white/50 border border-white/10 opacity-70"
            value={email}
            disabled
          />
        </div>

        <button disabled={saving} className="w-full bg-cyan-500 text-black py-2 rounded-lg disabled:opacity-60">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </motion.div>
  );
}
