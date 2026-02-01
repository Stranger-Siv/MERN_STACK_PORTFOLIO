// Build-time: .env / .env.production or Netlify env VITE_API_URL
// Runtime override: set window.__API_BASE__ (e.g. from public/config.json) before app loads
function getApiBase() {
  if (typeof window !== "undefined" && window.__API_BASE__) return window.__API_BASE__
  return import.meta.env.VITE_API_URL || "http://localhost:4000"
}
export const API_BASE = getApiBase()
// For components that need current value after config load (use getApiBase())
export { getApiBase }
