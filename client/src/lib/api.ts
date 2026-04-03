import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

export const apiClient = axios.create({
  // Default to same-origin API path for single-domain deployments.
  baseURL: rawBaseUrl && rawBaseUrl.length > 0 ? rawBaseUrl : "/api",
  // Render and similar hosts may need more time on cold starts.
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});
