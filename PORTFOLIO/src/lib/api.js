// Call getApiBase() when making requests so config.json has already set window.__API_BASE__
function getApiBase() {
  if (typeof window !== "undefined" && window.__API_BASE__) return window.__API_BASE__
  return import.meta.env.VITE_API_URL || "http://localhost:4000"
}
export { getApiBase }
