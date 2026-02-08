import './App.css'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import axios from 'axios'
import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProjectView from './pages/ProjectView'
import Home from './pages/Home'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getApiBase } from './lib/api'
import "./App.css"

const API_TIMEOUT_MS = 65000

function isColdStartError(err) {
  if (!err) return false
  if (err.code === 'ECONNABORTED' || err.message === 'Network Error') return true
  const status = err.response?.status
  return status === 502 || status === 503
}

function ServerStartingBanner({ onRetry, onDismiss }) {
  return createPortal(
    <div
      role="alert"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/80"
      style={{ backdropFilter: 'blur(6px)' }}
    >
      <div className="bg-slate-800 text-white rounded-2xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center border border-slate-700">
        <div className="w-16 h-16 rounded-xl bg-amber-400 flex items-center justify-center mb-6 shrink-0">
          <span className="text-3xl font-bold text-white">S</span>
        </div>
        <h2 className="text-xl font-bold text-white text-center mb-4">
          Waking up the server
        </h2>
        <p className="text-slate-300 text-sm text-center leading-relaxed mb-2">
          Our server pauses when inactive to keep the platform fast and affordable.
        </p>
        <p className="text-slate-300 text-sm text-center leading-relaxed mb-4">
          This usually takes 20–40 seconds.
        </p>
        <p className="text-slate-300 text-sm text-center leading-relaxed mb-4">
          Your data and projects remain fully protected.
        </p>
        <div className="w-full border-t border-slate-600 my-2" />
        <p className="text-slate-400 text-xs text-center mb-6">
          Powered by Render — free tier cold starts.
        </p>
        <div className="flex gap-3 w-full">
          <button
            type="button"
            onClick={onRetry}
            className="flex-1 px-4 py-2.5 rounded-lg bg-amber-400 text-slate-900 font-semibold hover:bg-amber-300 transition-colors"
          >
            Retry
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="flex-1 px-4 py-2.5 rounded-lg bg-slate-600 text-white font-medium hover:bg-slate-500 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

function App() {
  const [serverStarting, setServerStarting] = useState(false)

  useEffect(() => {
    const base = getApiBase()
    axios.interceptors.request.use((config) => {
      if (config.url && base && config.url.startsWith(base)) {
        config.timeout = config.timeout ?? API_TIMEOUT_MS
      }
      return config
    })
    axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (isColdStartError(err)) setServerStarting(true)
        return Promise.reject(err)
      }
    )
  }, [])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        {serverStarting && (
          <ServerStartingBanner
            onRetry={() => window.location.reload()}
            onDismiss={() => setServerStarting(false)}
          />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectView />} />
        </Routes>
        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </ThemeProvider>
  )
}

export default App
