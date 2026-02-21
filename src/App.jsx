import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ModulePage from './pages/ModulePage'
import Completion from './pages/Completion'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/module/:slug" element={<ModulePage />} />
          <Route path="/completion" element={<Completion />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
