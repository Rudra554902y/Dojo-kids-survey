import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const normalizedBaseUrl = (() => {
  if (!rawBaseUrl || rawBaseUrl.length === 0) {
    return "/api";
  }

  const withoutTrailingSlash = rawBaseUrl.replace(/\/+$/, "");

  if (/(^|\/)api$/i.test(withoutTrailingSlash)) {
    return withoutTrailingSlash;
  }

  return `${withoutTrailingSlash}/api`;
})();

export const apiClient = axios.create({
  // Ensure all API calls include the backend /api prefix.
  baseURL: normalizedBaseUrl,
  // Render and similar hosts may need more time on cold starts.
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});
