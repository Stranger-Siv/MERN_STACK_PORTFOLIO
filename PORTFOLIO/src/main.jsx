import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Load API URL from config.json so you can change it without rebuilding (e.g. set to your Render backend URL)
async function init() {
  try {
    const r = await fetch('/config.json')
    const c = r.ok ? await r.json() : {}
    if (c.apiUrl) window.__API_BASE__ = c.apiUrl
    if (c.dashboardUrl) window.__DASHBOARD_URL__ = c.dashboardUrl
  } catch (_) { }
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
init()
