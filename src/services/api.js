// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://jobtrackr-backend-pdgd.onrender.com/api", // LIVE backend
});

// Attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Global error handler
API.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error?.response?.data?.message || "Something went wrong. Try again.";
    return Promise.reject(new Error(message));
  }
);

// -------- AUTH --------
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const getMe = () => API.get("/auth/me");

// -------- JOBS --------
export const getJobs = () => API.get("/jobs");
export const createJob = (data) => API.post("/jobs", data);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);

export default API;
