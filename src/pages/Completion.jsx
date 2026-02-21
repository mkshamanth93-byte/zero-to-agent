import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'

export default function Completion() {
  const navigate = useNavigate()
  const { progress, getDaysSinceStart, getTotalCheckpoints } = useProgress()

  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const days = getDaysSinceStart()
  const checkpoints = getTotalCheckpoints()

  return (
    <div className="completion-page">
      <div className="completion-bg" />

      <motion.div
        className="completion-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="completion-fireworks">🎉 🎊 🏆 🎊 🎉</div>

        <div className="certificate">
          <div className="certificate-border" />
          <div className="certificate-inner">
            <div className="certificate-top">
              <div className="certificate-logo">Zero → Agent</div>
              <div className="certificate-issued">Certificate of Completion</div>
            </div>

            <div className="certificate-body">
              <p className="certificate-awarded">This certifies that</p>
              <h1 className="certificate-name">Deekshita Sridhar</h1>
              <p className="certificate-sub">has successfully completed</p>
              <h2 className="certificate-course">
                Zero → Agentic AI Engineer
              </h2>
              <p className="certificate-desc">
                A 30-day intensive crash course covering agentic AI systems,
                multi-agent orchestration, RAG pipelines, LangGraph, OpenClaw,
                and the LinkedIn Job Application Engine.
              </p>
            </div>

            <div className="certificate-stats">
              <div className="cert-stat">
                <div className="cert-stat-value">{progress.completedModules.length}/9</div>
                <div className="cert-stat-label">Modules</div>
              </div>
              <div className="cert-stat">
                <div className="cert-stat-value">{checkpoints}</div>
                <div className="cert-stat-label">Checkpoints</div>
              </div>
              <div className="cert-stat">
                <div className="cert-stat-value">{progress.totalXP}</div>
                <div className="cert-stat-label">XP Earned</div>
              </div>
              <div className="cert-stat">
                <div className="cert-stat-value">{days}</div>
                <div className="cert-stat-label">Days</div>
              </div>
            </div>

            <div className="certificate-bottom">
              <div className="certificate-date">{today}</div>
              <div className="certificate-seal">🤖</div>
            </div>
          </div>
        </div>

        <div className="completion-message">
          <p>
            You started this course as a Data Scientist who knew Python and ML.
            You're finishing it as someone who can architect systems where AI does the work.
          </p>
          <p>
            <strong>That's not a skill upgrade. That's a paradigm shift.</strong>
          </p>
          <p>
            The website says "Agentic AI Engineer." It was aspirational on Day 1. Today, it's accurate.
          </p>
        </div>

        <div className="completion-actions">
          <button className="completion-btn-primary" onClick={() => window.print()}>
            🖨️ Print Certificate
          </button>
          <button className="completion-btn-ghost" onClick={() => navigate('/')}>
            ← Back to Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  )
}
