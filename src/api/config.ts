// In dev, use the Vite proxy (/api -> localhost:5050) to avoid CORS issues.
export const API_BASE =
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "/api" : "http://localhost:5050/api");
