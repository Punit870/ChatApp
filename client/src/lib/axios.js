import axios from "axios"

// In production, point to an absolute API URL via Vercel env var `VITE_API_URL`.
// Example: https://your-api.example.com/api
const PRODUCTION_API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:4000/api" : PRODUCTION_API_BASE_URL,
    withCredentials: true
})