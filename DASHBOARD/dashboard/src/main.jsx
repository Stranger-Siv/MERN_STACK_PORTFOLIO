import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'

async function init() {
  try {
    const r = await fetch('/config.json')
    const c = r.ok ? await r.json() : {}
    if (c.apiUrl) window.__API_BASE__ = c.apiUrl
  } catch (_) { }
  const { default: App } = await import('./App.jsx')
  const { store } = await import('./store/store.js')
  ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
}
init()
