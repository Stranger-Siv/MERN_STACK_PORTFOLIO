function getApiBase() {
  if (typeof window !== "undefined" && window.__API_BASE__) return window.__API_BASE__
  return import.meta.env.VITE_API_URL || "http://localhost:4000"
}
export { getApiBase }
