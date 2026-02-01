import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import axios from 'axios'
import './index.css'

const TOKEN_KEY = 'portfolio_token'

async function init() {
  try {
    const r = await fetch('/config.json')
    const c = r.ok ? await r.json() : {}
    if (c.apiUrl) window.__API_BASE__ = c.apiUrl
  } catch (_) { }
  // Send token from localStorage on every request so auth works after refresh (avoids cross-origin cookie issues)
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })
  const { default: App } = await import('./App.jsx')
  const { store } = await import('./store/store.js')
  ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
}
init()
