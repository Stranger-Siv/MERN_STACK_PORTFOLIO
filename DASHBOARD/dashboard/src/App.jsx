import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import axios from "axios"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ResetPassword from "./pages/ResetPassword"
import ForgotPassword from "./pages/ForgotPassword"
import Login from "./pages/Login"
import HomePage from "./pages/HomePage"
import ManageSkills from "./pages/ManageSkills"
import ManageTimeline from "./pages/ManageTimeline"
import ManageProject from "./pages/ManageProjects"
import ViewProject from "./pages/ViewProject"
import UpdateProject from "./pages/UpdateProject"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux"
import { getUser } from "./store/slices/userSlice"
import { getApiBase } from "@/lib/api"
import "./App.css"
import { getAllMessages } from "./store/slices/messageSlice"
import { getAllTimeline } from "./store/slices/timelineSlice"
import { getAllSkills } from "./store/slices/skillSlice"
import { getAllSoftwareApplications } from "./store/slices/softwareApplicationSlice"
import { getAllProjects } from "./store/slices/projectSlice"
import ManageProjects from "./pages/ManageProjects"

const API_TIMEOUT_MS = 65000

function isColdStartError(err) {
  if (!err) return false
  if (err.code === "ECONNABORTED" || err.message === "Network Error") return true
  const status = err.response?.status
  return status === 502 || status === 503
}

const App = () => {
  const dispatch = useDispatch()
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

  useEffect(() => {
    dispatch(getUser())
    dispatch(getAllMessages())
    dispatch(getAllTimeline())
    dispatch(getAllSkills())
    dispatch(getAllSoftwareApplications())
    dispatch(getAllProjects())
  }, [dispatch])

  const serverBanner = serverStarting && (
    createPortal(
      <div
        role="alert"
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/80"
        style={{ backdropFilter: "blur(6px)" }}
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
              onClick={() => window.location.reload()}
              className="flex-1 px-4 py-2.5 rounded-lg bg-amber-400 text-slate-900 font-semibold hover:bg-amber-300 transition-colors"
            >
              Retry
            </button>
            <button
              type="button"
              onClick={() => setServerStarting(false)}
              className="flex-1 px-4 py-2.5 rounded-lg bg-slate-600 text-white font-medium hover:bg-slate-500 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>,
      document.body
    )
  )

  return (
    <Router>
      {serverBanner}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/manage/skills" element={<ManageSkills />} />
        <Route path="/manage/timeline" element={<ManageTimeline />} />
        <Route path="/manage/projects" element={<ManageProjects />} />
        <Route path="/view/project/:id" element={<ViewProject />} />
        <Route path="/update/project/:id" element={<UpdateProject />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  )
}

export default App