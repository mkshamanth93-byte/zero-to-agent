import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ModulePage from './pages/ModulePage'
import Completion from './pages/Completion'
import Onboarding from './pages/Onboarding'
import { useUserProfile } from './hooks/useUserProfile'
import './App.css'

function RequireProfile({ children }) {
  const { hasProfile } = useUserProfile()
  return hasProfile ? children : <Navigate to="/onboarding" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/" element={<RequireProfile><Dashboard /></RequireProfile>} />
          <Route path="/module/:slug" element={<RequireProfile><ModulePage /></RequireProfile>} />
          <Route path="/completion" element={<RequireProfile><Completion /></RequireProfile>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
