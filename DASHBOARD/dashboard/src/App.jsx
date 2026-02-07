import React, { useEffect, useState } from "react"
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

  return (
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