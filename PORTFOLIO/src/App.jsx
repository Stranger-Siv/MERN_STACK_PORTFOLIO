import './App.css'
import { useState, useEffect } from 'react'
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
          <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-950/95 text-amber-100 px-4 py-3 flex flex-wrap items-center justify-center gap-3 text-sm shadow-lg">
            <span className="font-medium">Server is starting (cold start). This can take 30–60 seconds. Please wait and try again.</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => window.location.reload()} className="px-3 py-1.5 rounded bg-amber-700 hover:bg-amber-600 text-white font-medium">Retry</button>
              <button type="button" onClick={() => setServerStarting(false)} className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20">Dismiss</button>
            </div>
          </div>
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
