import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MODULES } from '../data/modules'
import { wisdomQuotes, encouragements } from '../data/wisdom'
import { useProgress } from '../hooks/useProgress'
import WisdomCard from '../components/WisdomCard'

function XPBar({ xp, max = 3000 }) {
  const pct = Math.min(100, Math.round((xp / max) * 100))
  return (
    <div className="xp-bar-wrapper">
      <div className="xp-bar-track">
        <motion.div
          className="xp-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
      <span className="xp-bar-label">{xp} XP</span>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const {
    progress,
    isModuleDone,
    getModuleProgress,
    getTotalCheckpoints,
    getDaysSinceStart,
  } = useProgress()

  const totalCheckpoints = getTotalCheckpoints()
  const completedModules = progress.completedModules.length
  const daysSinceStart = getDaysSinceStart()
  const overallPct = Math.round((completedModules / MODULES.length) * 100)

  const encouragement = [...encouragements].reverse().find(e => totalCheckpoints >= e.threshold)

  const lastCompletedModule = MODULES.slice().reverse().find(m => isModuleDone(m.id))
  const nextModule = MODULES.find(m => !isModuleDone(m.id))

  const quoteOfDay = wisdomQuotes[new Date().getDate() % wisdomQuotes.length]

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-bg" />
        <div className="dashboard-header-content">
          <motion.div
            className="dashboard-eyebrow"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Deekshita's Personal Crash Course
          </motion.div>
          <motion.h1
            className="dashboard-title"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Zero <span className="title-arrow">→</span> Agentic AI Engineer
          </motion.h1>
          <motion.p
            className="dashboard-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            9 modules · 30 days · 5 working AI systems · 1 job application engine
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="dashboard-stats"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="stat-chip">
              <span className="stat-value">{completedModules}</span>
              <span className="stat-label">/ {MODULES.length} modules</span>
            </div>
            <div className="stat-chip">
              <span className="stat-value">{totalCheckpoints}</span>
              <span className="stat-label">checkpoints done</span>
            </div>
            <div className="stat-chip">
              <span className="stat-value">{progress.totalXP}</span>
              <span className="stat-label">XP earned</span>
            </div>
            <div className="stat-chip">
              <span className="stat-value">{daysSinceStart}</span>
              <span className="stat-label">days in</span>
            </div>
          </motion.div>

          <XPBar xp={progress.totalXP} />

          {encouragement && (
            <motion.div
              className="dashboard-encouragement"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {encouragement.message}
            </motion.div>
          )}
        </div>
      </div>

      <div className="dashboard-body">
        {/* Continue CTA */}
        {nextModule && (
          <motion.div
            className="dashboard-continue"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="continue-left">
              <div className="continue-label">Continue where you left off</div>
              <div className="continue-module">
                <span className="continue-emoji">{nextModule.emoji}</span>
                <span className="continue-title">Module {nextModule.id}: {nextModule.title}</span>
              </div>
              <div className="continue-days">Days {nextModule.days}</div>
            </div>
            <motion.button
              className="continue-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/module/${nextModule.slug}`)}
            >
              Continue →
            </motion.button>
          </motion.div>
        )}

        {overallPct === 100 && (
          <motion.div className="dashboard-complete-banner" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            🎓 Course Complete! <button onClick={() => navigate('/completion')}>View your certificate →</button>
          </motion.div>
        )}

        {/* Quote of the day */}
        <div className="dashboard-wisdom">
          <WisdomCard />
        </div>

        {/* Module grid */}
        <div className="dashboard-modules-header">
          <h2 className="dashboard-section-title">Course Modules</h2>
          <span className="dashboard-progress-text">{overallPct}% complete</span>
        </div>

        <div className="modules-grid">
          {MODULES.map((mod, i) => {
            const done = isModuleDone(mod.id)
            const pct = getModuleProgress(mod.sections?.find(s => s.type === 'checkpoint')?.items || [])
            const isNext = mod.id === nextModule?.id
            const isLocked = !done && !isNext && mod.id > 0 && !isModuleDone(mod.id - 1)

            return (
              <motion.div
                key={mod.id}
                className={`module-card ${done ? 'module-card--done' : ''} ${isNext ? 'module-card--next' : ''} ${isLocked ? 'module-card--locked' : ''}`}
                style={{ '--mod-color': mod.color }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={!isLocked ? { y: -4, transition: { duration: 0.2 } } : {}}
                onClick={() => !isLocked && navigate(`/module/${mod.slug}`)}
              >
                <div className="module-card-top" style={{ background: mod.color }} />

                <div className="module-card-body">
                  <div className="module-card-row1">
                    <span className="module-emoji">{mod.emoji}</span>
                    <div className="module-badges">
                      {done && <span className="badge badge-done">✓ Done</span>}
                      {isNext && !done && <span className="badge badge-next">▶ Up Next</span>}
                      {isLocked && <span className="badge badge-locked">🔒</span>}
                      <span className="badge badge-days">Days {mod.days}</span>
                    </div>
                  </div>

                  <div className="module-num">Module {mod.id}</div>
                  <h3 className="module-card-title">{mod.title}</h3>
                  <p className="module-card-subtitle">{mod.subtitle}</p>

                  <div className="module-card-footer">
                    <div className="module-xp">+{mod.xp} XP</div>
                    {!isLocked && (
                      <div className="module-progress-mini">
                        <div className="module-progress-mini-fill" style={{ width: `${done ? 100 : pct}%`, background: mod.color }} />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer note */}
        <div className="dashboard-footer-note">
          <p>This course is self-paced. There are no deadlines except the ones you set for yourself.</p>
          <p>Every module builds on the previous. Don't skip.</p>
        </div>
      </div>
    </div>
  )
}
