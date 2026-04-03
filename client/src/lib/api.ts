import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

export const apiClient = axios.create({
  // Default to same-origin API path for single-domain deployments.
  baseURL: rawBaseUrl && rawBaseUrl.length > 0 ? rawBaseUrl : "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
