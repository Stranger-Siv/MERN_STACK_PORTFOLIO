// Use .env for local (VITE_API_URL=http://localhost:4000) and .env.production for deploy (https://api.sivram.in)
export const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:4000";
