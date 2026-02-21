import { motion, AnimatePresence } from 'framer-motion'
import { moduleCompletionMessages } from '../data/wisdom'

const CONFETTI_COLORS = ['#6366f1', '#8b5cf6', '#34d399', '#f472b6', '#f59e0b', '#06b6d4']

function Particle({ color, x, y, rotation, scale }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 8,
        height: 8,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        background: color,
        pointerEvents: 'none',
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
      animate={{
        x: x,
        y: y,
        opacity: 0,
        scale: scale,
        rotate: rotation,
      }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    />
  )
}

export default function MilestonePopup({ moduleId, moduleTitle, moduleEmoji, onClose }) {
  const message = moduleCompletionMessages[moduleId] || `${moduleTitle} complete! Keep going.`

  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    x: (Math.random() - 0.5) * 400,
    y: (Math.random() - 0.5) * 300 - 80,
    rotation: Math.random() * 720 - 360,
    scale: Math.random() * 1.5 + 0.5,
  }))

  return (
    <AnimatePresence>
      <motion.div
        className="milestone-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="milestone-particles">
          {particles.map((p) => (
            <Particle key={p.id} {...p} />
          ))}
        </div>

        <motion.div
          className="milestone-card"
          initial={{ scale: 0.5, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="milestone-emoji">{moduleEmoji}</div>

          <div className="milestone-badge">
            MODULE {moduleId} COMPLETE
          </div>

          <h2 className="milestone-title">{moduleTitle}</h2>

          <p className="milestone-message">"{message}"</p>

          <div className="milestone-xp">
            <span className="milestone-xp-label">XP EARNED</span>
            <span className="milestone-xp-value">+BONUS XP</span>
          </div>

          <motion.button
            className="milestone-continue"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
          >
            Continue →
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
